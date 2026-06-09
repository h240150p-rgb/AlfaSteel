import React from 'react';
import { MessageSquare, Phone, Mail, MapPin } from 'lucide-react';
import logoBlack from "../assets/logoBlack.png";
import logoWhite from "../assets/logoWhite.png";
import { useTheme } from '../ThemeContext';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { theme } = useTheme();
  const logo = theme === 'dark' ? logoBlack : logoWhite;
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    onNavigate(id);
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Branding & Description */}
          <div>
            <a href="#home" className="logo-link" style={{ marginBottom: '20px' }} onClick={(e) => handleLinkClick(e, 'home')}>
               <img width={80} height={30} src={logo} alt="ALFA Steel & Roofing Logo" className="logo-image" />
              <div>
                <span className="logo-text-sub" style={{ fontSize: '11px' }}>STEEL & ROOFING</span>
              </div>
            </a>
            <p className="footer-desc">
              Powering progress through high-quality materials and professional workmanship for residential, commercial and industrial clients across Zimbabwe.
            </p>
          </div>

          {/* Column 2: Company */}
          <div>
            <h3 className="footer-col-title">Company</h3>
            <ul className="footer-links-list">
              <li className="footer-link-item">
                <a href="#about" onClick={(e) => handleLinkClick(e, 'about')}>About Us</a>
              </li>
              <li className="footer-link-item">
                <a href="#projects" onClick={(e) => handleLinkClick(e, 'projects')}>Projects</a>
              </li>
              <li className="footer-link-item">
                <a href="#services" onClick={(e) => handleLinkClick(e, 'services')}>Services</a>
              </li>
              <li className="footer-link-item">
                <a href="#careers" onClick={(e) => handleLinkClick(e, 'contact')}>Careers</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="footer-col-title">Services</h3>
            <ul className="footer-links-list">
              <li className="footer-link-item">
                <a href="#services" onClick={(e) => handleLinkClick(e, 'services')}>Roofing Supply & Fitting</a>
              </li>
              <li className="footer-link-item">
                <a href="#services" onClick={(e) => handleLinkClick(e, 'services')}>Steel Structures</a>
              </li>
              <li className="footer-link-item">
                <a href="#services" onClick={(e) => handleLinkClick(e, 'services')}>Construction Services</a>
              </li>
              <li className="footer-link-item">
                <a href="#services" onClick={(e) => handleLinkClick(e, 'services')}>Steel Fabrication</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Socials */}
          <div>
            <h3 className="footer-col-title">Contact & Follow</h3>
            <div className="footer-contact-info" style={{ marginBottom: '24px' }}>
              <div className="footer-contact-item">
                <Phone size={16} />
                <span>+263 77 963 7733</span>
              </div>
              <div className="footer-contact-item">
                <Mail size={16} />
                <a href="mailto:alfasteelroofmerch@gmail.com" style={{ color: 'inherit' }}>alfasteelroofmerch@gmail.com</a>
              </div>
              <div className="footer-contact-item">
                <MapPin size={16} />
                <span>14New Davies way Prospect, Waterfalls Harare</span>
              </div>
            </div>
            <div className="footer-social-links">
              {/*<a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>*/}
              <a href="https://wa.me/263779637733" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="WhatsApp">
                <MessageSquare size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="copyright-text">
            © {currentYear} ALFA Steel & Roofing Merchants. All Rights Reserved.
          </div>
          <div className="credit-text">
            Website designed by <a href="https://tantheon.co.zw" target="_blank" rel="noopener noreferrer" className="credit-link">Tantheon Digital</a> © 2026
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
