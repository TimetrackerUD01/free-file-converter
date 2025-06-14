import React, { useEffect } from 'react';

const AdInFeed = ({ slot }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log('AdSense error:', err);
    }
  }, []);

  return (
    <div className="ad-infeed" style={{ 
      margin: '30px 0',
      padding: '20px',
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{ 
        fontSize: '12px', 
        color: '#6c757d', 
        marginBottom: '12px',
        textAlign: 'center'
      }}>
        เนื้อหาที่ได้รับการสนับสนุน
      </div>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          width: '100%',
          height: '280px',
          background: '#ffffff',
          borderRadius: '8px'
        }}
        data-ad-client="ca-pub-1797172064583364"
        data-ad-slot={slot}
        data-ad-format="fluid"
        data-ad-layout-key="-fb+5w+4e-db+86"
      />
    </div>
  );
};

export default AdInFeed;