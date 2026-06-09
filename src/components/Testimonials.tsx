import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const reviews = [
    {
      stars: 5,
      text: "ALFA Steel & Roofing delivered the structural steel frame for our new warehousing complex in Harare. Their execution was flawless, completing the design and installation three weeks ahead of schedule.",
      name: "Tinashe Moyo",
      company: "Logistics Director, Borderway Cargo",
    },
    {
      stars: 5,
      text: "We contracted ALFA for the re-roofing of our commercial shopping complex in Bulawayo. The Chromadek sheets look premium, and their team handled the entire installation with zero disruption to our retail tenants.",
      name: "Sarah Gumbo",
      company: "Operations Lead, Apex Property Group",
    },
    {
      stars: 5,
      text: "Outstanding fabrication quality on our mining portal frame. Their certified welders met strict international standards, and their documentation was completely transparent.",
      name: "Farai Mutasa",
      company: "Project Lead, Zimplats Refineries",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  return (
    <section className="section bg-dark">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Client Stories</span>
          <h2 className="section-title">What Our Partners Say</h2>
          <p className="section-desc">
            We build long-term relationships with leaders in mining, retail, logistics, and housing across Zimbabwe.
          </p>
        </div>

        <div className="testimonials-slider">
          <div className="testimonial-card glass">
            <div className="testimonial-stars">
              {[...Array(reviews[activeIndex].stars)].map((_, i) => (
                <Star key={i} size={18} fill="#E5B325" stroke="#E5B325" />
              ))}
            </div>
            <blockquote className="testimonial-text">
              "{reviews[activeIndex].text}"
            </blockquote>
            <div className="testimonial-client">
              <div className="client-name">{reviews[activeIndex].name}</div>
              <div className="client-company">{reviews[activeIndex].company}</div>
            </div>
          </div>

          <button
            onClick={handlePrev}
            className="slider-nav-btn slider-prev"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="slider-nav-btn slider-next"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>

          <div className="slider-dots">
            {reviews.map((_, index) => (
              <button
                key={index}
                className={`slider-dot ${activeIndex === index ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Testimonials;
