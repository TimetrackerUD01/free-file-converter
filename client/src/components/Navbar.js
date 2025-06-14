import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Image, Maximize, Minimize } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'หน้าแรก', icon: FileText },
    { path: '/image-converter', label: 'แปลงรูปภาพ', icon: Image },
    { path: '/image-resizer', label: 'ปรับขนาดรูป', icon: Maximize },
    { path: '/image-compressor', label: 'บีบอัดรูป', icon: Minimize },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <FileText className="brand-icon" />
          ตัวแปลงไฟล์ฟรี
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
                <Icon className="navbar-icon" />
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