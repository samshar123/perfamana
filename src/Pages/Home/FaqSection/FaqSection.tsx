import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqApi } from '../../../api';
import type { FAQ } from '../../../api';
import './FaqSection.css';

const FaqSection: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [active, setActive] = useState<number>(0);

  useEffect(() => {
    const loadFAQs = async () => {
      try {
        setLoading(true);
        const data = await faqApi.getFAQs();
        setFaqs(data);
        setError(null);
      } catch (err) {
        setError('Failed to load FAQs');
        console.error('Error loading FAQs:', err);
      } finally {
        setLoading(false);
      }
    };

    loadFAQs();
  }, []);

  return (
    <section className="kq-root">
      <div className="kq-grid-overlay"></div>
      
      <div className="kq-container">
        <div className="kq-sidebar">
          <div className="kq-sticky">
            <span className="kq-kicker">FAQ  DATABASE</span>
            <h2 className="kq-main-title">TECHNICAL  RESOURCES</h2>
            <div className="kq-status-bar">
              <div className="status-dot"></div>
              <span>SYSTEMS  OPERATIONAL</span>
            </div>
          </div>
        </div>

        <div className="kq-main-content">
          {loading ? (
            <p className="kq-loading">INITIALIZING  DATA  STREAM...</p>
          ) : error ? (
            <p className="kq-error">{error}</p>
          ) : faqs.length > 0 ? (
            faqs.map((item, index) => (
              <div 
                key={item.id} 
                className={`kq-card ${active === index ? 'is-active' : ''}`}
                onMouseEnter={() => setActive(index)}
              >
                <div className="kq-card-header">
                  <span className="kq-index">{item.id.toString().padStart(3, '0')}</span>
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
            <p className="kq-loading">NO  FAQ  DATA  AVAILABLE</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;