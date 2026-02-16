import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API_BASE from '../../../config/api';
import './ServiceDetail.css';

interface ServiceDetailData {
  id: string;
  title: string;
  shortDesc: string;
  thumbnail: string | null;
  fullSpecs: string;
  detailedImages: string[];
  path: string;
}

const ServiceDetail: React.FC = () => {
  const { id } = useParams();
  const [data, setData] = useState<ServiceDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${API_BASE}/api/services/${id}/`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="not-found">LOADING_MODULE_DATA...</div>;
  if (notFound || !data) return <div className="not-found">MODULE_NOT_FOUND</div>;

  return (
    <div className="sd-viewport">
      <nav className="sd-nav">
        <Link to="/" className="sd-back">← BACK_TO_LAB</Link>
        <div className="sd-id">ID: {data.id.toUpperCase()}</div>
      </nav>

      <div className="sd-hero">
        <div className="sd-hero-content">
          <h1 className="sd-title">{data.title}</h1>
          <div className="sd-line"></div>
          <p className="sd-lead">{data.shortDesc}</p>
        </div>
        {data.thumbnail && <img src={data.thumbnail} alt="Hero" className="sd-hero-img" />}
      </div>

      <section className="sd-specs">
        <div className="spec-card">
          <h5>PROCESS_ENGINEERING</h5>
          <p>{data.fullSpecs || `Every phase is measured against factory tolerances and performance benchmarks. Our ${data.title} module ensures zero-compromise results.`}</p>
        </div>
        <div className="spec-visual">
            <div className="grid-overlay"></div>
            {data.detailedImages.map((img, i) => (
              <img key={i} src={img} alt={`Detail ${i}`} className="spec-img" />
            ))}
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;