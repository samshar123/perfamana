import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { whyusApi } from "../../../api";
import type { WhyUsFeature } from "../../../api";
import "./whyUs.css";

const WhyUs: React.FC = () => {
  const [features, setFeatures] = useState<WhyUsFeature[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Why Us featuress from API
  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const data = await whyusApi.getWhyUsFeatures();
        setFeatures(data);
      } catch (error) {
        console.error("Failed to fetch Why Us features:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatures();
  }, []);

  if (loading) {
    return (
      <section id="why-us" className="mono-root">
        <div className="mono-container">
          <div className="mono-loading">LOADING FEATURES...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="why-us" className="mono-root">
      <div className="mono-container">
        <header className="mono-header">
          <div className="mono-title-wrap">
            <span className="mono-kicker">WHY PERFAMANA</span>
            <h2 className="mono-main-title">WHAT MAKES US BETTER?</h2>
          </div>
        </header>

        <div className="mono-stack">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              className={`mono-row ${index % 2 !== 0 ? "rev" : ""}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, y: 0 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: false, margin: "-100px 0px -100px 0px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* CREATIVE IMAGE CONTAINER */}
              <div className="mono-visual-wrap">
                <div className="mono-img-mask">
                  <img src={feature.image || undefined} alt={feature.title} />
                </div>
                {/* DECORATIVE SHAPE BEHIND IMAGE */}
                <div className="mono-shape-deco"></div>
              </div>

              {/* BOLD TEXT CONTENT */}
              <div className="mono-content">
                <div className="mono-meta">
                  <span className="mono-num">{feature.id}</span>
                  <div className="mono-line"></div>
                </div>
                <h3 className="mono-step-title">{feature.title}</h3>
                <p className="mono-step-desc">{feature.description}</p>
                {/* <div className="mono-status-badge">PROTOCOL  ACTIVE</div> */}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
