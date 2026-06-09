import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Products from './components/Products';
const Projects = React.lazy(() => import('./components/Projects'));
import WhyChooseUs from './components/WhyChooseUs';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Partners from './components/Partners';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './ThemeContext';
import ThemeToggle from './components/ThemeToggle';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (message: string) => {
    setNotification(message);
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Section scroll handler
  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(sectionId);
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const sections = ['home', 'about', 'services', 'products', 'projects', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ThemeProvider>
      <Header onNavigate={handleNavigate} activeSection={activeSection} />
      <main>
        <Hero onNavigate={handleNavigate} />
        <About />
        <Services onNavigate={handleNavigate} />
        <Products />
        <React.Suspense fallback={
          <div className="section bg-surface" style={{ minHeight: '450px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
            <div style={{ textAlign: 'center' }}>
              <div className="spinner" style={{ border: '3px solid rgba(0, 107, 63, 0.1)', borderTop: '3px solid var(--accent)', borderRadius: '50%', width: '30px', height: '30px', margin: '0 auto 12px', animation: 'spin 1s linear infinite' }} />
              <span>Loading Featured Projects...</span>
            </div>
          </div>
        }>
          <Projects />
        </React.Suspense>
        <WhyChooseUs />
        <Process />
        <Testimonials />
        <Partners />
        <CTA onNavigate={handleNavigate} />
        <Contact onShowNotification={showNotification} />
      </main>
      <Footer onNavigate={handleNavigate} />
      <ThemeToggle />

      {/* Slide-in custom Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="toast-alert glass"
            style={{
              borderLeft: '4px solid var(--accent)',
              background: 'var(--bg-glass-hover)',
            }}
          >
            <ShieldCheck size={24} className="text-accent" style={{ color: 'var(--accent)' }} />
            <div style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: 500 }}>
              {notification}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default App;
