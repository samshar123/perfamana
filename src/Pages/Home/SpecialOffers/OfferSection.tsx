import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './offerSection.css';
import videoSrc from "../../../../public/video1.mp4";
import posterImg from "../../../../public/posterimg.png";

const IgnitionOffer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isIgnited, setIsIgnited] = useState(false);
  const navigate = useNavigate();

 const handleIgnition = () => {
  setIsIgnited(true);
  if (videoRef.current) {
    videoRef.current.play();
    videoRef.current.playbackRate = 1.50; 
  }
  
  setTimeout(() => {
    navigate('/offers');
    // Force the window to the top immediately after navigation
    window.scrollTo(0, 0);
  }, 1800);
};

  return (
    <section id='offers' className={`ign-viewport ${isIgnited ? 'active-launch' : ''}`}>
      {/* 1. THE VIDEO WITH PERMANENT POSTER SCREENSHOT */}
      <video 
        ref={videoRef}
        className="ign-video"
        muted 
        loop 
        playsInline
        poster={posterImg} // This ensures the screenshot shows first
        preload="auto"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* GIANT BACKGROUND DECOR */}
      <div className="ign-bg-giant-text">OFFER</div>

      <AnimatePresence>
        {!isIgnited && (
          <motion.div 
            className="ign-main-ui"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ scale: 2, opacity: 0, filter: 'blur(40px)' }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="ign-content-frame">
              <div className="ign-top-bar">
                <div className="ign-red-dot"></div>
                <span style={{color:"white", fontSize:"1rem"}} className="ign-terminal-text">GET YOUR OFFERS</span>
              </div>

              <h1 className="ign-bold-title">
                ELITE<br/>
                <span className="text-outline">OFFER</span><br/>
                VAULT.
              </h1>

              <div className="ign-bottom-row">
             
                
                <button className="ign-massive-trigger" onClick={handleIgnition}>
                  <div className="ign-btn-fill"></div>
                  <span className="ign-btn-text">IGNITE PROTOCOL</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LAUNCH SEQUENCE OVERLAY */}
      {isIgnited && (
        <div className="ign-launch-overlay">
          
          
        </div>
      )}
    </section>
  );
};

export default IgnitionOffer;