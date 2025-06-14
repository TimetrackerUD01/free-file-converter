import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Maximize, Minimize, Zap, Shield, Globe } from 'lucide-react';
import Logo from '../components/Logo';
import AdBanner from '../components/AdBanner';
import AdInFeed from '../components/AdInFeed';

const Home = () => {
  const features = [
    {
      icon: Image,
      title: 'แปลงรูปภาพ',
      description: 'แปลงรูปภาพระหว่างรูปแบบต่างๆ เช่น JPEG, PNG, WebP และอื่นๆ',
      link: '/image-converter'
    },
    {
      icon: Maximize,
      title: 'ปรับขนาดรูปภาพ',
      description: 'ปรับขนาดรูปภาพให้เป็นขนาดที่ต้องการ โดยยังคงคุณภาพ',
      link: '/image-resizer'
    },
    {
      icon: Minimize,
      title: 'บีบอัดรูปภาพ',
      description: 'ลดขนาดไฟล์โดยไม่สูญเสียคุณภาพด้วยเทคโนโลยีการบีบอัดขั้นสูง',
      link: '/image-compressor'
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: 'ประมวลผลเร็ว',
      description: 'แปลงไฟล์ได้อย่างรวดเร็วด้วยอัลกอริทึมที่ปรับแต่งมาเป็นพิเศษ'
    },
    {
      icon: Shield,
      title: 'ปลอดภัย & เป็นส่วนตัว',
      description: 'ไฟล์ของคุณถูกประมวลผลอย่างปลอดภัยและลบออกหลังจากแปลง'
    },
    {
      icon: Globe,
      title: 'ฟรีตลอดกาล',
      description: 'ไม่ต้องสมัครสมาชิก ใช้งานฟรีได้ทุกเวลา'
    }
  ];

  return (
    <div className="container">
      {/* Top Banner Ad */}
      <AdBanner 
        slot="1234567890" 
        style={{ display: 'block', width: '100%', height: '90px' }}
        format="horizontal"
      />

      <div className="hero-section">
        <div className="card">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ marginBottom: '24px' }}>
              <Logo size={120} />
            </div>
            <h1 style={{ 
              fontSize: '3rem', 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '16px'
            }}>
              ตัวแปลงไฟล์ฟรีออนไลน์
            </h1>
            <p style={{ 
              fontSize: '1.2rem',
              color: '#6c757d',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              แปลง ปรับขนาด และบีบอัดไฟล์ของคุณออนไลน์ฟรี 
              ไม่ต้องสมัครสมาชิก ประมวลผลปลอดภัย และใช้งานได้ไม่จำกัด
            </p>
          </div>

          <div className="grid grid-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="feature-card">
                  <Icon className="feature-icon" />
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                  <Link to={feature.link} className="btn btn-primary" style={{ marginTop: '16px' }}>
                    ทดลองใช้ตอนนี้
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* In-Feed Ad */}
      <AdInFeed slot="0987654321" />

      <div className="benefits-section">
        <div className="card">
          <h2 style={{ 
            textAlign: 'center', 
            marginBottom: '40px',
            color: '#495057',
            fontSize: '2.5rem'
          }}>
            ทำไมต้องเลือกใช้งานกับเรา?
          </h2>
          
          <div className="grid grid-3">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="feature-card">
                  <Icon className="feature-icon" />
                  <h3 className="feature-title">{benefit.title}</h3>
                  <p className="feature-description">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Rectangle Ad */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '30px 0' }}>
        <AdBanner 
          slot="1122334455" 
          style={{ display: 'inline-block', width: '336px', height: '280px' }}
          format="rectangle"
          responsive={false}
        />
      </div>

      <div className="cta-section">
        <div className="card" style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: '16px', color: '#495057' }}>
            พร้อมที่จะเริ่มต้นแล้วหรือยัง?
          </h2>
          <p style={{ marginBottom: '24px', color: '#6c757d', fontSize: '1.1rem' }}>
            เลือกเครื่องมือด้านบนและเริ่มแปลงไฟล์ของคุณได้ในไม่กี่วินาที!
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/image-converter" className="btn btn-primary">
              แปลงรูปภาพ
            </Link>
            <Link to="/image-resizer" className="btn btn-secondary">
              ปรับขนาดรูป
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Banner Ad */}
      <AdBanner 
        slot="5566778899" 
        style={{ display: 'block', width: '100%', height: '90px' }}
        format="horizontal"
      />
    </div>
  );
};

export default Home;