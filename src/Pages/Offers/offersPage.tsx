import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { offersApi } from "../../api";
import type { Brand } from "../../api";
import "./offersPage.css";

const OffersPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    name: "",
    phone: "",
    email: "",
    location: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Load brands data from API
  useEffect(() => {
    const loadBrands = async () => {
      try {
        setLoading(true);
        const data = await offersApi.getOffersData();
        setBrands(data.brands);
        setError(null);
      } catch (err) {
        setError("Failed to load brands data");
        console.error("Error loading brands:", err);
      } finally {
        setLoading(false);
      }
    };

    loadBrands();
  }, []);

  // Filter Logic
  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const selectedBrandData = brands.find((b) => b.name === formData.brand);
  const selectedModelData = selectedBrandData?.models.find(
    (m) => m.name === formData.model,
  );

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const submitInquiry = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.location
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setIsSubmitting(true);
      await offersApi.submitInquiry({
        brand: formData.brand,
        model: formData.model,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
      });
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setStep(1);
        setFormData({
          brand: "",
          model: "",
          name: "",
          phone: "",
          email: "",
          location: "",
        });
      }, 3000);
    } catch (err) {
      console.error("Error submitting inquiry:", err);
      alert("Failed to submit inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBack = () => {
    setSearchQuery(""); // Clear search when navigating back
    setStep((prev) => Math.max(1, prev - 1));
  };

  return (
    <div className="obsidian-vault">
      <div className="p-navbar-spacer" />

      <div className="neural-progress">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="node-wrapper">
            <div className={`node-dot ${step >= s ? "active" : ""}`} />
            {s < 4 && (
              <div className={`node-line ${step > s ? "active" : ""}`} />
            )}
          </div>
        ))}
      </div>

      <main className="p-stage">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="s1"
              className="p-layout"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h1 className="p-hero-title">
                SELECT <span className="silver">MANUFACTURER</span>
              </h1>

              {/* --- NEW SEARCH INTERCEPT BAR --- */}
              <div id="offers" className="p-search-wrapper">
                <input
                  type="text"
                  className="p-search-input"
                  placeholder="Search by brand name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {loading ? (
                <div className="p-loading">LOADING BRAND DATA...</div>
              ) : error ? (
                <div className="p-error">{error}</div>
              ) : (
                <>
                  <motion.div layout className="p-grid-wall">
                    <AnimatePresence>
                      {filteredBrands.map((brand) => (
                        <motion.button
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          key={brand.id}
                          className="p-vault-card brand-visual"
                          onClick={() => {
                            updateField("brand", brand.name);
                            setStep(2);
                          }}
                        >
                          <div className="p-card-logo-overlay">
                            {brand.logo && (
                              <img src={brand.logo} alt={brand.name} />
                            )}
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
                </>
              )}
            </motion.div>
          )}
          {/* STEP 2: MODEL SELECTION */}
          {step === 2 && (
            <motion.div
              key="s2"
              className="p-layout"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
            >
              <h1 className="p-hero-title">
                SPECIFY <span className="silver">MODEL</span>
              </h1>
              <div className="p-list-stack">
                {selectedBrandData?.models.map((model) => (
                  <button
                    key={model.name}
                    className="p-list-item"
                    onClick={() => {
                      updateField("model", model.name);
                      setStep(3);
                    }}
                  >
                    <span className="p-model-name">{model.name}</span>
                    <span className="p-item-arrow">SELECT_UNIT →</span>
                  </button>
                ))}
              </div>
              <button className="p-btn-back" onClick={goBack}>
                ← RETURN TO BRANDS
              </button>
            </motion.div>
          )}

          {/* STEP 3: SECURE DATA ENTRY */}
          {step === 3 && (
            <motion.div
              key="s3"
              className="p-layout"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <h1 className="p-hero-title">
                SECURE <span className="silver">INTEL</span>
              </h1>
              <div className="p-form-premium">
                <div className="p-input-pair">
                  <div className="p-input-group">
                    <label>IDENTITY</label>
                    <input
                      type="text"
                      placeholder="Full Name"
                      onChange={(e) => updateField("name", e.target.value)}
                    />
                  </div>
                  <div className="p-input-group">
                    <label>COMMUNICATION</label>
                    <input
                      type="email"
                      placeholder="Email Address"
                      onChange={(e) => updateField("email", e.target.value)}
                    />
                  </div>
                </div>
                <div className="p-input-pair">
                  <div className="p-input-group">
                    <label>CONNECT</label>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      onChange={(e) => updateField("phone", e.target.value)}
                    />
                  </div>
                  <div className="p-input-group">
                    <label>REGION</label>
                    <input
                      type="text"
                      placeholder="Current Location"
                      onChange={(e) => updateField("location", e.target.value)}
                    />
                  </div>
                </div>
                <button className="p-btn-ignite" onClick={() => setStep(4)}>
                  AUTHENTICATE & SEARCH
                </button>
              </div>
              <button className="p-btn-back" onClick={goBack}>
                ← RETURN TO MODEL
              </button>
            </motion.div>
          )}

          {/* STEP 4: FINAL OFFERS */}
          {step === 4 && (
            <motion.div
              key="s4"
              className="p-layout"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h1 className="p-hero-title">
                ACTIVE <span className="silver">OFFERS</span>
              </h1>

              {submitSuccess ? (
                <div className="p-success-message">
                  <p>INQUIRY SUBMITTED SUCCESSFULLY</p>
                  <span>
                    Our team will contact you soon with available offers.
                  </span>
                </div>
              ) : (
                <>
                  <div className="p-result-grid">
                    {selectedModelData &&
                    selectedModelData.offers.length > 0 ? (
                      selectedModelData.offers.map((offer, i) => (
                        <div key={i} className="p-offer-box">
                          <div className="p-offer-info">
                            <span className="p-offer-id">
                              PRFA UNIT {i + 1}
                            </span>
                            <p className="p-offer-txt">{offer}</p>
                          </div>
                          <a
                            href="https://wa.me/917306096088"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <button className="p-btn-ignite mini">
                              CONNECT TEAM
                            </button>
                          </a>
                        </div>
                      ))
                    ) : (
                      <div className="p-empty-box">
                        <p>
                          ARCHIVE EMPTY: NO ACTIVE OFFERS FOR{" "}
                          {formData.model.toUpperCase()}
                        </p>
                        <span>
                          Submit your inquiry below to be notified when offers
                          become available.
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-inquiry-section">
                    <h3>
                      SUBMIT INQUIRY FOR {formData.brand.toUpperCase()}{" "}
                      {formData.model.toUpperCase()}
                    </h3>
                    <button
                      className="p-btn-ignite"
                      onClick={submitInquiry}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "SUBMITTING..." : "SUBMIT INQUIRY"}
                    </button>
                  </div>
                </>
              )}

              <button className="p-btn-back" onClick={() => setStep(1)}>
                ← START NEW SEARCH
              </button>
            </motion.div>
          )}

          {/* ... Rest of steps (2, 3, 4) remain exactly as before ... */}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default OffersPage;
