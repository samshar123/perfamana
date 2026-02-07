import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import img1 from "../../../../public/Images/Home/ford1-Photoroom.png";
import img2 from "../../../../public/Images/Home/ford2.png";
import img3 from "../../../../public/Images/Home/polo2.png";
import img4 from "../../../../public/Images/Home/polo1.png";
import "./landing.css";

const carData = [
  {
    id: "01",
    title: "TRANSFORMING",
    desc: "CARS SINCE 2017",
    baseImg: img3,
    darkImg: img4,
  },
  {
    id: "02",
    title: "ENGINEERING",
    desc: "720HP PERFORMANCE UNLOCKED",
    baseImg: img1,
    darkImg: img2,
  },
  {
    id: "03",
    title: "AESTHETICS",
    desc: "SATIN STEALTH FINISH LABS",
    baseImg: img1,
    darkImg: img2,
  },
];

const Landing: React.FC = () => {
  const [index, setIndex] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);

  // Set initial 50/50 split on mount
  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.style.setProperty("--split", "50%");
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setIndex((p) => (p + 1) % carData.length), 5000);
    return () => clearInterval(timer);
  }, []);

  // Controls the scan via the slider only
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    viewportRef.current?.style.setProperty("--split", `${val}%`);
  };

  return (
    <section ref={viewportRef} className="pf-viewport">
        
      {/* RICH MECHANICAL BACKGROUND GRAPHICS */}
      <div className="aniamtiondivlanfing">
        <div className="power-core">
          <div className="core-sector s-1"></div>
          <div className="core-sector s-2"></div>
          <div className="core-sector s-3"></div>
        </div>
        <div className="industrial-frame top-right"></div>
        <div className="industrial-frame bottom-left"></div>
        <div className="tech-block b-1"><span>UNIT_720</span></div>
        <div className="tech-block b-2"><span>LAB_04</span></div>
      </div>

      <div className="pf-grid-bg"></div>
      <div className="pf-watermark">PERFAMANA</div>

   

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="pf-stage"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {/* LAYER 1: LIGHT MODE */}
          <div className="pf-layer light-mode">
            <div className="pf-container">
              <h1 className="pf-title">{carData[index].title}</h1>
              <p className="pf-desc">{carData[index].desc}</p>
              <div className="pf-img-box">
                <img src={carData[index].baseImg} alt="Base" />
              </div>
            </div>
          </div>

          {/* LAYER 2: DARK MODE (REVEAL) */}
          <div className="pf-layer dark-mode">
            <div className="pf-container">
              <h1 className="pf-title stroke-red">{carData[index].title}</h1>
              <p className="pf-desc red-text">{carData[index].desc}</p>
              <div className="pf-img-box">
                <img src={carData[index].darkImg} className="neon-saturate" alt="Reveal" />
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="pf-scanner-blade">
        <div className="scanner-glow">
            
        </div>
      </div>

      {/* GLOBAL SLIDER CONTROL (Desktop & Mobile) */}
      <div className="slider-control-wrapper">
        <input 
          type="range" 
          min="0" 
          max="100" 
          
          
          defaultValue="50" 
          className="xray-slider-input"
          onChange={handleSliderChange}
        />
       
      </div>

      <footer className="pf-ui pf-footer">
        <div className="pf-dots">
            
          {carData.map((_, i) => (
            <div key={i} className={`dot ${index === i ? "active" : ""}`} />
          ))}
        </div>
        <div className="pf-loc">CALICUT // KERALA</div>
      </footer>
    </section>
  );
};

export default Landing;