import React from 'react';

export const Partners: React.FC = () => {
  const partners = [
    'ZIMBABWE MINING',
    'HARARE BUILDERS',
    'SOUTHERN LOGISTICS',
    'NATIONAL STEEL',
    'APEX PROPERTY',
    'METALLON GOLD',
  ];

  return (
    <section className="section bg-surface">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Trusted Partners</span>
          <h2 className="section-title" style={{ fontSize: '28px', marginBottom: '10px' }}>Collaborating with Leading Industries</h2>
          <p className="section-desc">
            We partner with major enterprise builders, contractors, and developers across the region.
          </p>
        </div>

        <div className="partners-grid">
          {partners.map((partner, index) => (
            <div key={index} className="partner-card">
              <span>{partner}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Partners;
