import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { eventsApi } from '../../../api/events';
import type { Event } from '../../../api/types';
import './EventsSection.css';

const EventSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventsApi.getEvents();
        setEvents(data);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const featuredEvents = events.slice(0, 3);

  if (loading) {
    return <div className="loading">Loading events...</div>;
  }

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
        {featuredEvents.map((event: Event, index: number) => (
          <motion.div
            key={event.slug}
            className={`prism-shard ${hoveredIndex === index ? 'is-expanded' : ''}`}
            onMouseEnter={() => setHoveredIndex(index)}
            initial={false}
            animate={{ flex: hoveredIndex === index ? 3 : 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* GRAYSCALE TO COLOR TRANSITION */}
            <div className="prism-bg-wrap">
              <motion.img
                src={event.heroImage || ''}
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

            <div className="prism-content">
              <span className="prism-index">{index + 1}</span>

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
                      <Link to={`/events/${event.slug}`} className="prism-btn">
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