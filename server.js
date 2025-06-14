const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const archiver = require('archiver');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

// Ensure upload directory exists
const uploadDir = path.join(__dirname, 'uploads');
const outputDir = path.join(__dirname, 'output');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    cb(null, `${timestamp}-${file.originalname}`);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow common file types
    const allowedTypes = [
      'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
      'image/bmp', 'image/tiff', 'application/pdf'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type'), false);
    }
  }
});

// Helper function to clean up files
const cleanupFiles = (files) => {
  files.forEach(file => {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }
  });
};

// Image conversion endpoint
app.post('/api/convert/image', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { format, quality } = req.body;
    const inputPath = req.file.path;
    const outputFileName = `converted-${Date.now()}.${format}`;
    const outputPath = path.join(outputDir, outputFileName);

    let sharpInstance = sharp(inputPath);

    // Configure quality if specified
    const qualityNum = parseInt(quality) || 80;

    switch (format.toLowerCase()) {
      case 'jpeg':
      case 'jpg':
        sharpInstance = sharpInstance.jpeg({ quality: qualityNum });
        break;
      case 'png':
        sharpInstance = sharpInstance.png({ quality: qualityNum });
        break;
      case 'webp':
        sharpInstance = sharpInstance.webp({ quality: qualityNum });
        break;
      case 'gif':
        sharpInstance = sharpInstance.gif();
        break;
      case 'bmp':
        sharpInstance = sharpInstance.bmp();
        break;
      case 'tiff':
        sharpInstance = sharpInstance.tiff({ quality: qualityNum });
        break;
      default:
        throw new Error('Unsupported output format');
    }

    await sharpInstance.toFile(outputPath);

    // Send file and cleanup
    res.download(outputPath, outputFileName, (err) => {
      cleanupFiles([inputPath, outputPath]);
      if (err) {
        console.error('Download error:', err);
      }
    });

  } catch (error) {
    console.error('Conversion error:', error);
    if (req.file) {
      cleanupFiles([req.file.path]);
    }
    res.status(500).json({ error: 'Conversion failed: ' + error.message });
  }
});

// Image resize endpoint
app.post('/api/resize/image', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { width, height, maintainAspect } = req.body;
    const inputPath = req.file.path;
    const outputFileName = `resized-${Date.now()}.${path.extname(req.file.originalname).slice(1) || 'jpg'}`;
    const outputPath = path.join(outputDir, outputFileName);

    let sharpInstance = sharp(inputPath);

    if (maintainAspect === 'true') {
      sharpInstance = sharpInstance.resize(parseInt(width), parseInt(height), {
        fit: 'inside',
        withoutEnlargement: true
      });
    } else {
      sharpInstance = sharpInstance.resize(parseInt(width), parseInt(height));
    }

    await sharpInstance.toFile(outputPath);

    res.download(outputPath, outputFileName, (err) => {
      cleanupFiles([inputPath, outputPath]);
      if (err) {
        console.error('Download error:', err);
      }
    });

  } catch (error) {
    console.error('Resize error:', error);
    if (req.file) {
      cleanupFiles([req.file.path]);
    }
    res.status(500).json({ error: 'Resize failed: ' + error.message });
  }
});

// Compress image endpoint
app.post('/api/compress/image', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { quality } = req.body;
    const inputPath = req.file.path;
    const outputFileName = `compressed-${Date.now()}.${path.extname(req.file.originalname).slice(1) || 'jpg'}`;
    const outputPath = path.join(outputDir, outputFileName);

    const qualityNum = parseInt(quality) || 60;
    const fileExt = path.extname(req.file.originalname).toLowerCase();

    let sharpInstance = sharp(inputPath);

    if (fileExt === '.jpg' || fileExt === '.jpeg') {
      sharpInstance = sharpInstance.jpeg({ quality: qualityNum });
    } else if (fileExt === '.png') {
      sharpInstance = sharpInstance.png({ quality: qualityNum });
    } else if (fileExt === '.webp') {
      sharpInstance = sharpInstance.webp({ quality: qualityNum });
    } else {
      // Convert to JPEG for other formats
      sharpInstance = sharpInstance.jpeg({ quality: qualityNum });
    }

    await sharpInstance.toFile(outputPath);

    res.download(outputPath, outputFileName, (err) => {
      cleanupFiles([inputPath, outputPath]);
      if (err) {
        console.error('Download error:', err);
      }
    });

  } catch (error) {
    console.error('Compress error:', error);
    if (req.file) {
      cleanupFiles([req.file.path]);
    }
    res.status(500).json({ error: 'Compression failed: ' + error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Cleanup temporary files every hour
setInterval(() => {
  const cleanupTime = Date.now() - (60 * 60 * 1000); // 1 hour ago
  
  [uploadDir, outputDir].forEach(dir => {
    fs.readdir(dir, (err, files) => {
      if (err) return;
      
      files.forEach(file => {
        const filePath = path.join(dir, file);
        fs.stat(filePath, (err, stats) => {
          if (err) return;
          
          if (stats.mtime.getTime() < cleanupTime) {
            fs.unlink(filePath, () => {});
          }
        });
      });
    });
  });
}, 60 * 60 * 1000); // Run every hour

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});