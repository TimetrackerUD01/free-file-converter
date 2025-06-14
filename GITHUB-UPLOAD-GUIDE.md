# คู่มือการอัปโหลดโปรเจกต์ไปยัง GitHub

## ✅ สถานะปัจจุบัน
- โปรเจกต์พร้อมใช้งานแล้ว
- Build สำเร็จ (90.74 kB gzipped)
- แก้ไข icon imports แล้ว (Maximize/Minimize)
- ระบบ Keep-Alive ทำงาน
- AdSense integration พร้อม
- SEO optimization ครบถ้วน

## 📋 ขั้นตอนการอัปโหลด

### 1. ติดตั้ง Git (ถ้ายังไม่มี)
```bash
# ดาวน์โหลดและติดตั้ง Git จาก: https://git-scm.com/download/win
```

### 2. เริ่มต้น Git Repository
```bash
cd "c:\Users\Administrator\Desktop\files (1)"
git init
git add .
git commit -m "Initial commit: Complete file converter web app with React + Express"
```

### 3. เชื่อมต่อกับ GitHub Repository
```bash
git remote add origin https://github.com/TimetrackerUD01/free-file-converter.git
git branch -M main
git push -u origin main
```

### 4. Push การเปลี่ยนแปลงล่าสุด
```bash
git add .
git commit -m "Fix: Replace non-existent Resize/Compress icons with Maximize/Minimize"
git push origin main
```

## 🚀 Deploy ไปยัง Render.com

### วิธีที่ 1: ผ่าน GitHub (แนะนำ)
1. อัปโหลดโค้ดไปยัง GitHub ตามขั้นตอนข้างต้น
2. ไปที่ Render.com Dashboard
3. คลิก "New +" → "Web Service"
4. เชื่อมต่อ GitHub repository: `TimetrackerUD01/free-file-converter`
5. ตั้งค่าการ deploy:
   - **Name**: `free-file-converter`
   - **Root Directory**: ` ` (ว่าง)
   - **Build Command**: `npm install && npm run build:client`
   - **Start Command**: `npm start`
   - **Environment**: `Node`

### วิธีที่ 2: Manual Deploy
```bash
# ใช้ Render CLI (ต้องติดตั้งก่อน)
npm install -g @render/cli
render login
render deploy
```

## 🔧 Environment Variables ที่ต้องตั้งใน Render
```
NODE_ENV=production
PORT=10000
GOOGLE_ADSENSE_CLIENT=ca-pub-your-publisher-id
```

## 📊 ข้อมูลสำคัญ
- **Bundle Size**: 90.74 kB (gzipped)
- **Keep-Alive**: ทุก 10 นาที
- **Free Tier Limit**: 750 ชั่วโมง/เดือน
- **Max File Size**: 50MB
- **Supported Formats**: JPEG, PNG, WebP, GIF, BMP, TIFF

## 📝 หมายเหตุ
- ไฟล์ `render.yaml` พร้อมใช้งานแล้ว
- AdSense Publisher ID ต้องใส่ใน environment variables
- Keep-alive จะทำงานเฉพาะใน production environment
- Clean up ไฟล์อัตโนมัติทุก 1 ชั่วโมง

## 🌐 URL หลังจาก Deploy
- Production: `https://free-file-converter.onrender.com`
- Health Check: `https://free-file-converter.onrender.com/health`
- AdSense ads.txt: `https://free-file-converter.onrender.com/ads.txt`

---
*สร้างเมื่อ: 14 มิถุนายน 2025*
*สถานะ: ✅ พร้อม Deploy*
