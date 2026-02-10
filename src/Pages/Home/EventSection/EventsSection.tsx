import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import eventData from '../../../data/events.json';
import './EventsSection.css';

const EventSection: React.FC = () => {
  const latestEvents = eventData.events.slice(0, 6);

  return (
    <section className="hud-root">
      {/* BACKGROUND GRID & DECOR */}
      <div className="hud-grid-overlay"></div>
      
      <div className="hud-container">
        <header className="hud-header">
          <div className="hud-title-block">
            <span className="hud-system-status">Perfamana's</span>
            <h2 className="hud-main-title">TOP NOTCH EVENTS</h2>
          </div>
          <div className="hud-actions">
            <Link to="/allevents" className="hud-btn-primary">VIEW ALL EVENTS</Link>
          </div>
        </header>

        <div className="hud-map">
          {/* SVG CONNECTOR LINES */}
          <svg className="hud-lines-svg">
            <line x1="10%" y1="20%" x2="40%" y2="50%" className="hud-line" />
            <line x1="40%" y1="50%" x2="70%" y2="30%" className="hud-line" />
            <line x1="40%" y1="50%" x2="30%" y2="80%" className="hud-line" />
          </svg>

          <div className="hud-nodes-grid">
            {latestEvents.map((event, index) => (
              <motion.div 
                key={event.id}
                className={`hud-node node-${index + 1}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5, x: 2 }}
              >
                <Link to={`/events/${event.id}`} className="hud-node-inner">
                  <div className="hud-node-header">
                    <span className="hud-signal">SIGNAL_00{index + 1}</span>
                    <div className="hud-status-light"></div>
                  </div>
                  
                  <div className="hud-node-visual">
                    <img src={event.heroImage} alt="" />
                    <div className="hud-glitch-overlay"></div>
                  </div>

                  <div className="hud-node-body">
                    <h3 className="hud-node-title">{event.title}</h3>
                    <div className="hud-node-stats">
                      <div className="stat-row"><span>DATE:</span> {event.date}</div>
                      <div className="stat-row"><span>LOC:</span> {event.location}</div>
                    </div>
                  </div>

                  <div className="hud-corner-brackets">
                    <span></span><span></span><span></span><span></span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventSection;