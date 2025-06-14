import React, { useEffect } from 'react';

const AdSidebar = ({ slot }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log('AdSense error:', err);
    }
  }, []);

  return (
    <div className="ad-sidebar" style={{ 
      margin: '20px 0',
      padding: '16px',
      background: '#f8f9fa',
      borderRadius: '12px',
      border: '1px solid #e9ecef'
    }}>
      <div style={{ 
        fontSize: '12px', 
        color: '#6c757d', 
        marginBottom: '8px',
        textAlign: 'center'
      }}>
        โฆษณา
      </div>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          width: '300px',
          height: '250px',
          background: '#ffffff',
          borderRadius: '8px'
        }}
        data-ad-client="ca-pub-1797172064583364"
        data-ad-slot={slot}
        data-ad-format="rectangle"
      />
    </div>
  );
};

export default AdSidebar;