import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Download, FileImage, AlertCircle } from 'lucide-react';
import axios from 'axios';
import AdBanner from '../components/AdBanner';
import AdSidebar from '../components/AdSidebar';

const ImageCompressor = () => {
  const [file, setFile] = useState(null);
  const [compressing, setCompressing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [quality, setQuality] = useState(60);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      setError('กรุณาอัปโหลดไฟล์รูปภาพที่ถูกต้อง');
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

  const handleCompress = async () => {
    if (!file) {
      setError('กรุณาเลือกไฟล์ก่อน');
      return;
    }

    setCompressing(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('quality', quality);

      const response = await axios.post('/api/compress/image', formData, {
        responseType: 'blob',
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `compressed-${file.name}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      setSuccess('บีบอัดรูปภาพสำเร็จแล้ว!');
    } catch (err) {
      setError(err.response?.data?.error || 'การบีบอัดล้มเหลว กรุณาลองใหม่อีกครั้ง');
    } finally {
      setCompressing(false);
    }
  };

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 ไบต์';
    const k = 1024;
    const sizes = ['ไบต์', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getQualityLevel = () => {
    if (quality >= 80) return 'คุณภาพสูง';
    if (quality >= 60) return 'คุณภาพปานกลาง';
    if (quality >= 40) return 'คุณภาพต่ำ';
    return 'คุณภาพต่ำมาก';
  };

  return (
    <div className="container">
      {/* Top Banner Ad */}
      <AdBanner 
        slot="1122334455" 
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
                บีบอัดรูปภาพ
              </h1>
              <p style={{ color: '#6c757d', fontSize: '1.1rem' }}>
                ลดขนาดไฟล์โดยไม่สูญเสียคุณภาพมากเกินไป
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
              slot="2233445566" 
              style={{ display: 'block', width: '100%', height: '250px' }}
              format="rectangle"
            />

            {/* Quality Slider */}
            <div className="form-group">
              <label className="form-label">
                คุณภาพการบีบอัด: {quality}% ({getQualityLevel()})
              </label>
              <input
                type="range"
                min="10"
                max="95"
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                className="form-control"
                style={{ height: '48px' }}
              />
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                fontSize: '12px', 
                color: '#6c757d',
                marginTop: '8px' 
              }}>
                <span>ไฟล์เล็กกว่า</span>
                <span>คุณภาพดีกว่า</span>
              </div>
            </div>

            {/* Quality Explanation */}
            <div style={{ 
              background: '#f8f9fa', 
              border: '1px solid #e9ecef',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '20px'
            }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#495057', fontSize: '16px' }}>
                คู่มือการบีบอัด:
              </h4>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#6c757d', fontSize: '14px' }}>
                <li><strong>80-95%:</strong> คุณภาพสูง ขนาดไฟล์ใหญ่กว่า</li>
                <li><strong>60-80%:</strong> สมดุลระหว่างคุณภาพและขนาด</li>
                <li><strong>40-60%:</strong> ขนาดไฟล์เล็กกว่า คุณภาพลดลงเล็กน้อย</li>
                <li><strong>10-40%:</strong> ขนาดไฟล์เล็กมาก คุณภาพลดลงเห็นได้ชัด</li>
              </ul>
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

            {/* Compress Button */}
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <button
                onClick={handleCompress}
                disabled={!file || compressing}
                className="btn btn-primary"
                style={{ minWidth: '200px' }}
              >
                {compressing ? (
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
                    กำลังบีบอัด...
                  </>
                ) : (
                  <>
                    <Upload style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                    บีบอัดรูปภาพ
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
          <AdSidebar slot="3344556677" />
        </div>
      </div>

      {/* Bottom Banner Ad */}
      <AdBanner 
        slot="4455667788" 
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

export default ImageCompressor;