import React from 'react';
import './brands.css';
import logo1 from '../../../../public/Images/Brands/BMW.svg';
import logo2 from '../../../../public/Images/Brands/Ferrari-Logo.png';
import logo3 from '../../../../public/Images/Brands/Mercedes.png';
import logo4 from '../../../../public/Images/Brands/lamborghini.svg';
import logo5 from '../../../../public/Images/Brands/mistibushi.png';
import logo6 from '../../../../public/Images/Brands/volvo.svg';
import logo7 from '../../../../public/Images/Brands/porche.svg'; 

const Brands: React.FC = () => {
  const brands = [
    { name: 'Brembo', img: logo1 },
    { name: 'Akrapovic', img: logo2},
    { name: 'Ohlins', img: logo3},
    { name: 'Michelin', img: logo4 },
    { name: 'Motul', img: logo5 },
    { name: 'HKS', img: logo6 },
    { name: 'Porsche', img: logo7 },
  ];

  return (
    <section className="fs-section">
      <div className="fs-container">
        
        <div className="fs-info-panel">
          <div className="fs-glitch-text">AUTHENTIC_PARTS</div>
          <h2 className="fs-main-heading">TRUSTED_BY_<br/>ENGINEERS</h2>
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
                <span className="fs-serial">PVL_{i.toString().padStart(3, '0')}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Brands;