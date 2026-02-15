import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import imglogo from "../../../public/Images/logo1-Photoroom.png";
import "./navbar.css";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
  }, [isMenuOpen]);

  const navLinks = [
    { name: "ABOUT", path: "#about" },
    { name: "SERVICES", path: "#services" },
    { name: "PROJECTS", path: "#projects" },
    { name: "PROCESS", path: "#process" },
    { name: "WHY US", path: "#why-us" },
    { name: "CONTACT", path: "#cta" },
  ];

  // Helper function to handle smooth scroll on click
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    const targetId = path.replace("#", "");
    const elem = document.getElementById(targetId);
    
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false); // Close mobile menu if open
    }
  };

  return (
    <>
      <nav className={`nav-viewport ${isScrolled ? "nav-hidden" : ""}`}>
        <div className="nav-container">
          {/* Logo takes you back to top */}
          <a href="#top" onClick={(e) => handleScrollTo(e, "#top")} className="nav-logo">
            <div className="logo-wrapper">
              <img src={imglogo} alt="Perfamana Labs" className="main-logo-img" />
              <div className="logo-scanner"></div>
            </div>
          </a>

          <div className="nav-desktop-links">
            {navLinks.map((link, i) => (
              <a
                key={link.name}
                href={link.path}
                onClick={(e) => handleScrollTo(e, link.path)}
                className="nav-link-item"
              >
                <div className="link-hover-effect"></div>
                <span className="link-index">0{i + 1}</span>
                <span className="link-text">{link.name}</span>
              </a>
            ))}
          </div>

          <button className="nav-trigger" onClick={() => setIsMenuOpen(true)}>
            <div className="trigger-box">
              <div className="trigger-line"></div>
              <div className="trigger-line short"></div>
              <div className="trigger-line"></div>
            </div>
          </button>
        </div>
      </nav>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="mobile-system-overlay"
            initial={{ opacity: 0, clipPath: "circle(0% at 90% 5%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 90% 5%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 90% 5%)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <button className="mobile-close-btn" onClick={() => setIsMenuOpen(false)}>
              <div className="close-circle"><div className="close-x"></div></div>
              <span className="close-label">CLOSE_INTERFACE</span>
            </button>

            <div className="mobile-nav-content">
              <div className="mobile-link-list">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    <a
                      href={link.path}
                      onClick={(e) => handleScrollTo(e, link.path)}
                      className="mobile-link-anchor"
                    >
                      <span className="m-index">0{i + 1}</span>
                      <span className="m-text">{link.name}</span>
                    </a>
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