import React from 'react';
import { motion } from 'framer-motion';
import './finalCTA.css';

const FinalCTA: React.FC = () => {
  return (
    <section className="fcta-root">
      <div className="fcta-container">
        
        {/* MAIN VISUAL: SLOW CINEMATIC ZOOM */}
        <div className="fcta-visual-wrap">
          <div className="fcta-perspective-layer">
            <motion.div 
              className="fcta-car-mask"
              // Start further back and more transparent for a longer travel feel
              initial={{ opacity: 0, scale: 0.3, z: -500 }} 
              whileInView={{ opacity: 1, scale: 1, z: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 3.0, // Increased to 3 seconds for a slow, majestic arrival
                ease: [0.19, 1, 0.22, 1], // Ultra-smooth power-out curve
                delay: 0.2 
              }}
            >
              <img 
                src="/Images/ctaimg.png" 
                alt="Perfamana Modified Performance" 
                className="fcta-car-img"
              />
              <div className="fcta-light-flare left"></div>
              <div className="fcta-light-flare right"></div>
              <div className="fcta-overlay-vignette"></div>
            </motion.div>
          </div>
        </div>

        {/* CONTENT OVERLAY */}
        <div className="fcta-content">
          <motion.div 
            className="fcta-text-bundle"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            // Text waits for the car to almost finish its 3s journey
            transition={{ duration: 1, delay: .5 }} 
          >
            <span className="fcta-kicker">// MISSION_COMPLETE?</span>
            <h2 className="fcta-main-heading">
              FROM FOUR WHEELS TO TWO, <br />
              WE’VE GOT YOUR <span className="text-red">MODS COVERED!</span>
            </h2>
            <p className="fcta-sub-desc">
              Your vision, our laboratory. Let’s calibrate your next performance build together.
            </p>
          </motion.div>

          {/* PREMIUM WHATSAPP BUTTON */}
          <motion.div 
            className="fcta-action"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: .5 }}
          >
            <a 
              href="https://wa.me/917306096088" 
              target="_blank" 
              rel="noreferrer" 
              className="fcta-whatsapp-btn"
            >
              <div className="btn-pulse"></div>
              <span className="btn-label">CHAT WITH OUR EXPERT</span>
              <span className="btn-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.025 3.207l-.694 2.516 2.576-.676c.881.473 1.856.72 2.859.72h.001c3.181 0 5.766-2.587 5.767-5.766 0-3.18-2.585-5.767-5.766-5.767zm3.391 8.213c-.144.405-.833.743-1.152.791-.319.048-.714.074-1.132-.059-.258-.082-.587-.196-1.02-.383-1.835-.796-3.041-2.708-3.132-2.83-.093-.121-.739-.983-.739-1.853 0-.87.455-1.298.616-1.465.162-.166.353-.208.471-.208h.336c.108 0 .252-.04.395.302.144.341.491 1.2.534 1.289.043.089.071.191.014.302-.057.111-.086.191-.171.291-.086.099-.181.222-.258.291-.086.077-.175.16-.076.329.099.169.441.727.948 1.179.652.582 1.2.763 1.37.847.169.084.269.07.369-.045.1-.116.427-.497.541-.668.114-.171.228-.143.384-.086.157.057.994.469 1.165.554s.284.128.327.201c.042.073.042.42-.102.825z" />
                </svg>
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;