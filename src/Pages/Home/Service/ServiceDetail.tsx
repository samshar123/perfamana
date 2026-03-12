import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { servicesApi } from "../../../api/services";
import type { Service } from "../../../api/types";
import "./ServiceDetail.css";

const ServiceDetail: React.FC = () => {
  const { id } = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch service details from API
  useEffect(() => {
    const fetchService = async () => {
      if (!id) return;

      try {
        const data = await servicesApi.getServiceBySlug(id);
        setService(data);
      } catch (error) {
        console.error("Failed to fetch service details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return <div className="loading">Loading service details...</div>;
  }

  if (!service) return <div className="not-found">MODULE NOT FOUND</div>;

  return (
    <div className="sd-viewport">
      <nav className="sd-nav">
        <Link to="/" className="sd-back">
          ← BACK TO LAB
        </Link>
      </nav>

      <div className="sd-hero">
        <div className="sd-hero-content">
          <h1 className="sd-title">{service.title}</h1>
          <div className="sd-line"></div>
          <p className="sd-lead">{service.shortDesc}</p>
        </div>
        <img
          src={service.thumbnail || undefined}
          alt="Hero"
          className="sd-hero-img"
        />
      </div>

      <section className="sd-specs">
        <div className="spec-card">
          <h5>PROCESS ENGINEERING</h5>
          <p>
            Every phase is measured against factory tolerances and performance
            benchmarks. Our {service.title} module ensures zero-compromise
            results.
          </p>
        </div>
        <div className="spec-visual">
          <div className="grid-overlay"></div>
          {service.detailedImages && service.detailedImages.length > 0 ? (
            <div className="image-gallery">
              {service.detailedImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Detail ${index + 1}`}
                  className="detail-image"
                />
              ))}
            </div>
          ) : (
            <div className="no-images">
              <p>No detailed images available</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
