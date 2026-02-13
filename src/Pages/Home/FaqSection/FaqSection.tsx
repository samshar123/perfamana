import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './faqSection.css';

interface FAQItem {
  id: string;
  q: string;
  a: string;
}

const FaqSection: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [active, setActive] = useState<number>(0);

  useEffect(() => {
    // Fetching from public/data/faq.json
    fetch('../../src/data/faq.json')
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setFaqs(data))
      .catch((err) => console.error("Error loading FAQs:", err));
  }, []);

  

  return (
    <section className="kq-root">
      <div className="kq-grid-overlay"></div>
      
      <div className="kq-container">
        <div className="kq-sidebar">
          <div className="kq-sticky">
            <span className="kq-kicker">// FAQ_DATABASE</span>
            <h2 className="kq-main-title">TECHNICAL_RESOURCES</h2>
            <div className="kq-status-bar">
              <div className="status-dot"></div>
              <span>SYSTEMS_OPERATIONAL</span>
            </div>
          </div>
        </div>

        <div className="kq-main-content">
          {faqs.length > 0 ? (
            faqs.map((item, index) => (
              <div 
                key={item.id} 
                className={`kq-card ${active === index ? 'is-active' : ''}`}
                onMouseEnter={() => setActive(index)}
              >
                <div className="kq-card-header">
                  <span className="kq-index">{item.id}</span>
                  <h3 className="kq-question">{item.q}</h3>
                </div>

                <AnimatePresence>
                  {active === index && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0, x: -20 }}
                      animate={{ height: "auto", opacity: 1, x: 0 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="kq-answer-box"
                    >
                      <p className="kq-answer">{item.a}</p>
                      <div className="kq-scan-glow"></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))
          ) : (
            <p className="kq-loading">INITIALIZING_DATA_STREAM...</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;