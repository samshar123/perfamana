import React from 'react';
import { motion, type Variants } from 'framer-motion'; // Added the 'type' keyword here
import { ChevronRight } from 'lucide-react';
import './landing.css';

const Landing: React.FC = () => {
  // 1. Define the Parent animation (controls the stagger)
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.3, 
        delayChildren: 0.2 
      },
    },
  };

  // 2. Define the Child animation (how each element slides in)
  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (
    <section className="landing-section">
      <div className="landing-visual-anchor">
        <div className="accent-shape"></div>
      </div>

      {/* The Parent motion element */}
      <motion.div 
        className="landing-wrapper"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* The Children motion elements */}
        <motion.div variants={itemVariants} className="landing-kicker">
          <span className="kicker-line"></span>
          PREMIUM AUTO LABS
        </motion.div>

        <motion.h1 variants={itemVariants} className="landing-hero-text">
          PERFA<span className="text-highlight">MANA</span>
        </motion.h1>

        <motion.div variants={itemVariants} className="landing-info">
          <p>
            Experience the next level of automotive excellence in <strong>Calicut</strong>. 
            We specialize in high-end wraps, performance tuning, and bespoke body kits.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="landing-actions">
          <button className="btn-main">
            VIEW BUILDS <ChevronRight size={18} />
          </button>
          <button className="btn-ghost">
            GET IN TOUCH
          </button>
        </motion.div>
      </motion.div>

      <div className="landing-side-info">
        <span>ESTD 2026</span>
        <div className="vertical-bar"></div>
        <span>KERALA</span>
      </div>
    </section>
  );
};

export default Landing;