import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { Link } from 'react-router-dom';
import './ProcessSection.css';

const steps = [
  { id: '01', title: 'CONSULTATION & CONCEPT', desc: 'Technical briefing to analyze vehicle DNA and define performance milestones.' },
  { id: '02', title: 'DESIGN & PLANNING', desc: 'Precision CAD modeling and aero-simulation for peak mechanical efficiency.' },
  { id: '03', title: 'BODY & MODIFICATION', desc: 'Structural engineering and integration of bespoke parts in lab conditions.' },
  { id: '04', title: 'DETAILING & FINISHING', desc: 'Multi-stage surface refinement and self-healing protective protocols.' },
  { id: '05', title: 'INSPECTION & APPROVAL', desc: 'Multi-point safety validation and telemetry calibration for final sign-off.' },
  { id: '06', title: 'AFTERCARE SUPPORT', desc: '24/7 technical log and performance optimization to preserve the build.' }
];

const ProcessSection: React.FC = () => {
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isFinalStep, setIsFinalStep] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smoother rotation physics
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const smoothRotate = useSpring(rotate, { stiffness: 60, damping: 25 });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Determine active step index (0 to 5)
    const stepIndex = Math.min(Math.floor(latest * steps.length), steps.length - 1);
    setActiveStep(stepIndex);
    
    // Check if we have scrolled through all steps
    if (latest > 0.9) {
      setIsFinalStep(true);
    } else {
      setIsFinalStep(false);
    }
  });

  return (
    <section ref={containerRef} className="proc-root">
      <div className="proc-sticky-wrapper">
        <div className="proc-main-layout">
          
          {/* LEFT: THE ENGINEERED WHEEL */}
          <div className="proc-visual-side">
            <div className="proc-visual-center">
              <div className="proc-id-display">PHASE_{steps[activeStep].id}</div>
              
              <motion.div style={{ rotate: smoothRotate }} className="proc-alloy-wheel">
                <div className="wheel-tire"></div>
                <div className="wheel-rim-inner"></div>
                <div className="wheel-spokes-complex">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="spoke-unit" style={{ transform: `rotate(${i * 60}deg)` }}></div>
                  ))}
                </div>
                <div className="wheel-caliper"></div>
                <div className="wheel-center-cap"></div>
              </motion.div>
              
              <div className="proc-visual-deco">
                <span className={isFinalStep ? "status-ready" : "STATUS_IN_PROGRESS"}>
                  {isFinalStep ? "LET'S HIT THE ROAD" : "CRAFTING IN PROGRESS"}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: THE STEP DATA */}
          <div className="proc-data-side">
            <header className="proc-header">
              <span className="proc-kicker">OUR PROCESS</span>
              <h2 className="proc-section-title">CRAFTING YOUR DREAM,THATS OUR PROCESS.</h2>
            </header>

            <div className="proc-steps-list">
              {steps.map((step, index) => (
                <motion.div 
                  key={step.id} 
                  className={`proc-step-unit ${activeStep === index ? 'active' : ''}`}
                  initial={false}
                  animate={{ 
                    opacity: activeStep === index ? 1 : 0,
                    x: activeStep === index ? 0 : 20,
                    display: activeStep === index ? "block" : "none"
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="proc-step-top">
                    <span className="step-number">[{step.id}]</span>
                    <div className="step-line"></div>
                  </div>
                  <h3 className="step-name">{step.title}</h3>
                  <p className="step-info">{step.desc}</p>
                </motion.div>
              ))}
            </div>

            <footer className="proc-footer">
              <Link 
                to="/contact" 
                className={`proc-tactical-btn ${isFinalStep ? 'btn-final-state' : ''}`}
              >
                <span className="btn-glitch">
                  {isFinalStep ? "CONFIRM_PROJECT_START" : "GO_CONSULT_OUR_EXPERT"}
                </span>
                <div className="btn-scanner"></div>
                <span className="btn-arrow">→</span>
              </Link>
            </footer>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProcessSection;