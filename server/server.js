const express = require('express');
const multer = require('multer');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs-extra');
const { v4: uuidv4 } = require('uuid');

const fileConverter = require('./services/fileConverter');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

app.use('/api/', limiter);

// Ensure directories exist
const uploadDir = path.join(__dirname, 'uploads');
const outputDir = path.join(__dirname, 'output');
fs.ensureDirSync(uploadDir);
fs.ensureDirSync(outputDir);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow all file types for conversion
    cb(null, true);
  }
});

// API Routes
app.post('/api/convert', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'ไม่มีไฟล์ที่อัปโหลด'
      });
    }

    const { targetFormat } = req.body;
    if (!targetFormat) {
      return res.status(400).json({
        success: false,
        message: 'ไม่ได้ระบุรูปแบบไฟล์ที่ต้องการแปลง'
      });
    }

    const inputPath = req.file.path;
    const outputFilename = `${path.parse(req.file.filename).name}.${targetFormat}`;
    const outputPath = path.join(outputDir, outputFilename);

    // Convert file
    const result = await fileConverter.convert(inputPath, outputPath, targetFormat);

    if (result.success) {
      // Clean up input file
      fs.unlink(inputPath, (err) => {
        if (err) console.error('Error deleting input file:', err);
      });

      // Schedule output file cleanup after 1 hour
      setTimeout(() => {
        fs.unlink(outputPath, (err) => {
          if (err) console.error('Error deleting output file:', err);
        });
      }, 60 * 60 * 1000); // 1 hour

      res.json({
        success: true,
        message: 'แปลงไฟล์สำเร็จ',
        downloadUrl: `/api/download/${outputFilename}`,
        filename: outputFilename
      });
    } else {
      // Clean up input file on error
      fs.unlink(inputPath, (err) => {
        if (err) console.error('Error deleting input file:', err);
      });

      res.status(500).json({
        success: false,
        message: result.message || 'เกิดข้อผิดพลาดในการแปลงไฟล์'
      });
    }
  } catch (error) {
    console.error('Conversion error:', error);
    
    // Clean up input file on error
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting input file:', err);
      });
    }

    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการแปลงไฟล์'
    });
  }
});

app.get('/api/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(outputDir, filename);

  if (fs.existsSync(filePath)) {
    res.download(filePath, filename, (err) => {
      if (err) {
        console.error('Download error:', err);
        res.status(500).json({
          success: false,
          message: 'เกิดข้อผิดพลาดในการดาวน์โหลดไฟล์'
        });
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'ไม่พบไฟล์ที่ต้องการดาวน์โหลด'
    });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});