import React from 'react';
import { motion } from 'framer-motion';
import './about.css';

const About: React.FC = () => {
  return (
    <section className="about-blueprint">
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
              <span className="bp-serial">REF_01_DNA</span>
              <div className="bp-line"></div>
            </div>

            <h2 className="bp-main-title">
              THE <br /> <span>ARCHITECTS</span> <br /> OF SPEED
            </h2>

            <p className="bp-text">
              Since 2017, Perfamana Labs has operated at the intersection of 
              art and physics. We don't just tune engines; we re-engineer the 
              soul of the machine. Every curve, every bolt, and every horse-power 
              is accounted for in our Calicut laboratory.
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
              src="../../../../public/Images/about/IMG_2751.jpg" 
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
              src="../../../../public/Images/about/abt1.jpg" 
              alt="Engine" 
            />
            <div className="bp-tag-label">MOD_V8_SPEC</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;