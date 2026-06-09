import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CTAProps {
  onNavigate: (sectionId: string) => void;
}

export const CTA: React.FC<CTAProps> = ({ onNavigate }) => {
  return (
    <section className="section cta-sec">
      <div className="cta-bg-pattern" />
      <div className="container">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Build with Confidence?</h2>
          <p className="cta-desc">
            Contact ALFA Steel & Roofing Merchants today for premium steel supply, high-quality Chromadek roofing, and professional construction solutions.
          </p>
          <div className="cta-buttons">
            <button onClick={() => onNavigate('contact')} className="btn btn-accent">
              <span>Get a Quote</span>
              <ArrowRight size={18} />
            </button>
            <button onClick={() => onNavigate('contact')} className="btn btn-outline">
              <span>Contact Us</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CTA;
