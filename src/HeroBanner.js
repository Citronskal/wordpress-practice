import React from 'react';

const HeroBanner = ({ image, backgroundImage, backgroundVideo }) => {
  return (
    <div
      className="hero-banner"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="hero-content" style={{backgroundVideo:`url(${backgroundVideo})`}}>
        <h1>{image}</h1>
      </div>
    </div>
  );
};

export default HeroBanner;