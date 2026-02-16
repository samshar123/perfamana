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