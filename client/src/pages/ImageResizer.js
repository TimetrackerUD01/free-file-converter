import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Helmet } from 'react-helmet-async';
import { Upload, Download, FileImage, AlertCircle } from 'lucide-react';
import axios from 'axios';
import AdBanner from '../components/AdBanner';
import AdSidebar from '../components/AdSidebar';

const ImageResizer = () => {
  const [file, setFile] = useState(null);
  const [resizing, setResizing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [maintainAspect, setMaintainAspect] = useState(true);

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

  const handleResize = async () => {
    if (!file) {
      setError('กรุณาเลือกไฟล์ก่อน');
      return;
    }

    if (!width || !height) {
      setError('กรุณาใส่ความกว้างและความสูง');
      return;
    }

    setResizing(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('width', width);
      formData.append('height', height);
      formData.append('maintainAspect', maintainAspect);

      const response = await axios.post('/api/resize/image', formData, {
        responseType: 'blob',
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `resized-${file.name}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      setSuccess('ปรับขนาดรูปภาพสำเร็จแล้ว!');
    } catch (err) {
      setError(err.response?.data?.error || 'การปรับขนาดล้มเหลว กรุณาลองใหม่อีกครั้ง');
    } finally {
      setResizing(false);
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
        <title>ปรับขนาดรูปภาพออนไลน์ฟรี | ลดขนาดรูป ไม่เสียคุณภาพ | Resize Image</title>
        <meta name="description" content="ปรับขนาดรูปภาพออนไลน์ฟรี ลดขนาดรูป ปรับความกว้าง ความสูง ไม่เสียคุณภาพ รองรับ JPG PNG WebP ใช้งานง่าย รวดเร็ว ไม่ต้องติดตั้งโปรแกรม" />
        <meta name="keywords" content="ปรับขนาดรูป, ลดขนาดรูป, resize image, ปรับความกว้างรูป, ปรับความสูงรูป, ย่อขนาดรูป, ฟรี, ออนไลน์" />
        <link rel="canonical" href="https://your-domain.com/image-resizer" />
      </Helmet>
      
      {/* Top Banner Ad */}
      <AdBanner 
        slot="7788990011" 
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
                ปรับขนาดรูปภาพ
              </h1>
              <p style={{ color: '#6c757d', fontSize: '1.1rem' }}>
                ปรับขนาดรูปภาพของคุณเป็นขนาดใดก็ได้ โดยยังคงคุณภาพ
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
              slot="8899001122" 
              style={{ display: 'block', width: '100%', height: '250px' }}
              format="rectangle"
            />

            {/* Resize Options */}
            <div className="grid grid-2">
              <div className="form-group">
                <label className="form-label">ความกว้าง (พิกเซล)</label>
                <input
                  type="number"
                  className="form-control"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  placeholder="ใส่ความกว้าง"
                  min="1"
                />
              </div>

              <div className="form-group">
                <label className="form-label">ความสูง (พิกเซล)</label>
                <input
                  type="number"
                  className="form-control"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="ใส่ความสูง"
                  min="1"
                />
              </div>
            </div>

            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={maintainAspect}
                  onChange={(e) => setMaintainAspect(e.target.checked)}
                />
                <span className="form-label" style={{ margin: 0 }}>
                  รักษาอัตราส่วนภาพ
                </span>
              </label>
              <div style={{ fontSize: '14px', color: '#6c757d', marginTop: '4px' }}>
                เมื่อเปิดใช้งาน รูปภาพจะถูกปรับขนาดให้พอดีกับขนาดที่กำหนดโดยไม่บิดเบือน
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

            {/* Resize Button */}
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <button
                onClick={handleResize}
                disabled={!file || resizing || !width || !height}
                className="btn btn-primary"
                style={{ minWidth: '200px' }}
              >
                {resizing ? (
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
                    กำลังปรับขนาด...
                  </>
                ) : (
                  <>
                    <Upload style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                    ปรับขนาดรูปภาพ
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
          <AdSidebar slot="9900112233" />
        </div>
      </div>

      {/* Bottom Banner Ad */}
      <AdBanner 
        slot="0011223344" 
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

export default ImageResizer;