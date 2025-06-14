import React, { useEffect } from 'react';

const AdBanner = ({ 
  slot, 
  style = { display: 'block' }, 
  format = 'auto',
  responsive = true,
  className = ''
}) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log('AdSense error:', err);
    }
  }, []);

  return (
    <div className={`ad-container ${className}`} style={{ margin: '20px 0', textAlign: 'center' }}>
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
          ...style,
          minHeight: '90px',
          background: '#f8f9fa',
          border: '1px solid #e9ecef',
          borderRadius: '8px'
        }}
        data-ad-client="ca-pub-1797172064583364"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  );
};

export default AdBanner;