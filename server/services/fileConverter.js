const sharp = require('sharp');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegStatic = require('ffmpeg-static');
const fs = require('fs-extra');
const path = require('path');

// Set ffmpeg path
ffmpeg.setFfmpegPath(ffmpegStatic);

class FileConverter {
  async convert(inputPath, outputPath, targetFormat) {
    try {
      const inputExt = path.extname(inputPath).toLowerCase().substring(1);
      const targetExt = targetFormat.toLowerCase();

      // Image conversions
      if (this.isImageFormat(inputExt) || this.isImageFormat(targetExt)) {
        return await this.convertImage(inputPath, outputPath, targetExt);
      }

      // Audio conversions
      if (this.isAudioFormat(inputExt) || this.isAudioFormat(targetExt)) {
        return await this.convertAudio(inputPath, outputPath, targetExt);
      }

      // Video conversions
      if (this.isVideoFormat(inputExt) || this.isVideoFormat(targetExt)) {
        return await this.convertVideo(inputPath, outputPath, targetExt);
      }

      // Document conversions
      if (this.isDocumentFormat(inputExt) || this.isDocumentFormat(targetExt)) {
        return await this.convertDocument(inputPath, outputPath, targetExt);
      }

      return {
        success: false,
        message: `ไม่รองรับการแปลงจาก ${inputExt} เป็น ${targetExt}`
      };

    } catch (error) {
      console.error('Conversion error:', error);
      return {
        success: false,
        message: 'เกิดข้อผิดพลาดในการแปลงไฟล์'
      };
    }
  }

  async convertImage(inputPath, outputPath, targetFormat) {
    try {
      let sharpInstance = sharp(inputPath);

      switch (targetFormat.toLowerCase()) {
        case 'jpg':
        case 'jpeg':
          sharpInstance = sharpInstance.jpeg({ quality: 90 });
          break;
        case 'png':
          sharpInstance = sharpInstance.png({ compressionLevel: 6 });
          break;
        case 'webp':
          sharpInstance = sharpInstance.webp({ quality: 90 });
          break;
        case 'tiff':
          sharpInstance = sharpInstance.tiff();
          break;
        case 'bmp':
          sharpInstance = sharpInstance.png(); // Sharp doesn't support BMP output, use PNG
          break;
        case 'gif':
          sharpInstance = sharpInstance.gif();
          break;
        default:
          return {
            success: false,
            message: `ไม่รองรับรูปแบบภาพ ${targetFormat}`
          };
      }

      await sharpInstance.toFile(outputPath);

      return {
        success: true,
        message: 'แปลงภาพสำเร็จ'
      };

    } catch (error) {
      console.error('Image conversion error:', error);
      return {
        success: false,
        message: 'เกิดข้อผิดพลาดในการแปลงภาพ'
      };
    }
  }

  async convertAudio(inputPath, outputPath, targetFormat) {
    return new Promise((resolve) => {
      ffmpeg(inputPath)
        .toFormat(targetFormat)
        .on('end', () => {
          resolve({
            success: true,
            message: 'แปลงไฟล์เสียงสำเร็จ'
          });
        })
        .on('error', (err) => {
          console.error('Audio conversion error:', err);
          resolve({
            success: false,
            message: 'เกิดข้อผิดพลาดในการแปลงไฟล์เสียง'
          });
        })
        .save(outputPath);
    });
  }

  async convertVideo(inputPath, outputPath, targetFormat) {
    return new Promise((resolve) => {
      ffmpeg(inputPath)
        .toFormat(targetFormat)
        .videoCodec('libx264')
        .audioCodec('aac')
        .on('end', () => {
          resolve({
            success: true,
            message: 'แปลงไฟล์วิดีโอสำเร็จ'
          });
        })
        .on('error', (err) => {
          console.error('Video conversion error:', err);
          resolve({
            success: false,
            message: 'เกิดข้อผิดพลาดในการแปลงไฟล์วิดีโอ'
          });
        })
        .save(outputPath);
    });
  }

  async convertDocument(inputPath, outputPath, targetFormat) {
    try {
      const inputExt = path.extname(inputPath).toLowerCase().substring(1);
      
      // Simple text file conversion
      if (inputExt === 'txt' && targetFormat === 'html') {
        const content = await fs.readFile(inputPath, 'utf8');
        const htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <title>Converted Document</title>
          </head>
          <body>
            <pre>${content}</pre>
          </body>
          </html>
        `;
        await fs.writeFile(outputPath, htmlContent);
        
        return {
          success: true,
          message: 'แปลงเอกสารสำเร็จ'
        };
      }

      // For more complex document conversions, you would need additional libraries
      // like pandoc, libreoffice, etc.
      
      return {
        success: false,
        message: `ไม่รองรับการแปลงเอกสารจาก ${inputExt} เป็น ${targetFormat} ในขณะนี้`
      };

    } catch (error) {
      console.error('Document conversion error:', error);
      return {
        success: false,
        message: 'เกิดข้อผิดพลาดในการแปลงเอกสาร'
      };
    }
  }

  isImageFormat(ext) {
    const imageFormats = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'tiff'];
    return imageFormats.includes(ext.toLowerCase());
  }

  isAudioFormat(ext) {
    const audioFormats = ['mp3', 'wav', 'flac', 'aac', 'ogg', 'wma', 'm4a'];
    return audioFormats.includes(ext.toLowerCase());
  }

  isVideoFormat(ext) {
    const videoFormats = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv', '3gp'];
    return videoFormats.includes(ext.toLowerCase());
  }

  isDocumentFormat(ext) {
    const documentFormats = ['pdf', 'doc', 'docx', 'txt', 'html', 'rtf', 'odt'];
    return documentFormats.includes(ext.toLowerCase());
  }
}

module.exports = new FileConverter();