import React from 'react';
import { motion} from 'framer-motion';
import './whyUs.css';

const features = [
  {
    id: '01',
    title: '5 YEARS OF  WARRANTY',
    desc: 'Engineering calibrated to aerospace tolerances. We eliminate mechanical variance through laser-synchronized diagnostics.',
    image: '/Images/img1.JPG'
  },
  {
    id: '02',
    title: 'TOP CLASS PRODUCTS',
    desc: 'Bespoke performance mapping and component fabrication tailored specifically to your vehicle’s mechanical DNA.',
    image: '/Images/About/abt1.jpg'
  },
  {
    id: '03',
    title: 'SAFE & LEGAL DEALINGS',
    desc: 'Empirical results only. Every modification is backed by comprehensive dyno-logs and thermal stress reports.',
    image: '/Images/Events/event1.jpg'
  }
];

const WhyUs: React.FC = () => {
  return (
    <section id='why-us' className="mono-root">
      <div className="mono-container">
        <header className="mono-header">
          <div className="mono-title-wrap">
            <span className="mono-kicker">WHY_PERFAMANA</span>
            <h2 className="mono-main-title">WHAT_MAKES_US_BETTER?</h2>
          </div>
        </header>

        <div className="mono-stack">
          {features.map((feature, index) => (
            <motion.div 
              key={feature.id}
              className={`mono-row ${index % 2 !== 0 ? 'rev' : ''}`}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* CREATIVE IMAGE CONTAINER */}
              <div className="mono-visual-wrap">
                <div className="mono-img-mask">
                  <img src={feature.image} alt={feature.title} />
                </div>
                {/* DECORATIVE SHAPE BEHIND IMAGE */}
                <div className="mono-shape-deco"></div>
              </div>

              {/* BOLD TEXT CONTENT */}
              <div className="mono-content">
                <div className="mono-meta">
                  <span className="mono-num">/ {feature.id}</span>
                  <div className="mono-line"></div>
                </div>
                <h3 className="mono-step-title">{feature.title}</h3>
                <p className="mono-step-desc">{feature.desc}</p>
                <div className="mono-status-badge">PROTOCOL_ACTIVE</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;