import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';

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
    <section id='process' ref={containerRef} className="proc-root">
      <div className="proc-sticky-wrapper">
        <div className="proc-main-layout">

          {/* LEFT: THE ENGINEERED WHEEL */}
          <div className="proc-visual-side">
            <div className="proc-visual-center">
              <div className="proc-id-display">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    PHASE {steps[activeStep].id}
                  </motion.span>
                </AnimatePresence>
              </div>

              <div className="proc-wheel-container">
                <motion.div style={{ rotate: smoothRotate }} className="proc-alloy-wheel">
                  <img src="/wheel.webp" alt="Alloy Wheel" className="wheel-image" />
                </motion.div>
                <div className="smoke-container">
                  <div className="smoke-particle p1"></div>
                  <div className="smoke-particle p2"></div>
                  <div className="smoke-particle p3"></div>
                </div>
              </div>

              <div className="proc-visual-deco">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={isFinalStep ? 'ready' : 'progress'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={isFinalStep ? "status-ready" : "STATUS_IN_PROGRESS"}
                  >
                    {isFinalStep ? "LET'S HIT THE ROAD" : "CRAFTING IN PROGRESS"}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* RIGHT: THE STEP DATA */}
          <div className="proc-data-side">
            <header className="proc-header">
              <h2 className="proc-section-title">OUR PROCESS</h2>
            </header>

            <div className="proc-steps-list">
              <AnimatePresence mode="wait">
                {steps.map((step, index) => (
                  activeStep === index && (
                    <motion.div
                      key={step.id}
                      className={`proc-step-unit active`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="proc-step-top">
                        <span className="step-number">{step.id}</span>
                        <div className="step-line"></div>
                      </div>
                      <h3 className="step-name">{step.title}</h3>
                      <p className="step-info">{step.desc}</p>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>

            <footer className="proc-footer">
              <a
                href="#cta"
                className={`proc-tactical-btn ${isFinalStep ? 'btn-final-state' : ''}`}
              >
                <span className="btn-glitch">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={isFinalStep ? 'final' : 'consult'}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {isFinalStep ? "CONFIRM PROJECT START" : "GO CONSULT OUR EXPERT"}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <div className="btn-scanner"></div>
                <span className="btn-arrow">→</span>
              </a>
            </footer>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProcessSection;