import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, MessageSquare, Send, CheckCircle2, Copy, ExternalLink, MailOpen, ArrowLeft, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactProps {
  onShowNotification: (message: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ onShowNotification }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: 'Roofing Supply & Fitting',
    message: '',
  });

  const [submittedData, setSubmittedData] = useState<{
    name: string;
    company: string;
    email: string;
    phone: string;
    service: string;
    message: string;
  } | null>(null);

  const handleCloseModal = () => {
    setSubmittedData(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && submittedData) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [submittedData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('alfasteelroofmerch@gmail.com');
    onShowNotification('Copied recipient email address!');
  };

  const handleCopySubject = () => {
    if (submittedData) {
      navigator.clipboard.writeText(`ALFA Steel Quote Request: ${submittedData.service}`);
      onShowNotification('Copied email subject line!');
    }
  };

  const handleCopyMessage = () => {
    if (submittedData) {
      const msgBody = 
        `ALFA Steel & Roofing Quote Request:\n\n` +
        `Name: ${submittedData.name}\n` +
        `Company: ${submittedData.company || 'N/A'}\n` +
        `Email: ${submittedData.email}\n` +
        `Phone: ${submittedData.phone}\n` +
        `Service: ${submittedData.service}\n\n` +
        `Message:\n${submittedData.message}`;
      navigator.clipboard.writeText(msgBody);
      onShowNotification('Copied message body to clipboard!');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { name, company, email, phone, service, message } = formData;
    setSubmittedData({ ...formData });

    const subject = encodeURIComponent(`ALFA Steel Quote Request: ${service}`);
    const body = encodeURIComponent(
      `ALFA Steel & Roofing Quote Request:\n\n` +
      `Name: ${name}\n` +
      `Company: ${company || 'N/A'}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone}\n` +
      `Service: ${service}\n\n` +
      `Message:\n${message}`
    );

    const mailtoUrl = `mailto:alfasteelroofmerch@gmail.com?subject=${subject}&body=${body}`;

    try {
      window.location.href = mailtoUrl;
    } catch (err) {
      console.error('Failed to open mailto:', err);
    }
    
    onShowNotification('Quote prepared! Choose how to send it below.');
  };

  return (
    <section id="contact" className="section bg-dark">
      <AnimatePresence>
        {submittedData && (
          <motion.div 
            className="quote-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div 
              className="quote-modal-card glass"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <button 
                type="button" 
                className="quote-modal-close" 
                onClick={handleCloseModal}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <div className="quote-modal-header">
                <div className="quote-success-badge">
                  <CheckCircle2 size={36} className="success-icon" />
                </div>
                <h3 id="modal-title" className="quote-modal-title">Quote Request Prepared</h3>
                <p className="quote-modal-desc">
                  Your quote request has been prepared and is ready to be sent to Alfa Steel.
                </p>
              </div>

              <div className="quote-info-section">
                <div className="quote-info-card">
                  <div className="quote-info-card-left">
                    <span className="quote-info-card-label">Recipient Email</span>
                    <a href="mailto:alfasteelroofmerch@gmail.com" className="quote-info-card-value email-link">
                      alfasteelroofmerch@gmail.com
                    </a>
                  </div>
                  <button 
                    type="button" 
                    onClick={handleCopyEmail} 
                    className="quote-info-card-copy-btn"
                    title="Copy Email Address"
                  >
                    <Copy size={16} />
                  </button>
                </div>

                <div className="quote-info-card">
                  <div className="quote-info-card-left">
                    <span className="quote-info-card-label">Subject Line</span>
                    <span className="quote-info-card-value">
                      {`ALFA Steel Quote Request: ${submittedData.service}`}
                    </span>
                  </div>
                  <button 
                    type="button" 
                    onClick={handleCopySubject} 
                    className="quote-info-card-copy-btn"
                    title="Copy Subject Line"
                  >
                    <Copy size={16} />
                  </button>
                </div>

                <div className="quote-preview-panel">
                  <div className="quote-preview-header">
                    <span className="quote-preview-header-label">Message Preview</span>
                    <button 
                      type="button" 
                      onClick={handleCopyMessage}
                      className="quote-preview-copy-btn"
                      title="Copy full message body"
                    >
                      <Copy size={13} />
                      <span>Copy Message</span>
                    </button>
                  </div>
                  <div className="quote-preview-body-scroll">
                    <div className="preview-field">
                      <span className="preview-label">From:</span>
                      <span className="preview-value">{submittedData.name} &lt;{submittedData.email}&gt;</span>
                    </div>
                    {submittedData.company && (
                      <div className="preview-field">
                        <span className="preview-label">Company:</span>
                        <span className="preview-value">{submittedData.company}</span>
                      </div>
                    )}
                    <div className="preview-field">
                      <span className="preview-label">Phone:</span>
                      <span className="preview-value">{submittedData.phone}</span>
                    </div>
                    <div className="preview-field">
                      <span className="preview-label">Service:</span>
                      <span className="preview-value">{submittedData.service}</span>
                    </div>
                    <div className="preview-divider" />
                    <div className="preview-body-content">
                      {submittedData.message}
                    </div>
                  </div>
                </div>
              </div>

              <div className="quote-actions-row">
                <a 
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=alfasteelroofmerch@gmail.com&su=${encodeURIComponent(`ALFA Steel Quote Request: ${submittedData.service}`)}&body=${encodeURIComponent(
                    `ALFA Steel & Roofing Quote Request:\n\n` +
                    `Name: ${submittedData.name}\n` +
                    `Company: ${submittedData.company || 'N/A'}\n` +
                    `Email: ${submittedData.email}\n` +
                    `Phone: ${submittedData.phone}\n` +
                    `Service: ${submittedData.service}\n\n` +
                    `Message:\n${submittedData.message}`
                  )}`}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-accent quote-primary-btn"
                >
                  <ExternalLink size={18} />
                  <span>Open Gmail</span>
                </a>
                
                <a 
                  href={`mailto:alfasteelroofmerch@gmail.com?subject=${encodeURIComponent(`ALFA Steel Quote Request: ${submittedData.service}`)}&body=${encodeURIComponent(
                    `ALFA Steel & Roofing Quote Request:\n\n` +
                    `Name: ${submittedData.name}\n` +
                    `Company: ${submittedData.company || 'N/A'}\n` +
                    `Email: ${submittedData.email}\n` +
                    `Phone: ${submittedData.phone}\n` +
                    `Service: ${submittedData.service}\n\n` +
                    `Message:\n${submittedData.message}`
                  )}`}
                  className="btn btn-outline quote-secondary-btn"
                >
                  <MailOpen size={18} />
                  <span>Open Email App</span>
                </a>
              </div>

              <div className="quote-modal-footer">
                <button 
                  type="button" 
                  onClick={handleCloseModal} 
                  className="quote-footer-btn outline-link"
                >
                  <ArrowLeft size={16} />
                  <span>Edit Request</span>
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    setFormData({
                      name: '',
                      company: '',
                      email: '',
                      phone: '',
                      service: 'Roofing Supply & Fitting',
                      message: '',
                    });
                    setSubmittedData(null);
                  }} 
                  className="quote-footer-btn reset-link"
                >
                  <span>Create New Request</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Get In Touch</span>
          <h2 className="section-title">Request a Consultation</h2>
          <p className="section-desc">
            Fill out the form below or contact our sales and engineering desk directly. We will prepare a detailed quotation for your project.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info-col">
            <div className="contact-item">
              <div className="contact-item-icon">
                <Phone size={20} />
              </div>
              <div>
                <h3 className="contact-item-title">Phone Number</h3>
                <p className="contact-item-text">
                  <a href="tel:+263779637733">+263 77 963 7733</a>
                </p>
                <p className="contact-item-text" style={{ fontSize: '13px', marginTop: '4px' }}>
                  Mon - Fri: 8:00 AM - 5:00 PM
                </p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-item-icon">
                <MessageSquare size={20} />
              </div>
              <div>
                <h3 className="contact-item-title">WhatsApp</h3>
                <p className="contact-item-text">
                  <a href="https://wa.me/263779637733" target="_blank" rel="noopener noreferrer">
                    +263 77 963 7733
                  </a>
                </p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-item-icon">
                <Mail size={20} />
              </div>
              <div>
                <h3 className="contact-item-title">Email Address</h3>
                <p className="contact-item-text">
                  <a href="mailto:alfasteelroofmerch@gmail.com">alfasteelroofmerch@gmail.com</a>
                </p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-item-icon">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="contact-item-title">Physical Address</h3>
                <p className="contact-item-text">
                  14New Davies way Prospect, Waterfalls Harare
                </p>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="map-container">
              <iframe
                title="ALFA Steel Location"
                src="https://maps.google.com/maps?q=-17.905855,31.029885&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="contact-form-col glass">
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="form-name" className="form-label">Full Name *</label>
                  <input
                    id="form-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="form-company" className="form-label">Company Name</label>
                  <input
                    id="form-company"
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter company name"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="form-email" className="form-label">Email Address *</label>
                  <input
                    id="form-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="form-phone" className="form-label">Phone Number *</label>
                  <input
                    id="form-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="+263 772 123 456"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="form-service" className="form-label">Service Needed *</label>
                <select
                  id="form-service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="Roofing Supply & Fitting">Roofing Supply & Fitting</option>
                  <option value="Steel Structures">Steel Structures</option>
                  <option value="Construction Services">Construction Services</option>
                  <option value="Steel Fabrication">Steel Fabrication</option>
                  <option value="Steel Supply">Steel Supply</option>
                  <option value="Warehouse & Factory Construction">Warehouse & Factory Construction</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: '30px' }}>
                <label htmlFor="form-message" className="form-label">Message *</label>
                <textarea
                  id="form-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-control"
                  rows={5}
                  placeholder="Describe your project specifications, measurements, and timeline..."
                  required
                />
              </div>

              <button type="submit" className="btn btn-accent" style={{ width: '100%' }}>
                <Send size={18} />
                <span>Submit Quote Request</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Contact;
