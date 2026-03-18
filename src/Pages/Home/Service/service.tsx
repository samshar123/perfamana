import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { servicesApi } from "../../../api/services";
import type { Service } from "../../../api/types";
import "./service.css";

const ServiceSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await servicesApi.getServices();
        setServices(data);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Scroll to top and navigate
  const handleNavigate = (path: string) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

 const x = useTransform(scrollYProgress, [0, 1], ["0%", "-90%"]);

  if (loading) {
    return (
      <div id="services" ref={containerRef} className="hz-container">
        <div className="hz-sticky">
          <div className="hz-scanlines"></div>
          <div style={{ padding: "50px", textAlign: "center", color: "#fff" }}>
            Loading services...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="services" ref={containerRef} className="hz-container">
      <div className="hz-sticky">
        {/* BACKGROUND SCAN LINES */}
        <div className="hz-scanlines"></div>

        <motion.div style={{ x }} className="hz-track">
          {services.map((service, i) => (
            <div key={service.id} className="hz-slide">
              <div className="hz-modern-card" onClick={() => handleNavigate(service.path)}>
                {/* 1. TOP UI BAR */}
                <div className="hz-card-ui-top">
                  <span className="hz-serial">REF {i + 1}</span>
                  <div className="hz-status-dot"></div>
                  <span className="hz-category">PERFORMANCE LAB</span>
                </div>

                {/* 2. IMAGE WITH FLOATING CORNERS */}
                <div className="hz-image-section">
                  <div className="hz-corner tl"></div>
                  <div className="hz-corner tr"></div>
                  <div className="hz-corner bl"></div>
                  <div className="hz-corner br"></div>
                  <img
                    src={service.thumbnail || undefined}
                    alt={service.title}
                  />
                  <div className="hz-img-overlay"></div>
                </div>

                {/* 3. BOLD CONTENT AREA */}
                <div className="hz-info-section">
                  <h2 className="hz-title">{service.title}</h2>
                  <p className="hz-description">{service.shortDesc}</p>

                  {/* GLOWING BUTTON */}
                  <div className="gear-btn-wrapper">
                    <button
                      className="gear-gate-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavigate(service.path);
                      }}
                    >
                      {/* NEW: CONTINUOUS BORDER TRACE */}
                      <svg className="btn-trace-svg">
                        <rect
                          className="trace-rect"
                          x="0"
                          y="0"
                          width="100%"
                          height="100%"
                        />
                      </svg>

                      {/* The H-Pattern Gate Background */}
                      <div className="gate-background">
                        <div className="gate-line vertical left"></div>
                        <div className="gate-line vertical right"></div>
                        <div className="gate-line horizontal"></div>
                      </div>

                      {/* The Shifter Knob */}
                      <div className="shifter-knob">
                        <div className="knob-core">
                          <span className="knob-icon">→</span>
                        </div>
                        <div className="knob-trail"></div>
                      </div>

                      {/* Labeling */}
                      <div className="gear-label">
                        <span className="label-main">ENGAGE SPEC</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* SHOWROOM PROMO SLIDE (INDUSTRIAL STYLE) */}
          <div className="hz-slide">
            <div className="hz-promo-card">
              <div className="promo-inner">
                <div className="promo-tag">EXCLUSIVE ACCESS</div>
                <h3>
                  VISIT OUR <br /> SHOWROOM
                </h3>
                <p>LIVE DIAGNOSTICS & 20% DISCOUNT ON ALL PREMIUM MODULES.</p>
                <button
                  className="promo-link"
                  onClick={() => handleNavigate("/showroom")}
                >
                  GET OFFER CODE
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServiceSection;
