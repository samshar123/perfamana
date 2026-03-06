import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import API_BASE from '../../../config/api';
import './EventsSection.css';

interface EventData {
  id: number;
  slug: string;
  title: string;
  heroImage: string | null;
  date: string;
  time: string;
  location: string;
}

const EventSection: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/events/`)
      .then(res => res.json())
      .then(data => setEvents(data.slice(0, 6)))
      .catch(err => console.error('Failed to fetch events:', err));
  }, []);

  return (
    <section className="prism-root" id="events">
      <div className="prism-top-row">
        <header className="prism-header-main">
          <span className="prism-kicker">EXCLUSIVE  STABLES</span>
          <h2 className="prism-main-title">ELITE  EVENTS</h2>
        </header>
        <Link to="/allevents" className="prism-all-events-btn">
          <span>VIEW  FULL  CALENDAR</span>
          <div className="btn-circle">→</div>
        </Link>
      </div>

      <div className="prism-flex-container">
        {featuredEvents.map((event, index) => (
          <motion.div
            key={event.id}
            className={`prism-shard ${hoveredIndex === index ? 'is-expanded' : ''}`}
            onMouseEnter={() => setHoveredIndex(index)}
            initial={false}
            animate={{ flex: hoveredIndex === index ? 3 : 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* GRAYSCALE TO COLOR TRANSITION */}
            <div className="prism-bg-wrap">
              <motion.img
                src={event.heroImage}
                alt={event.title}
                animate={{
                  scale: hoveredIndex === index ? 1 : 1.15,
                  filter: hoveredIndex === index
                    ? 'brightness(1)'
                    : 'brightness(0.7)'
                }}
                transition={{ duration: 1 }}
                className="prism-img"
              />
              <div className="prism-overlay"></div>
            </div>

          <div className="hud-nodes-grid">
            {events.map((event, index) => (
              <motion.div 
                key={event.slug}
                className={`hud-node node-${index + 1}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5, x: 2 }}
              >
                <Link to={`/events/${event.slug}`} className="hud-node-inner">
                  <div className="hud-node-header">
                    <span className="hud-signal">SIGNAL_00{index + 1}</span>
                    <div className="hud-status-light"></div>
                  </div>
                  
                  <div className="hud-node-visual">
                    {event.heroImage && <img src={event.heroImage} alt="" />}
                    <div className="hud-glitch-overlay"></div>
                  </div>

              <div className="prism-body">
                <h3 className="prism-title">{event.title}</h3>

                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="prism-details"
                    >
                      {/* <p className="prism-desc">
                        A bespoke performance showcase focusing on precision engineering and elite calibration at {event.location}.
                      </p> */}
                      <Link to={`/events/${event.id}`} className="prism-btn">
                        EXPLORE  STORY
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="prism-footer">
                <div className="prism-stat">
                  <label>LOCATION</label>
                  <p>{event.location}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default EventSection;