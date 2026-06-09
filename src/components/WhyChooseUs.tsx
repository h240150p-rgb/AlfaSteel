import React from 'react';
import { Award, Hammer, UserCheck, DollarSign, Globe, ShieldAlert, Users, Zap } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    { icon: <Award size={24} />, title: 'High Quality Materials', desc: 'We only source certified, structural-grade steel and premium Chromadek products.' },
    { icon: <Hammer size={24} />, title: 'Professional Installation', desc: 'Our onsite teams are heavily trained, highly skilled, and fully insured.' },
    { icon: <UserCheck size={24} />, title: 'Certified Fabricators', desc: 'Equipped with class-leading qualifications for precision welding and structural assemblies.' },
    { icon: <DollarSign size={24} />, title: 'Competitive Pricing', desc: 'Get international quality standards at fair local market rates.' },
    { icon: <Globe size={24} />, title: 'Nationwide Delivery', desc: 'Full logistical network to deliver roofing and steel components anywhere in Zimbabwe.' },
    { icon: <ShieldAlert size={24} />, title: 'Safety Compliance', desc: 'Strict adherence to ISO and local construction safety protocols on every site.' },
    { icon: <Users size={24} />, title: 'Experienced Team', desc: 'Backed by engineers and project leads with decades of combined structural experience.' },
    { icon: <Zap size={24} />, title: 'Fast Project Completion', desc: 'Optimized fabrication procedures ensure swift project turnarounds.' },
  ];

  return (
    <section className="section bg-dark">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Our Edge</span>
          <h2 className="section-title">Why Choose ALFA Steel</h2>
          <p className="section-desc">
            We hold ourselves to the highest standards of structural integrity, engineering safety, and client satisfaction.
          </p>
        </div>

        <div className="why-grid">
          {features.map((feat, index) => (
            <div key={index} className="why-card glass glass-hover">
              <div className="why-icon-box">{feat.icon}</div>
              <h3 className="why-title">{feat.title}</h3>
              <p className="why-desc">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default WhyChooseUs;
