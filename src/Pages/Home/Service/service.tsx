import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import serviceData from '../../../data/services.json';
import './service.css';

const Service: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Moves the track horizontally
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <div id='services' ref={containerRef} className="hz-container">
      <div className="hz-sticky">
        {/* BACKGROUND SCAN LINES */}
        <div className="hz-scanlines"></div>
        
        <motion.div style={{ x }} className="hz-track">
          {serviceData.services.map((service, i) => (
            <div key={service.id} className="hz-slide">
              <div className="hz-modern-card">
                
                {/* 1. TOP UI BAR */}
                <div className="hz-card-ui-top">
                  <span className="hz-serial">REF_0{i + 1}</span>
                  <div className="hz-status-dot"></div>
                  <span className="hz-category">PERFORMANCE_LAB</span>
                </div>

                {/* 2. IMAGE WITH FLOATING CORNERS */}
                <div className="hz-image-section">
                  <div className="hz-corner tl"></div>
                  <div className="hz-corner tr"></div>
                  <div className="hz-corner bl"></div>
                  <div className="hz-corner br"></div>
                  <img src={service.thumbnail} alt={service.title} />
                  <div className="hz-img-overlay"></div>
                </div>

                {/* 3. BOLD CONTENT AREA */}
                <div className="hz-info-section">
                  <h2 className="hz-title">{service.title}</h2>
                  <p className="hz-description">{service.shortDesc}</p>
                  
                  {/* GLOWING BUTTON */}
                 <div className="gear-btn-wrapper">
  <button className="gear-gate-btn" onClick={() => navigate(service.path)}>
    {/* NEW: CONTINUOUS BORDER TRACE */}
    <svg className="btn-trace-svg">
      <rect className="trace-rect" x="0" y="0" width="100%" height="100%" />
    </svg>

    {/* The H-Pattern Gate Background */}
    <div className="gate-background">
      <div className="gate-line vertical left"></div>
      <div className="gate-line vertical right"></div>
      <div className="gate-line horizontal"></div>
    </div>

    {/* The Shifter Knob */}
    <div className="shifter-knob">
      <div className="knob-core">
        <span className="knob-icon">→</span>
      </div>
      <div className="knob-trail"></div>
    </div>

    {/* Labeling */}
    <div className="gear-label">
      <span className="label-main">ENGAGE_SPEC</span>
      
    </div>
  </button>
</div>
                </div>
              </div>
            </div>
          ))}

          {/* SHOWROOM PROMO SLIDE (INDUSTRIAL STYLE) */}
          <div className="hz-slide">
            <div className="hz-promo-card">
              <div className="promo-inner">
                <div className="promo-tag">EXCLUSIVE_ACCESS</div>
                <h3>VISIT OUR <br /> SHOWROOM</h3>
                <p>LIVE DIAGNOSTICS & 20% DISCOUNT ON ALL PREMIUM MODULES.</p>
                <button className="promo-link" onClick={() => navigate('/showroom')}>
                  GET_OFFER_CODE
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Service;