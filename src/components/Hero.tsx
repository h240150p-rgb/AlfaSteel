import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import heroimg from "../assets/HeroImage.png";

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section id="home" className="hero-sec">
      <div
        className="hero-bg"
        style={{
          backgroundImage: `url(${heroimg})`,
        }}
      />
      <div className="hero-overlay" />
      
      <div className="hero-container">
        <div className="hero-content">
          <motion.div
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={{ duration: 0.8 }}
            className="hero-badge"
          >
            <span>Zimbabwe's Premier Industrial Partner</span>
          </motion.div>

          <motion.h1
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-title"
          >
            Stronger Steel.<br />
            <span>Stronger Futures.</span>
          </motion.h1>

          <motion.p
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-desc"
          >
            Your trusted partner for roofing, steel solutions, construction and fabrication across Zimbabwe.
          </motion.p>

          <motion.div
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hero-actions"
          >
            <button onClick={() => onNavigate('contact')} className="btn btn-accent">
              <span>Request a Quote</span>
              <ArrowRight size={18} />
            </button>
            <button onClick={() => onNavigate('services')} className="btn btn-outline">
              <span>Our Services</span>
            </button>
          </motion.div>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 4,
          cursor: 'pointer',
        }}
        onClick={() => onNavigate('about')}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          style={{ color: 'rgba(255, 255, 255, 0.6)' }}
        >
          <ChevronDown size={32} />
        </motion.div>
      </div>
    </section>
  );
};
export default Hero;
