import React, { useState, useEffect, useRef } from 'react';
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

// Move projectsData outside of the component to load once and keep in memory
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

// Before & After images to cache as well
const beforeAfterImages = [
  'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
];

// Memoized slide content component to eliminate unnecessary re-renders
const ProjectSlideContent = React.memo(({ project }: { project: Project }) => {
  return (
    <>
      <div className="project-slide-content">
        <span className="project-category-badge">
          {project.category}
        </span>
        <h3 className="project-slide-title">
          {project.title}
        </h3>
        <p className="project-slide-desc">
          {project.desc}
        </p>
        <div className="project-stats-grid">
          {Object.entries(project.stats).map(([key, val]) => (
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
          src={project.img}
          alt={project.title}
          className="project-slide-img"
          loading="eager" // Preloaded, so render immediately
          style={{ willChange: 'transform, opacity' }} // GPU Composite hint
        />
      </div>
    </>
  );
});

ProjectSlideContent.displayName = 'ProjectSlideContent';

export const Projects: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isActivated, setIsActivated] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const projects = projectsData;

  // 1. Preload all assets immediately after initial page load completes
  useEffect(() => {
    const preloadAllImages = () => {
      const allUrls = [
        ...projects.map(p => p.img),
        ...beforeAfterImages
      ];

      allUrls.forEach((url) => {
        // Create an Image instance to load in memory
        const img = new Image();
        img.src = url;

        // Force browser HTTP cache retrieval if supported
        if ('fetch' in window) {
          fetch(url, { cache: 'force-cache' }).catch(() => {});
        }
      });
    };

    if (document.readyState === 'complete') {
      preloadAllImages();
    } else {
      window.addEventListener('load', preloadAllImages);
      return () => window.removeEventListener('load', preloadAllImages);
    }
  }, [projects]);

  // 2. Intersection Observer for activation (near view) and visibility (in view)
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    // Activates and sets up states when user gets near (within 350px)
    const activationObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsActivated(true);
          activationObserver.disconnect(); // Only activate once
        }
      },
      { rootMargin: '350px' }
    );

    // Activates autoplay/animations when actually in viewport
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        setIsVisible(entries[0].isIntersecting);
      },
      { threshold: 0.1 }
    );

    activationObserver.observe(sectionEl);
    visibilityObserver.observe(sectionEl);

    return () => {
      activationObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, []);

  // 3. Autoplay timer control - dormant until activated & visible
  useEffect(() => {
    if (!isActivated || !isVisible || isHovered || projects.length <= 1) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isActivated, isVisible, isHovered, projects.length]);

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
      willChange: 'transform, opacity'
    }),
    center: {
      x: 0,
      opacity: 1,
      willChange: 'transform, opacity'
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      willChange: 'transform, opacity'
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const }
    }
  };

  return (
    <section id="projects" ref={sectionRef} className="section bg-surface">
      <div className="container">
        {/* Entrance Animations for the Section Header */}
        <motion.div
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="section-header"
        >
          <span className="section-subtitle">Our Work</span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-desc">
            Explore our portfolio of successfully completed structural steel designs, industrial installations, and premium roofing projects across Zimbabwe.
          </p>
        </motion.div>

        <div
          className="projects-slider-wrapper"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="projects-slider-container">
            {/* If dormant (not activated yet), render first slide statically for instant paint */}
            {!isActivated ? (
              <div className="project-slide">
                <ProjectSlideContent project={projects[0]} />
              </div>
            ) : (
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
                  style={{ willChange: 'transform, opacity' }}
                >
                  <ProjectSlideContent project={currentProject} />
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* Render controls only if activated and we have multiple projects */}
          {isActivated && projects.length > 1 && (
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

          {isActivated && projects.length > 1 && (
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

        {/* Before & After Galleries */}
        <div style={{ marginTop: '80px' }}>
          <motion.div
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            variants={containerVariants}
            className="section-header"
            style={{ marginBottom: '40px' }}
          >
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
          </motion.div>

          <div className="project-ba-grid">
            <div className="ba-card">
              <span className="ba-badge before">Before Renovation</span>
              <img
                src={beforeAfterImages[0]}
                alt="Dilapidated site before roof install"
                loading="lazy"
              />
            </div>

            <div className="ba-card">
              <span className="ba-badge after">
                After ALFA Steel Installation
              </span>
              <img
                src={beforeAfterImages[1]}
                alt="Finished premium roof site"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;