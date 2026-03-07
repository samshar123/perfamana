import React, { useState, useEffect } from 'react';
import './brands.css';
import { homepageApi } from '../../../api';
import type { PartnerBrand } from '../../../api';

const Brands: React.FC = () => {
  const [partnerBrands, setPartnerBrands] = useState<PartnerBrand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fallback brands for display if API fails
  const fallbackBrands = [
    { name: 'Brembo', img: '/Images/Brands/BMW.svg' },
    { name: 'Akrapovic', img: '/Images/Brands/Ferrari-Logo.png'},
    { name: 'Ohlins', img: '/Images/Brands/Mercedes.png'},
    { name: 'Michelin', img: '/Images/Brands/lamborghini.svg' },
    { name: 'Motul', img: '/Images/Brands/mistibushi.png' },
    { name: 'HKS', img: '/Images/Brands/volvo.svg' },
    { name: 'Porsche', img: '/Images/Brands/porche.svg' },
  ];

  useEffect(() => {
    const loadPartnerBrands = async () => {
      try {
        const data = await homepageApi.getPartnerBrands();
        // Backend already filters for active brands, so no need to filter here
        setPartnerBrands(data);
        setError(null);
      } catch (err) {
        setError('Failed to load partner brands');
        console.error('Error loading partner brands:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPartnerBrands();
  }, []);

  // Use API data if available, otherwise fallback
  const displayBrands = partnerBrands.length > 0 
    ? partnerBrands.map(brand => ({ name: brand.name, img: brand.logo }))
    : fallbackBrands;

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
            {[...displayBrands, ...displayBrands].map((brand, i) => (
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