import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { eventsApi } from '../../../api/events';
import type { Event } from '../../../api/types';
import './EventDetail.css';

const EventDetail: React.FC = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch event details from API
  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;
      
      try {
        const data = await eventsApi.getEventBySlug(id);
        setEvent(data);
      } catch (error) {
        console.error('Failed to fetch event details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return <div className="ev-error">LOADING  EVENT  DATA...</div>;
  }

  if (!event) return <div className="ev-error">ERROR  404:  EVENT  DATA  NOT  FOUND</div>;

  return (
    <div className="dossier-root">
      <div className="p-navbar-spacer" />

      <div className="dossier-container">
        {/* LEFT SIDE: FIXED VISUAL SPECS */}
        <div className="dossier-visual-panel">
          <div className="dossier-main-img">
            <img src={event.heroImage || '/Images/Events/default.jpg'} alt={event.title} />
            <div className="img-corner-id">ARCHIVE  {event.slug.slice(0, 5)}</div>
          </div>
          <div className="dossier-quick-stats">
            <div className="d-stat">
              <span className="d-label">COORDINATES</span>
              <span className="d-value">{event.location}</span>
            </div>
            <div className="d-stat">
              <span className="d-label">TIMESTAMP</span>
              <span className="d-value">{event.date} | {event.time}</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: SCROLLABLE INTEL */}
        <div className="dossier-data-panel">
          <Link to="/allevents" className="dossier-back-btn">
            <span className="back-arrow">←</span> BACK  TO  ARCHIVE
          </Link>

          <header className="dossier-header">
            <span className="dossier-kicker">OFFICIAL  LOG  ENTRY</span>
            <h1 className="dossier-title">{event.title}</h1>
          </header>

          <section className="dossier-section">
            <h4 className="section-label">EXECUTIVE  SUMMARY</h4>
            <p className="dossier-description">{event.description}</p>
          </section>

          <section className="dossier-section">
            <h4 className="section-label">MISSION  GALLERY</h4>
            <div className="dossier-gallery-grid">
              {event.gallery?.map((img, i) => (
                <motion.div 
                  key={i} 
                  className="gallery-item"
                  whileHover={{ scale: 1.02 }}
                >
                  <img 
                    src={img} 
                    alt={`Gallery ${i}`} 
                    onError={(e) => {
                      console.error('Gallery image failed to load:', img);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </section>

          <footer className="dossier-footer">
            {event.isRegistrationOpen ? (
              <a href={event.registrationLink} className="dossier-action-btn active" target="_blank" rel="noreferrer">
                INITIATE  REGISTRATION
              </a>
            ) : (
              <div className="dossier-action-btn disabled">
                REGISTRATION  LOCKED
              </div>
            )}
          </footer>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;