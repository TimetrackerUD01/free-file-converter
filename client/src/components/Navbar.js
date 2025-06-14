import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Image, Maximize, Minimize } from 'lucide-react';
import Logo from './Logo';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'หน้าแรก', icon: null },
    { path: '/image-converter', label: 'แปลงรูปภาพ', icon: Image },
    { path: '/image-resizer', label: 'ปรับขนาดรูป', icon: Maximize },
    { path: '/image-compressor', label: 'บีบอัดรูป', icon: Minimize },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <Logo size={32} />
          <span>ตัวแปลงไฟล์ฟรี</span>
        </Link>
        
        <div className="navbar-menu">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`navbar-item ${location.pathname === item.path ? 'active' : ''}`}
              >
                {Icon && <Icon className="navbar-icon" />}
                <span className="navbar-text">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;