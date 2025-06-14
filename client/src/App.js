import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ImageConverter from './pages/ImageConverter';
import ImageResizer from './pages/ImageResizer';
import ImageCompressor from './pages/ImageCompressor';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/image-converter" element={<ImageConverter />} />
            <Route path="/image-resizer" element={<ImageResizer />} />
            <Route path="/image-compressor" element={<ImageCompressor />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
          </Routes>
        </main>
        <footer className="footer">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <p>&copy; 2025 ตัวแปลงไฟล์ฟรี สงวนสิทธิ์ทุกประการ</p>
            <div style={{ display: 'flex', gap: '15px' }}>
              <a href="/privacy-policy" style={{ color: '#fff', textDecoration: 'none', fontSize: '14px' }}>
                นโยบายความเป็นส่วนตัว
              </a>
              <span style={{ color: '#fff' }}>|</span>
              <a href="/terms-of-service" style={{ color: '#fff', textDecoration: 'none', fontSize: '14px' }}>
                ข้อกำหนดการใช้งาน
              </a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;