import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import eventData from '../../../data/events.json';
import './EventDetail.css';

const EventDetail: React.FC = () => {
  const { id } = useParams();
  const event = eventData.events.find(e => e.id === id);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!event) return <div className="ev-error">ERROR_404: EVENT_DATA_NOT_FOUND</div>;

  return (
    <div className="dossier-root">
      <div className="p-navbar-spacer" />

      <div className="dossier-container">
        {/* LEFT SIDE: FIXED VISUAL SPECS */}
        <div className="dossier-visual-panel">
          <div className="dossier-main-img">
            <img src={event.heroImage} alt={event.title} />
            <div className="img-corner-id">ARCHIVE_{event.id.slice(0, 5)}</div>
          </div>
          <div className="dossier-quick-stats">
            <div className="d-stat">
              <span className="d-label">COORDINATES</span>
              <span className="d-value">{event.location}</span>
            </div>
            <div className="d-stat">
              <span className="d-label">TIMESTAMP</span>
              <span className="d-value">{event.date} // {event.time}</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: SCROLLABLE INTEL */}
        <div className="dossier-data-panel">
          <Link to="/events" className="dossier-back-btn">
            <span className="back-arrow">←</span> BACK_TO_ARCHIVE
          </Link>

          <header className="dossier-header">
            <span className="dossier-kicker">// OFFICIAL_LOG_ENTRY</span>
            <h1 className="dossier-title">{event.title}</h1>
          </header>

          <section className="dossier-section">
            <h4 className="section-label">EXECUTIVE_SUMMARY</h4>
            <p className="dossier-description">{event.description}</p>
          </section>

          <section className="dossier-section">
            <h4 className="section-label">MISSION_GALLERY</h4>
            <div className="dossier-gallery-grid">
              {event.gallery.map((img, i) => (
                <motion.div 
                  key={i} 
                  className="gallery-item"
                  whileHover={{ scale: 1.02 }}
                >
                  <img src={img} alt={`Gallery ${i}`} />
                </motion.div>
              ))}
            </div>
          </section>

          <footer className="dossier-footer">
            {event.isRegistrationOpen ? (
              <a href={event.registrationLink} className="dossier-action-btn active" target="_blank" rel="noreferrer">
                INITIATE_REGISTRATION
              </a>
            ) : (
              <div className="dossier-action-btn disabled">
                REGISTRATION_LOCKED
              </div>
            )}
          </footer>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;