import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import warehouseImage from '../assets/WareHouse.png';


interface Project {
  category: string;
  title: string;
  desc: string;
  img: string;
  stats: Record<string, string>;
}

export const Projects: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const projectsData: Project[] = [
    {
      category: 'Warehouse',
      title: 'Planet Farm Warehouse',
      desc: 'A modern agricultural facility for Planet Farm, featuring a custom clear-span steel structure designed to maximize storage, streamline farm operations and support efficient agricultural logistics.',
      img: warehouseImage,
      stats: { Location: 'Marondera', Size: '2000sqm' },
    },
    {
      category: 'Shopping Complex',
      title: 'Bulawayo Plaza Extension',
      desc: 'Design and installation of custom-engineered structural trusses and premium Chromadek roofing sheets for a major retail extension under tight urban construction limits and strict city guidelines.',
      img: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80',
      stats: { Location: 'Bulawayo', Size: '8,500 sqm' },
    },
    {
      category: 'Industrial Building',
      title: 'Kwekwe Smelter Facility',
      desc: 'Heavy industrial steel framing and specialized heat-resistant roofing installation, built to withstand extreme smelting temperatures and chemical environments in Kwekwe.',
      img: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
      stats: { Location: 'Kwek we', Size: '12,000 sqm' },
    },
    {
      category: 'Factory',
      title: 'Ruwa Beverage Plant',
      desc: 'Precision structural fabrication and cladding for a high-output production plant, incorporating heavy mechanical ventilation monitors and insulated roof sheeting systems.',
      img: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=800&q=80',
      stats: { Location: 'Ruwa', Size: '20,000 sqm' },
    },
    {
      category: 'Residential Roofing',
      title: 'Borrowdale Estate Roofing',
      desc: 'High-end residential roof installation utilizing premium charcoal Chromadek sheets with bespoke flashing profiles to achieve a modern architectural look for a luxury villa.',
      img: 'https://images.unsplash.com/photo-1628744448840-55bdb1e9e24e?auto=format&fit=crop&w=800&q=80',
      stats: { Location: 'Borrowdale', Size: '1200 sqm' },
    },
    {
      category: 'Steel Structure',
      title: 'Mutare Mine Framework',
      desc: 'Structural steel framework for a primary ore crushing plant. Certified heavy fabrication and assembly under strict ISO quality safety standards for mining operations.',
      img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
      stats: { Location: 'Mutare', Size: '4000 sqm' },
    },
  ];

  const projects = projectsData;

  useEffect(() => {
    if (isHovered || projects.length <= 1) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isHovered, projects.length]);

  const handleNext = () => {
    if (projects.length <= 1) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    if (projects.length <= 1) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const currentProject = projects[currentIndex];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <section id="projects" className="section bg-surface">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Our Work</span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-desc">
            Explore our portfolio of successfully completed structural steel designs, industrial installations, and premium roofing projects across Zimbabwe.
          </p>
        </div>

        <div
          className="projects-slider-wrapper"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="projects-slider-container">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentProject.title}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_e, info) => {
                  const threshold = 50;
                  if (info.offset.x < -threshold) {
                    handleNext();
                  } else if (info.offset.x > threshold) {
                    handlePrev();
                  }
                }}
                className="project-slide"
              >
                <div className="project-slide-content">
                  <span className="project-category-badge">
                    {currentProject.category}
                  </span>

                  <h3 className="project-slide-title">
                    {currentProject.title}
                  </h3>

                  <p className="project-slide-desc">
                    {currentProject.desc}
                  </p>

                  <div className="project-stats-grid">
                    {Object.entries(currentProject.stats).map(([key, val]) => (
                      <div key={key} className="project-stat-box">
                        <span className="project-stat-label">{key}</span>
                        <span className="project-stat-val">{val}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    className="btn btn-accent project-slide-btn"
                  >
                    <span>Request Project Details</span>
                    <ArrowRight size={18} />
                  </a>
                </div>

                <div className="project-slide-image-container">
                  <img
                    src={currentProject.img}
                    alt={currentProject.title}
                    className="project-slide-img"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {projects.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="slider-nav-btn slider-prev projects-arrow-btn"
                aria-label="Previous project"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={handleNext}
                className="slider-nav-btn slider-next projects-arrow-btn"
                aria-label="Next project"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {projects.length > 1 && (
            <div className="slider-dots projects-slider-dots">
              {projects.map((_, idx) => (
                <button
                  key={idx}
                  className={`slider-dot ${
                    currentIndex === idx ? 'active' : ''
                  }`}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  aria-label={`Go to project slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <div style={{ marginTop: '80px' }}>
          <div className="section-header" style={{ marginBottom: '40px' }}>
            <span className="section-subtitle">Visual Transformations</span>
            <h2
              className="section-title"
              style={{ fontSize: '32px' }}
            >
              Before & After Galleries
            </h2>
            <p className="section-desc">
              Witness the power of premium workmanship in our renovation and retrofitting projects.
            </p>
          </div>

          <div className="project-ba-grid">
            <div className="ba-card">
              <span className="ba-badge before">Before Renovation</span>
              <img
                src="https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=800&q=80"
                alt="Dilapidated site before roof install"
              />
            </div>

            <div className="ba-card">
              <span className="ba-badge after">
                After ALFA Steel Installation
              </span>
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                alt="Finished premium roof site"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;