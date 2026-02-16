import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE from '../../config/api';
import './offersPage.css';

interface BrandData {
  id: number;
  name: string;
  slug: string;
  logo: string | null;
  models: { id: number; name: string; offers: string[] }[];
}

const OffersPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [brands, setBrands] = useState<BrandData[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    brand: '', model: '', name: '', phone: '', email: '', location: ''
  });

  useEffect(() => {
    fetch(`${API_BASE}/api/offers-data/`)
      .then(res => res.json())
      .then(data => {
        setBrands(data.brands);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch offers:', err);
        setLoading(false);
      });
  }, []);

  // Filter Logic
  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedBrandData = brands.find(b => b.name === formData.brand);
  const selectedModelData = selectedBrandData?.models.find(m => m.name === formData.model);

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/api/inquiries/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brand: formData.brand,
          model: formData.model,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
        }),
      });
      if (res.ok) {
        setStep(4);
      } else {
        console.error('Submission failed:', await res.json());
      }
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const goBack = () => {
    setSearchQuery(''); // Clear search when navigating back
    setStep(prev => Math.max(1, prev - 1));
  };

  return (
    <div  className="obsidian-vault">
      <div className="p-navbar-spacer" />

      <div className="neural-progress">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="node-wrapper">
            <div className={`node-dot ${step >= s ? 'active' : ''}`} />
            {s < 4 && <div className={`node-line ${step > s ? 'active' : ''}`} />}
          </div>
        ))}
      </div>

      <main className="p-stage">
        {loading && <div className="p-loading">LOADING DATA...</div>}
        <AnimatePresence mode="wait">
          {!loading && step === 1 && (
            <motion.div key="s1" className="p-layout" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h1 className="p-hero-title">SELECT <span className="silver">MANUFACTURER</span></h1>
              
              {/* --- NEW SEARCH INTERCEPT BAR --- */}
              <div id='offers' className="p-search-wrapper">
                
                <input 
                  type="text" 
                  className="p-search-input" 
                  placeholder="Search by brand name" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <motion.div layout className="p-grid-wall">
                <AnimatePresence>
                  {filteredBrands.map(brand => (
                    <motion.button 
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      key={brand.slug} 
                      className="p-vault-card brand-visual" 
                      onClick={() => { updateField('brand', brand.name); setStep(2); }}
                    >
                      <div className="p-card-logo-overlay">
                        {brand.logo && <img src={brand.logo} alt="" />}
                      </div>
                      <div className="p-card-content">
                        <span className="p-card-name">{brand.name}</span>
                      </div>
                    </motion.button>
                  ))}
                </AnimatePresence>
              </motion.div>

              {filteredBrands.length === 0 && (
                <div className="p-no-results">No Match Found..</div>
              )}
            </motion.div>
          )}
          {/* STEP 2: MODEL SELECTION */}
          {step === 2 && (
            <motion.div key="s2" className="p-layout" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <h1 className="p-hero-title">SPECIFY <span className="silver">MODEL</span></h1>
              <div className="p-list-stack">
                {selectedBrandData?.models.map(model => (
                  <button key={model.name} className="p-list-item" onClick={() => { updateField('model', model.name); setStep(3); }}>
                    <span className="p-model-name">{model.name}</span>
                    <span className="p-item-arrow">SELECT_UNIT →</span>
                  </button>
                ))}
              </div>
              <button className="p-btn-back" onClick={goBack}>← RETURN TO BRANDS</button>
            </motion.div>
          )}

          {/* STEP 3: SECURE DATA ENTRY */}
          {step === 3 && (
            <motion.div key="s3" className="p-layout" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
              <h1 className="p-hero-title">SECURE <span className="silver">INTEL</span></h1>
              <div className="p-form-premium">
                <div className="p-input-pair">
                  <div className="p-input-group">
                    <label>IDENTITY</label>
                    <input type="text" placeholder="Full Name" value={formData.name} onChange={e => updateField('name', e.target.value)} />
                  </div>
                  <div className="p-input-group">
                    <label>COMMUNICATION</label>
                    <input type="email" placeholder="Email Address" value={formData.email} onChange={e => updateField('email', e.target.value)} />
                  </div>
                </div>
                <div className="p-input-pair">
                  <div className="p-input-group">
                    <label>CONNECT</label>
                    <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={e => updateField('phone', e.target.value)} />
                  </div>
                  <div className="p-input-group">
                    <label>REGION</label>
                    <input type="text" placeholder="Current Location" value={formData.location} onChange={e => updateField('location', e.target.value)} />
                  </div>
                </div>
                <button className="p-btn-ignite" onClick={handleSubmit} disabled={submitting}>
                  {submitting ? 'TRANSMITTING...' : 'AUTHENTICATE & SEARCH'}
                </button>
              </div>
              <button className="p-btn-back" onClick={goBack}>← RETURN TO MODEL</button>
            </motion.div>
          )}

          {/* STEP 4: FINAL OFFERS */}
          {step === 4 && (
            <motion.div key="s4" className="p-layout" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="p-hero-title">ACTIVE <span className="silver">OFFERS</span></h1>
              <div className="p-result-grid">
                {selectedModelData && selectedModelData.offers.length > 0 ? (
                  selectedModelData.offers.map((offer, i) => (
                    <div key={i} className="p-offer-box">
                      <div className="p-offer-info">
                        <span className="p-offer-id">PRFA_UNIT_0{i+1}</span>
                        <p className="p-offer-txt">{offer}</p>
                      </div>
                      <a  href="https://wa.me/917306096088" 
              target="_blank" 
              rel="noreferrer" >
                      <button className="p-btn-ignite mini">CONNECT TEAM</button>
                      </a>
                    </div>
                  ))
                ) : (
                  <div className="p-empty-box">
                    <p>ARCHIVE EMPTY: NO ACTIVE OFFERS FOR {formData.model.toUpperCase()}</p>
                    <span>Request logged. We will notify you at {formData.email} once tuning data arrives.</span>
                  </div>
                )}
              </div>
              <button className="p-btn-back" onClick={() => setStep(1)}>← START NEW SEARCH</button>
            </motion.div>
          )}

          {/* ... Rest of steps (2, 3, 4) remain exactly as before ... */}
          
        </AnimatePresence>
      </main>
    </div>
  );
};

export default OffersPage;