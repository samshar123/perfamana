import React, { useState, useEffect } from 'react';
import './brands.css';
import API_BASE from '../../../config/api';

interface PartnerBrand {
  id: number;
  name: string;
  logo: string | null;
  order: number;
}

const Brands: React.FC = () => {
  const [brands, setBrands] = useState<PartnerBrand[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/homepage/partner-brands/`)
      .then(res => res.json())
      .then(data => setBrands(data))
      .catch(err => console.error('Failed to fetch partner brands:', err));
  }, []);

  return (
    <section className="fs-section">
      <div className="fs-container">
        
        <div className="fs-info-panel">
          <div className="fs-glitch-text">AUTHENTIC  PARTS</div>
          <h2 className="fs-main-heading">TRUSTED BY <br/>ENGINEERS</h2>
          <div className="fs-meter">
            <div className="fs-meter-fill"></div>
          </div>
        </div>

        <div className="fs-filmstrip-wrap">
          <div className="fs-filmstrip-track">
            {/* Map twice for infinite loop effect */}
            {[...brands, ...brands].map((brand, i) => (
              <div key={i} className="fs-item">
                <div className="fs-hex-bracket"></div>
                <img src={brand.img} alt={brand.name} className="fs-logo" />
                <span className="fs-serial">PVL  {i.toString().padStart(3, '0')}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Brands;