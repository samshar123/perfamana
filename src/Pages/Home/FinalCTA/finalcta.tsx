import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import "./finalcta.css";

const FinalCTA: React.FC = () => {
  const ctaRef = useRef<HTMLElement>(null);

  // Real on-scroll movement from left to right
  const { scrollYProgress } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"],
  });

  // Calculate raw scroll offset (-100 to 100)
  const rawCarX = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  // Spring value drives actual animation, initialized to -100 so it starts left
  const springCarX = useSpring(-100, {
    stiffness: 45,
    damping: 25,
    mass: 1,
    restDelta: 0.001
  });

  useEffect(() => {
    // Sync the spring target whenever scroll changes
    const unsubscribe = rawCarX.on("change", (latest) => {
      springCarX.set(latest);
    });
    // Trigger initial spring target right after mount so it visually drives in
    springCarX.set(rawCarX.get());
    return unsubscribe;
  }, [rawCarX, springCarX]);

  // Map spring numeric value back to a vw string
  const carX = useTransform(springCarX, (x) => `${x}vw`);

  return (
    <section id="cta" className="fcta-root" ref={ctaRef}>
      <div className="fcta-container">
        {/* MAIN VISUAL: SCROLL-DRIVEN MOVEMENT */}
        <div className="fcta-visual-wrap">
          <div className="fcta-perspective-layer">
            <motion.div
              className="fcta-car-mask"
              style={{ x: carX }}
            >
              {/* Dust particles */}
              <div className="fcta-dust-container">
                <span className="dust dust-1"></span>
                <span className="dust dust-2"></span>
                <span className="dust dust-3"></span>
                <span className="dust dust-4"></span>
                <span className="dust dust-5"></span>
                <span className="dust dust-6"></span>
                <span className="dust dust-7"></span>
                <span className="dust dust-8"></span>
              </div>

              <img
                src="/Images/tacoma.webp"
                alt="Perfamana Modified Performance"
                className="fcta-car-img fcta-car-rolling"
              />
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
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="fcta-kicker">MISSION  COMPLETE?</span>
            <h2 className="fcta-main-heading">
              FROM FOUR WHEELS TO TWO, <br />
              WE’VE GOT YOUR <span className="text-red">MODS COVERED!</span>
            </h2>
            <p className="fcta-sub-desc">
              Your vision, our laboratory. Let’s calibrate your next performance
              build together.
            </p>
          </motion.div>

          {/* PREMIUM WHATSAPP BUTTON */}
          <motion.div
            className="fcta-action"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
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
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
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
