import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE from '../../config/api';
import './Allevents.css';

interface EventData {
  id: number;
  slug: string;
  title: string;
  heroImage: string | null;
  date: string;
  time: string;
  location: string;
  isRegistrationOpen?: boolean;
}

const AllEvents: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [filter, setFilter] = useState<'ALL' | 'UPCOMING' | 'PAST'>('ALL');
  const [query, setQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${API_BASE}/api/events/`)
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error('Failed to fetch events:', err));
  }, []);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(query.toLowerCase()) || 
                          event.location.toLowerCase().includes(query.toLowerCase());
    
    if (filter === 'UPCOMING') return matchesSearch && event.isRegistrationOpen;
    if (filter === 'PAST') return matchesSearch && !event.isRegistrationOpen;
    return matchesSearch;
  });

  return (
    <div className="archive-root">
      <div className="p-navbar-spacer" />
      
      <header className="archive-header">
        <div className="archive-title-area">
          <span className="archive-kicker">PERFAMANA PRESENTS</span>
          <h1 className="archive-main-title">EVENT MASTER LOG</h1>
        </div>

        {/* SEARCH & FILTER HUD */}
        <div className="archive-controls">
          <div className="archive-search-box">
     
            <input 
              type="text" 
              placeholder="SEARCH EVENTS BY KEYWORD OR LOCATION" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          
          <div className="archive-filter-tabs">
            {['ALL', 'UPCOMING', 'PAST'].map((type) => (
              <button 
                key={type}
                className={`filter-tab ${filter === type ? 'active' : ''}`}
                onClick={() => setFilter(type as any)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="archive-grid-container">
        <div className="archive-results-count">
          FOUND_{filteredEvents.length}_RECORDS_MATCHING_CRITERIA
        </div>

        <motion.div layout className="archive-grid">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event) => (
              <motion.div 
                layout
                key={event.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="archive-card"
              >
                <Link to={`/events/${event.slug}`} className="archive-card-link">
                  <div className="archive-img-wrapper">
                    {event.heroImage && <img src={event.heroImage} alt={event.title} />}
                    <div className={`status-tag ${event.isRegistrationOpen ? 'live' : 'archived'}`}>
                      {event.isRegistrationOpen ? 'LIVE_STATUS' : 'ARCHIVED'}
                    </div>
                  </div>
                  
                  <div className="archive-card-content">
                    <div className="archive-card-top">
                      <span className="archive-card-id">ID: {event.slug.slice(0, 8)}</span>
                      <span className="archive-card-date">{event.date}</span>
                    </div>
                    <h3 className="archive-card-title">{event.title}</h3>
                    <div className="archive-card-footer">
                      <span className="archive-card-loc">{event.location}</span>
                      <span className="archive-card-arrow">READ_DATA →</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredEvents.length === 0 && (
          <div className="archive-empty">
            NO_RECORDS_FOUND_IN_THE_SPECIFIED_SECTOR.
          </div>
        )}
      </main>
    </div>
  );
};

export default AllEvents;