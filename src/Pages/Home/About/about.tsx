import React from 'react';
import { motion } from 'framer-motion';
import './about.css';

const About: React.FC = () => {
  return (
    <section id='about' className="about-blueprint">
      {/* BACKGROUND ELEMENTS */}
      <div className="bp-grid"></div>
      
      <div className="bp-container">
        {/* LEFT SECTION: TECHNICAL DATA */}
        <div className="bp-data-side">
          <motion.div 
            className="bp-content-box"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="bp-header">
              <span className="bp-serial">REF  01  DNA</span>
              <div className="bp-line"></div>
            </div>

            <h2 className="bp-main-title">
              WHERE <br /> <span>PERFORMANCE MEETS</span> <br /> PERFECTION
            </h2>

            <p className="bp-text">
              Founded in 2016, Perfamana was built on two simple beliefs, performance and trust. We saw a market full of inconsistent quality and chose to do things differently. From premium leather interiors to track-ready performance upgrades, every service we offer is backed by OEM-grade craftsmanship and genuine materials. At Perfamana, your car isn't just a vehicle, it's a reflection of who you are, and we treat it that way.
            </p>

            <div className="bp-features">
              <div className="feat-row">
                <span className="feat-tag">01</span>
                <p>PRECISION AERODYNAMICS</p>
              </div>
              <div className="feat-row">
                <span className="feat-tag">02</span>
                <p>STAGE 3 PERFORMANCE CORE</p>
              </div>
              <div className="feat-row">
                <span className="feat-tag">03</span>
                <p>BESPOKE AESTHETIC ARMOR</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT SECTION: MECHANICAL WINDOW */}
        <div className="bp-visual-side">
          <motion.div 
            className="bp-image-frame"
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <img 
              src="/Images/About/about1.jpeg" 
              alt="Engineering" 
              className="bp-main-img"
            />
            <div className="bp-corner-ui"></div>
            <div className="bp-scanner-line"></div>
          </motion.div>

          {/* SECONDARY FLOATING ELEMENT */}
          <motion.div 
            className="bp-secondary-frame"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <img 
              src="/Images/About/about2.jpeg" 
              alt="Engine" 
            />
            <div className="bp-tag-label">MOD  V8  SPEC</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;