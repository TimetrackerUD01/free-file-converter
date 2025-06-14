import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ImageConverter from './pages/ImageConverter';
import ImageResizer from './pages/ImageResizer';
import ImageCompressor from './pages/ImageCompressor';
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
          </Routes>
        </main>
        <footer className="footer">
          <p>&copy; 2024 ตัวแปลงไฟล์ฟรี สงวนสิทธิ์ทุกประการ</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;