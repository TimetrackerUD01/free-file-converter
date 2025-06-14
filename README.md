# ระบบแปลงไฟล์ออนไลน์ฟรี

ระบบแปลงไฟล์ออนไลน์ที่ใช้งานง่าย รวดเร็ว และปลอดภัย สามารถแปลงไฟล์ในรูปแบบต่างๆ ได้ฟรี

## ✨ Features

- 🖼️ **แปลงภาพ**: JPG, PNG, GIF, BMP, WebP, TIFF
- 🎵 **แปลงเสียง**: MP3, WAV, FLAC, AAC, OGG
- 🎬 **แปลงวิดีโอ**: MP4, AVI, MOV, WMV, FLV, WebM
- 📄 **แปลงเอกสาร**: PDF, DOCX, TXT, HTML
- 🚀 **รวดเร็ว**: แปลงไฟล์ได้อย่างรวดเร็ว
- 🔒 **ปลอดภัย**: ไฟล์จะถูกลบออกโดยอัตโนมัติ
- 💰 **ฟรี**: ไม่มีค่าใช้จ่าย ไม่ต้องสมัครสมาชิก

## 🚀 การติดตั้งและใช้งาน

### ติดตั้ง Dependencies

```bash
# ติดตั้ง dependencies ทั้งหมด
npm run install:all
```

### การพัฒนาแบบ Local

```bash
# รันในโหมด development
npm run dev
```

### การ Build สำหรับ Production

```bash
# Build สำหรับ production
npm run build

# รันใน production mode
npm start
```

## 🌐 Deploy บน Render

1. Fork repository นี้ไปยัง GitHub account ของคุณ
2. เข้าไปที่ [Render.com](https://render.com) และสร้าง account
3. เชื่อมต่อ GitHub account ของคุณ
4. สร้าง Web Service ใหม่และเลือก repository ที่ fork มา
5. ใช้การตั้งค่าต่อไปนี้:
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Node Version**: 18.x

## 📁 โครงสร้างโปรเจค

```
file-converter/
├── public/                 # Static files
├── src/                   # React frontend
│   ├── App.tsx           # Main app component
│   ├── App.css           # Styles
│   └── index.tsx         # Entry point
├── server/               # Express backend
│   ├── server.js         # Main server file
│   ├── services/         # Business logic
│   │   └── fileConverter.js
│   ├── uploads/          # Temporary upload directory
│   └── output/           # Temporary output directory
├── package.json          # Frontend dependencies
└── README.md
```

## 🔧 การกำหนดค่า

### Environment Variables

- `NODE_ENV`: production สำหรับ production mode
- `PORT`: พอร์ตของเซิร์ฟเวอร์ (default: 5000)

### ข้อจำกัด

- ขนาดไฟล์สูงสุด: 100MB
- Rate limiting: 10 requests ต่อ 15 นาที
- ไฟล์จะถูกลบออกโดยอัตโนมัติหลังจาก 1 ชั่วโมง

## 🛠️ เทคโนโลジีที่ใช้

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- React Dropzone
- Axios

### Backend
- Node.js
- Express.js
- Multer (file upload)
- Sharp (image processing)
- FFmpeg (audio/video processing)
- Various file conversion libraries

## 📝 License

MIT License

## 🤝 Contributing

Pull requests are welcome! สำหรับการเปลี่ยนแปลงใหญ่ๆ กรุณาเปิด issue เพื่อหารือก่อน

## 🐛 Bug Reports

หากพบข้อผิดพลาด กรุณารายงานผ่าน GitHub Issues