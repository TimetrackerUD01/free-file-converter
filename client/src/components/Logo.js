import React from 'react';

const Logo = ({ size = 64, className = '' }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id={`bgGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:'#667eea', stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:'#764ba2', stopOpacity:1}} />
        </linearGradient>
        <linearGradient id={`iconGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:'#ffffff', stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:'#f8f9fa', stopOpacity:1}} />
        </linearGradient>
        <filter id={`shadow-${size}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.1"/>
        </filter>
      </defs>
      
      <circle cx="32" cy="32" r="30" fill={`url(#bgGradient-${size})`} filter={`url(#shadow-${size})`}/>
      
      <rect x="16" y="12" width="20" height="26" rx="2" fill={`url(#iconGradient-${size})`} stroke="none"/>
      
      <path d="M30 12 L36 12 L36 18 L30 18 Z" fill={`url(#bgGradient-${size})`} opacity="0.3"/>
      <path d="M30 12 L30 18 L36 18 Z" fill="none" stroke={`url(#iconGradient-${size})`} strokeWidth="1"/>
      
      <path d="M20 44 L28 44 M24 40 L28 44 L24 48" stroke={`url(#iconGradient-${size})`} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      
      <rect x="32" y="42" width="16" height="18" rx="2" fill={`url(#iconGradient-${size})`} opacity="0.9"/>
      <path d="M42 42 L48 42 L48 48 L42 48 Z" fill={`url(#bgGradient-${size})`} opacity="0.3"/>
      
      <line x1="19" y1="20" x2="27" y2="20" stroke={`url(#bgGradient-${size})`} strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      <line x1="19" y1="24" x2="25" y2="24" stroke={`url(#bgGradient-${size})`} strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      <line x1="19" y1="28" x2="29" y2="28" stroke={`url(#bgGradient-${size})`} strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      
      <line x1="35" y1="50" x2="41" y2="50" stroke={`url(#bgGradient-${size})`} strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
      <line x1="35" y1="53" x2="39" y2="53" stroke={`url(#bgGradient-${size})`} strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
    </svg>
  );
};

export default Logo;