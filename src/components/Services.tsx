import React from 'react';
import { motion } from 'framer-motion';
import { Hammer, Building2, HardHat, Flame, ShieldAlert, ClipboardList, ArrowUpRight } from 'lucide-react';
import roofimg from "../assets/RoofingSheets.png";

interface ServicesProps {
  onNavigate: (sectionId: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onNavigate }) => {
  const servicesList = [
    {
      icon: <Hammer size={32} />,
      title: 'Roofing Supply & Fitting',
      desc: 'Quality Chromadek and corrugated roofing sheets, structural timber, trusses, accessories, installation and long-term maintenance.',
      backgroundimage: {roofimg}
    },
    {
      icon: <Building2 size={32} />,
      title: 'Steel Structures',
      desc: 'Precision design, fabrication, and professional onsite erection of industrial portals, trusses and structural framing.',
    },
    {
      icon: <HardHat size={32} />,
      title: 'Construction',
      desc: 'Full-scale industrial, commercial and residential construction services managed by experienced builders.',
    },
    {
      icon: <Flame size={32} />,
      title: 'Fabrication',
      desc: 'Custom industrial steel fabrication, heavy-duty welding, gates, tanks, guards and custom metalwork solutions.',
    },
    {
      icon: <ShieldAlert size={32} />,
      title: 'Steel Supply',
      desc: 'Sourcing and supply of reinforcing bars, structural beams, columns, angles, channels, tubes and accessories.',
    },
    {
      icon: <ClipboardList size={32} />,
      title: 'Project Management',
      desc: 'End-to-end planning, compliance checks, logistics, site supervision and milestone delivery for key projects.',
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="services" className="section bg-dark">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">What We Do</span>
          <h2 className="section-title">Our Specialized Services</h2>
          <p className="section-desc">
            ALFA Steel & Roofing Merchants delivers high-quality materials and professional workmanship for enterprise, commercial and residential construction.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="services-grid"
        >
          {servicesList.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="service-card glass glass-hover"
            >
              <div className="service-card-border" />
              <div className="service-icon-box">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('contact');
                }}
                className="service-link"
              >
                <span>Request Quote</span>
                <ArrowUpRight size={16} />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
export default Services;
