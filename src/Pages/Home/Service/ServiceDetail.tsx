import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import serviceData from '../../../../src/data/services.json'
import './ServiceDetail.css';

const ServiceDetail: React.FC = () => {
  const { id } = useParams();
  const data = serviceData.services.find(s => s.id === id);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!data) return <div className="not-found">MODULE  NOT  FOUND</div>;

  return (
    <div className="sd-viewport">
      <nav className="sd-nav">
        <Link to="/" className="sd-back">← BACK  TO  LAB</Link>
    
      </nav>

      <div className="sd-hero">
        <div className="sd-hero-content">
          <h1 className="sd-title">{data.title}</h1>
          <div className="sd-line"></div>
          <p className="sd-lead">{data.shortDesc}</p>
        </div>
        <img src={data.thumbnail} alt="Hero" className="sd-hero-img" />
      </div>

      <section className="sd-specs">
        <div className="spec-card">
          <h5>PROCESS  ENGINEERING</h5>
          <p>Every phase is measured against factory tolerances and performance benchmarks. Our {data.title} module ensures zero-compromise results.</p>
        </div>
        <div className="spec-visual">
            <div className="grid-overlay"></div>
            {/* Map more images here from your JSON */}
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;