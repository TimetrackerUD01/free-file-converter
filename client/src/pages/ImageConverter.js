import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Helmet } from 'react-helmet-async';
import { Upload, Download, FileImage, AlertCircle } from 'lucide-react';
import axios from 'axios';
import AdBanner from '../components/AdBanner';
import AdSidebar from '../components/AdSidebar';

const ImageConverter = () => {
  const [file, setFile] = useState(null);
  const [converting, setConverting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [format, setFormat] = useState('png');
  const [quality, setQuality] = useState(80);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      setError('กรุณาอัปโหลดไฟล์รูปภาพที่ถูกต้อง (JPEG, PNG, GIF, WebP, BMP, TIFF)');
      return;
    }

    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setError('');
      setSuccess('');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp', '.bmp', '.tiff']
    },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024 // 50MB
  });

  const handleConvert = async () => {
    if (!file) {
      setError('กรุณาเลือกไฟล์ก่อน');
      return;
    }

    setConverting(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('format', format);
      formData.append('quality', quality);

      const response = await axios.post('/api/convert/image', formData, {
        responseType: 'blob',
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `converted.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      setSuccess('แปลงไฟล์สำเร็จแล้ว!');
    } catch (err) {
      setError(err.response?.data?.error || 'การแปลงไฟล์ล้มเหลว กรุณาลองใหม่อีกครั้ง');
    } finally {
      setConverting(false);
    }
  };

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 ไบต์';
    const k = 1024;
    const sizes = ['ไบต์', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="container">
      <Helmet>
        <title>แปลงรูปภาพออนไลน์ฟรี | แปลง JPG PNG WebP GIF BMP | ไม่ต้องติดตั้งโปรแกรม</title>
        <meta name="description" content="แปลงรูปภาพออนไลน์ฟรี รองรับ JPG PNG WebP GIF BMP TIFF ไม่ต้องติดตั้งโปรแกรม ใช้งานง่าย รวดเร็ว ปลอดภัย แปลงได้ไม่อั้น" />
        <meta name="keywords" content="แปลงรูป, แปลงรูปภาพ, แปลง jpg, แปลง png, แปลง webp, แปลง gif, แปลง bmp, image converter, ฟรี, ออนไลน์" />
        <link rel="canonical" href="https://your-domain.com/image-converter" />
      </Helmet>
      
      {/* Top Banner Ad */}
      <AdBanner 
        slot="2233445566" 
        style={{ display: 'block', width: '100%', height: '90px' }}
        format="horizontal"
      />

      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        {/* Main Content */}
        <div style={{ flex: 1 }}>
          <div className="card">
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <h1 style={{ 
                fontSize: '2.5rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '16px'
              }}>
                แปลงรูปภาพ
              </h1>
              <p style={{ color: '#6c757d', fontSize: '1.1rem' }}>
                แปลงรูปภาพของคุณเป็นรูปแบบต่างๆ ด้วยคุณภาพสูง
              </p>
            </div>

            {/* File Upload */}
            <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
              <input {...getInputProps()} />
              <div className="dropzone-content">
                <FileImage className="file-icon" />
                <div className="dropzone-text">
                  {isDragActive ? 'ปล่อยรูปภาพที่นี่' : 'ลากและวางรูปภาพที่นี่'}
                </div>
                <div className="dropzone-subtext">
                  หรือคลิกเพื่อเลือกไฟล์ (ขนาดสูงสุด 50MB)
                </div>
                <div style={{ fontSize: '12px', color: '#6c757d', marginTop: '8px' }}>
                  รองรับ: JPEG, PNG, GIF, WebP, BMP, TIFF
                </div>
              </div>
            </div>

            {/* File Info */}
            {file && (
              <div className="file-info">
                <div className="file-name">{file.name}</div>
                <div className="file-size">{formatSize(file.size)}</div>
              </div>
            )}

            {/* Ad between upload and options */}
            <AdBanner 
              slot="3344556677" 
              style={{ display: 'block', width: '100%', height: '250px' }}
              format="rectangle"
            />

            {/* Conversion Options */}
            <div className="grid grid-2">
              <div className="form-group">
                <label className="form-label">รูปแบบที่ต้องการ</label>
                <select 
                  className="form-control"
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                >
                  <option value="png">PNG</option>
                  <option value="jpeg">JPEG</option>
                  <option value="webp">WebP</option>
                  <option value="gif">GIF</option>
                  <option value="bmp">BMP</option>
                  <option value="tiff">TIFF</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">คุณภาพ ({quality}%)</label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(e.target.value)}
                  className="form-control"
                  style={{ height: '48px' }}
                />
              </div>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className="alert alert-error">
                <AlertCircle style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                {error}
              </div>
            )}

            {success && (
              <div className="alert alert-success">
                <Download style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                {success}
              </div>
            )}

            {/* Convert Button */}
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <button
                onClick={handleConvert}
                disabled={!file || converting}
                className="btn btn-primary"
                style={{ minWidth: '200px' }}
              >
                {converting ? (
                  <>
                    <div style={{ 
                      display: 'inline-block',
                      width: '16px',
                      height: '16px',
                      border: '2px solid #ffffff',
                      borderRadius: '50%',
                      borderTopColor: 'transparent',
                      animation: 'spin 1s linear infinite',
                      marginRight: '8px'
                    }} />
                    กำลังแปลง...
                  </>
                ) : (
                  <>
                    <Upload style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                    แปลงรูปภาพ
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Ad - Hidden on mobile */}
        <div style={{ 
          width: '320px', 
          flexShrink: 0,
          display: window.innerWidth > 768 ? 'block' : 'none'
        }}>
          <AdSidebar slot="4455667788" />
        </div>
      </div>

      {/* Bottom Banner Ad */}
      <AdBanner 
        slot="6677889900" 
        style={{ display: 'block', width: '100%', height: '90px' }}
        format="horizontal"
      />

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .container > div {
            flex-direction: column !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ImageConverter;