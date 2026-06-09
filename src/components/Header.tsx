import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Menu, X } from 'lucide-react';
import logoBlack from "../assets/logoBlack.png";
import logoWhite from "../assets/logoWhite.png";
import { useTheme } from '../ThemeContext';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, activeSection }) => {
  const { theme } = useTheme();
  const logo = theme === 'dark' ? logoBlack : logoWhite;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'products', label: 'Products' },
    { id: 'projects', label: 'Projects' },
    { id: 'careers', label: 'Careers' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <a href="#home" className="logo-link" onClick={(e) => { e.preventDefault(); handleLinkClick('home'); }}>
            <img width={80} height={30} src={logo} alt="ALFA Steel & Roofing Logo" className="logo-image" />
             <div>
              <span className="logo-text-sub">STEEL & ROOFING</span>
            </div>
          </a>

          <nav>
            <ul className="nav-menu">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                    onClick={(e) => { e.preventDefault(); handleLinkClick(item.id); }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav-right">
            <a href="tel:+263778646199" className="nav-phone">
              <Phone size={16} className="text-accent" />
              <span>+263 77 864 6199</span>
            </a>
            <a
              href="https://wa.me/263778646199?text=Hi%20ALFA%20Steel,%20I%20would%20like%20to%20request%20a%20quote."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-sm"
              style={{ padding: '8px 16px', fontSize: '13px' }}
            >
              <MessageSquare size={16} />
              <span>WhatsApp</span>
            </a>
            <button
              onClick={() => handleLinkClick('contact')}
              className="btn btn-accent btn-sm"
              style={{ padding: '8px 16px', fontSize: '13px' }}
            >
              Get a Quote
            </button>
            <button
              className="mobile-nav-toggle"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`drawer-overlay ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(false)} />
      <div className={`mobile-drawer ${mobileOpen ? 'open' : ''}`}>
        <button
          className="mobile-drawer-close"
          onClick={() => setMobileOpen(false)}
          aria-label="Close navigation menu"
        >
          <X size={28} />
        </button>
        <ul className="mobile-drawer-menu">
          {menuItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="mobile-drawer-link"
                onClick={(e) => { e.preventDefault(); handleLinkClick(item.id); }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mobile-drawer-footer">
          <a href="tel:+263778646199" className="btn btn-outline" style={{ width: '100%' }}>
            <Phone size={16} />
            <span>+263 77 864 6199</span>
          </a>
          <a
            href="https://wa.me/263778646199?text=Hi%20ALFA%20Steel,%20I%20would%20like%20to%20request%20a%20quote."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
            style={{ width: '100%' }}
          >
            <MessageSquare size={16} />
            <span>WhatsApp</span>
          </a>
          <button
            onClick={() => handleLinkClick('contact')}
            className="btn btn-accent"
            style={{ width: '100%' }}
          >
            Get a Quote
          </button>
        </div>
      </div>
    </>
  );
};
export default Header;
