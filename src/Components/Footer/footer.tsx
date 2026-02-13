import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../public/Images/logo1.jpg';
import './footer.css';

const Footer: React.FC = () => {
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
            <span className="gt-label">// HEAD_OFFICE</span>
            <address className="gt-address">
              Rise TBI, Arrekode, <br />
              Malappuram, Kerala 673639
            </address>
          </div>
          <div className="gt-social-col">
            <span className="gt-label">// CONNECT SOCIAL</span>
            <div className="gt-social-links">
              <a href="https://instagram.com/samshar.dotco" target="_blank">INSTAGRAM</a>
              <a href="https://linkedin.com/in/samshar-for-marketing" target="_blank">LINKEDIN</a>
              <a href="https://wa.me/917306096088" target="_blank">WHATSAPP</a>
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125218.41168541908!2d75.746197!3d11.258753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65938563d4747%3A0x321557147a375a2!2sKozhikode%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
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
            <Link to="/">HOME</Link>
            <Link to="/about">ABOUT US</Link>
            <Link to="/process">PROCESS</Link>
            <Link to="/gallery">GALLERY</Link>
          </div>
          <div className="gt-nav-col">
            <h4 className="gt-nav-title">SERVICES</h4>
            <Link to="/service/tuning">PERFORMANCE TUNING</Link>
            <Link to="/service/body">BODY MODIFICATION</Link>
            <Link to="/service/detailing">PREMIUM DETAILING</Link>
          </div>
          <div className="gt-nav-col">
            <h4 className="gt-nav-title">OFFERS</h4>
            <Link to="/offers/seasonal">SEASONAL PACKS</Link>
            <Link to="/offers/loyalty">LOYALTY PROGRAM</Link>
          </div>
          <div className="gt-nav-col">
            <h4 className="gt-nav-title">SUPPORT</h4>
            <Link to="/faq">TECHNICAL FAQ</Link>
            <Link to="/terms">WARRANTY TERMS</Link>
            <Link to="/privacy">PRIVACY PROTOCOL</Link>
          </div>
        </div>

        {/* LEVEL 4: BOTTOM BAR & GHOST LOGO */}
        <div className="gt-bottom-bar">
          <p className="gt-copyright">© 2026 PERFAMANA. DEVELOPED BY TEAM DOTCO. ALL RIGHTS RESERVED.</p>
          <div className="gt-ghost-logo">PERFAMANA</div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;