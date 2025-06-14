import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import './App.css';

interface ConversionResult {
  success: boolean;
  message: string;
  downloadUrl?: string;
  filename?: string;
}

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState<string>('pdf');
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [result, setResult] = useState<ConversionResult | null>(null);

  const supportedFormats = {
    'Document': ['pdf', 'docx', 'txt', 'html'],
    'Image': ['jpg', 'png', 'gif', 'bmp', 'webp', 'tiff'],
    'Audio': ['mp3', 'wav', 'flac', 'aac', 'ogg'],
    'Video': ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm']
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setResult(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 100 * 1024 * 1024 // 100MB limit
  });

  const handleConvert = async () => {
    if (!file) return;

    setIsConverting(true);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('targetFormat', targetFormat);

    try {
      const response = await axios.post('/api/convert', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 300000, // 5 minutes timeout
      });

      setResult(response.data);
    } catch (error: any) {
      setResult({
        success: false,
        message: error.response?.data?.message || 'เกิดข้อผิดพลาดในการแปลงไฟล์'
      });
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = async () => {
    if (!result?.downloadUrl) return;

    try {
      const response = await axios.get(result.downloadUrl, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', result.filename || 'converted-file');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
            ระบบแปลงไฟล์ออนไลน์ฟรี
          </h1>
          <p className="text-center text-gray-600 mb-8">
            แปลงไฟล์ทุกรูปแบบได้อย่างง่ายดาย รวดเร็ว และปลอดภัย
          </p>

          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* File Upload Area */}
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-blue-400'
              }`}
            >
              <input {...getInputProps()} />
              <div className="text-gray-600">
                {file ? (
                  <div>
                    <p className="text-lg font-semibold text-green-600">
                      ไฟล์ที่เลือก: {file.name}
                    </p>
                    <p className="text-sm">
                      ขนาด: {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div>
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400 mb-4"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="text-lg">
                      ลากและวางไฟล์ที่นี่ หรือคลิกเพื่อเลือกไฟล์
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      รองรับไฟล์ขนาดสูงสุด 100MB
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Format Selection */}
            {file && (
              <div className="mt-8">
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  เลือกรูปแบบไฟล์ที่ต้องการแปลง:
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(supportedFormats).map(([category, formats]) => (
                    <div key={category} className="space-y-2">
                      <h3 className="font-semibold text-gray-700">{category}</h3>
                      {formats.map((format) => (
                        <label key={format} className="flex items-center">
                          <input
                            type="radio"
                            name="targetFormat"
                            value={format}
                            checked={targetFormat === format}
                            onChange={(e) => setTargetFormat(e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-sm">{format.toUpperCase()}</span>
                        </label>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Convert Button */}
            {file && (
              <div className="mt-8 text-center">
                <button
                  onClick={handleConvert}
                  disabled={isConverting}
                  className={`px-8 py-3 rounded-lg font-semibold text-white transition-colors ${
                    isConverting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isConverting ? 'กำลังแปลงไฟล์...' : 'แปลงไฟล์'}
                </button>
              </div>
            )}

            {/* Conversion Result */}
            {result && (
              <div className="mt-8">
                {result.success ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <svg
                        className="h-5 w-5 text-green-400 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-green-800 font-semibold">
                        แปลงไฟล์สำเร็จ!
                      </span>
                    </div>
                    <p className="text-green-700 mt-2">{result.message}</p>
                    <button
                      onClick={handleDownload}
                      className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      ดาวน์โหลดไฟล์
                    </button>
                  </div>
                ) : (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <svg
                        className="h-5 w-5 text-red-400 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-red-800 font-semibold">
                        เกิดข้อผิดพลาด
                      </span>
                    </div>
                    <p className="text-red-700 mt-2">{result.message}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Features */}
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">รวดเร็ว</h3>
              <p className="text-gray-600">แปลงไฟล์ได้อย่างรวดเร็วด้วยเทคโนโลยีขั้นสูง</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">ปลอดภัย</h3>
              <p className="text-gray-600">ไฟล์ของคุณจะถูกลบออกโดยอัตโนมัติหลังการแปลง</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg className="h-8 w-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">ฟรี</h3>
              <p className="text-gray-600">ใช้งานได้ฟรีไม่มีค่าใช้จ่าย ไม่ต้องสมัครสมาชิก</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;