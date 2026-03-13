import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../public/Images/logo1.jpg';
import { servicesApi } from '../../api/services';
import type { Service } from '../../api/types';
import './footer.css';

const Footer: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    servicesApi.getServices().then((data) => setServices(data));
  }, []);

  return (
    <footer className="gt-footer">
      <div className="gt-container">
        
        {/* LEVEL 1: BRAND & PRIMARY CONTACT */}
        <div className="gt-brand-section">
          <div className="gt-brand-col">
            <img src={logo} alt="Perfamana" className="gt-logo" />
            <p className="gt-brand-tagline">ENGINEERING PERFECTION SINCE 2017</p>
          </div>
          <div className="gt-contact-col">
            <span className="gt-label">HEAD  OFFICE</span>
            <address className="gt-address">
              HH CUSTOM PVT LTD, <br />
              7/133 A, B, KOLATHARA PO<br />
              CALICUT - 673655
            </address>
          </div>
          <div className="gt-social-col">
            <span className="gt-label">CONNECT  SOCIAL</span>
            <div className="gt-social-links">
              <a href="https://www.instagram.com/perfamana/" target="_blank">INSTAGRAM</a>
              <a href="https://www.linkedin.com/in/perfamana-calicut-767bb7308/" target="_blank">LINKEDIN</a>
              <a href="https://www.facebook.com/HHcustomss" target="_blank">FACEBOOK</a>
            </div>
          </div>
        </div>

        {/* LEVEL 2: SERVICE CENTER & MAP (THE HEART OF THE FOOTER) */}
        <div className="gt-hub-section">
          <div className="gt-hub-info">
            <span className="gt-hub-kicker">OUR SERVICE CENTER</span>
            <h2 className="gt-hub-name">KOZHIKODE CENTER</h2>
            <p className="gt-hub-desc">
              Our flagship service center equipped with laboratory-grade diagnostics and performance bays.
            </p>
            <Link to="/contact" className="gt-visit-btn">GET DIRECTIONS</Link>
          </div>
          <div className="gt-map-wrap">
            {/* Embedded Google Map */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.0!2d75.8189009!3d11.1981609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65a1a0a5345b5%3A0x85792f383ef1925c!2sPERFAMANA!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              className="gt-iframe"
              loading="lazy"
            ></iframe>
            <div className="gt-map-overlay"></div>
          </div>
        </div>

        {/* LEVEL 3: THE NAV MATRIX */}
        <div className="gt-nav-matrix">
          <div className="gt-nav-col">
            <h4 className="gt-nav-title">SITEMAP</h4>
            <Link to="/#top">HOME</Link>
            <Link to="/#about">ABOUT US</Link>
            <Link to="/#cta">CONTACT US</Link>
            {/* <Link to="/gallery">GALLERY</Link> */}
          </div>
          <div className="gt-nav-col">
            <h4 className="gt-nav-title">SERVICES</h4>
            {services.map((service) => (
              <Link key={service.id} to={service.path}>
                {service.title}
              </Link>
            ))}
          </div>
          {/* <div className="gt-nav-col">
            <h4 className="gt-nav-title">OFFERS</h4>
            <Link to="/offers/seasonal">SEASONAL PACKS</Link>
            <Link to="/offers/loyalty">LOYALTY PROGRAM</Link>
          </div> */}
          <div className="gt-nav-col">
            <h4 className="gt-nav-title">SUPPORT</h4>
            <span className="support-link">Email: <a href="mailto:hhcustomsindia@gmail.com">hhcustomsindia@gmail.com</a></span>
            <span className="support-link">Phone: <a href="https://wa.me/918111888790" target="_blank" rel="noopener noreferrer">8111888790</a>, <a href="https://wa.me/918111888791" target="_blank" rel="noopener noreferrer">8111888791</a></span>
          </div>
        </div>

        {/* LEVEL 4: BOTTOM BAR & GHOST LOGO */}
        <div className="gt-bottom-bar">
          <p className="gt-copyright"> 2026 PERFAMANA. DEVELOPED BY TEAM DOTCO. ALL RIGHTS RESERVED.</p>
          <div className="gt-ghost-logo">PERFAMANA</div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;