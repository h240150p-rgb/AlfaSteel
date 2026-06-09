import React from 'react';
import { motion } from 'framer-motion';
import teamimg from "../assets/Teamimage1.png";

export const About: React.FC = () => {
  const stats = [
    { value: '10+', label: 'Years Experience' },
    { value: '500+', label: 'Projects Completed' },
    { value: '1000+', label: 'Satisfied Clients' },
    { value: '100%', label: 'Nationwide Coverage' },
  ];

  return (
    <section id="about" className="section bg-surface">
      <div className="container">
        <div className="about-grid">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="about-img-box"
          >
            <div className="about-img-container">
              <img
                src={teamimg}
                alt="ALFA Steel Quality Control & Engineering Team"
                style={{ width: '100%', borderRadius: '8px' }}
              />
            </div>
            <div className="about-badge-absolute glass">
              <div className="badge-num">100%</div>
              <div className="badge-lbl">Zimbabwean Owned</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <span className="about-subtitle">Who We Are</span>
            <h2 className="about-title">About ALFA Steel & Roofing</h2>
            <p className="about-text">
              ALFA Steel & Roofing Merchants is a leading provider of steel, roofing, fabrication and construction solutions in Zimbabwe. We deliver high-quality materials and professional workmanship to residential, commercial and industrial clients nationwide.
            </p>
            <p className="about-text">
              Our mission is to power progress through innovative steel and roofing solutions while maintaining the highest standards of quality, safety and customer satisfaction. We combine state-of-the-art engineering with locally tailored services to deliver unmatched durability.
            </p>

            <div className="about-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-number">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default About;
