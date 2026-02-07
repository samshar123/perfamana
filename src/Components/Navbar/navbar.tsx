import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import imglogo from "../../../public/Images/logo1-Photoroom.png"
import './navbar.css';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'ABOUT', path: '/about' },
    { name: 'SERVICES', path: '/services' },
    { name: 'PROJECTS', path: '/projects' },
    { name: 'EVENTS', path: '/events' },
    { name: 'OFFERS', path: '/offers' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <>
      <nav className={`nav-viewport ${isScrolled ? 'nav-hidden' : ''}`}>
        <div className="nav-container">
         <Link to="/" className="nav-logo">
  <div className="logo-wrapper">
    <img 
      src={imglogo} 
      alt="Perfamana Labs" 
      className="main-logo-img" 
    />
    {/* Technical scan line that only appears on the logo */}
    <div className="logo-scanner"></div>
  </div>
</Link>

          {/* DESKTOP MENU */}
          <div className="nav-desktop-links">
            {navLinks.map((link, i) => (
              <Link key={link.name} to={link.path} className={`nav-link-item ${location.pathname === link.path ? 'active' : ''}`}>
                <div className="link-hover-effect"></div>
                <span className="link-index">0{i + 1}</span>
                <span className="link-text">{link.name}</span>
              </Link>
            ))}
          </div>

          {/* MOBILE TOGGLE (BURGER) */}
          <button className="nav-trigger" onClick={() => setIsMenuOpen(true)}>
            <div className="trigger-box">
              <div className="trigger-line"></div>
              <div className="trigger-line short"></div>
              <div className="trigger-line"></div>
            </div>
          </button>
        </div>
      </nav>

      {/* MOBILE FULL-SCREEN OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="mobile-system-overlay"
            initial={{ opacity: 0, clipPath: 'circle(0% at 90% 5%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 90% 5%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 90% 5%)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* CLOSE BUTTON */}
            <button className="mobile-close-btn" onClick={() => setIsMenuOpen(false)}>
              <div className="close-circle">
                <div className="close-x"></div>
              </div>
              <span className="close-label">CLOSE_INTERFACE</span>
            </button>

            <div className="mobile-nav-content">
              {/* <div className="mobile-meta">SYSTEM_NAVIGATION_MENU</div> */}
              <div className="mobile-link-list">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    <Link to={link.path} onClick={() => setIsMenuOpen(false)} className="mobile-link-anchor">
                      <span className="m-index">0{i + 1}</span>
                      <span className="m-text">{link.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;