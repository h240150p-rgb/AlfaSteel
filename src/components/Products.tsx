import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Layers, GitBranch, Settings, Hammer } from 'lucide-react';

export const Products: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'roofing', label: 'Roofing' },
    { id: 'steel', label: 'Structural Steel' },
    { id: 'pipes', label: 'Pipes & Tubes' },
    { id: 'accessories', label: 'Accessories' },
  ];

  const productData = [
    {
      category: 'roofing',
      icon: <Layers size={36} />,
      title: 'Roofing Products',
      items: [
        'Chromadek Sheets (Various Colors)',
        'Corrugated Roofing Sheets',
        'IBR Roofing Sheets',
        'Standard & Custom Ridging',
        'Industrial & Domestic Gutters',
      ],
    },
    {
      category: 'steel',
      icon: <GitBranch size={36} />,
      title: 'Structural Steel',
      items: [
        'I-Beams & H-Beams',
        'Structural Channels',
        'Equal & Unequal Angles',
        'Square & Rectangular Hollow Sections',
        'Reinforcing Bars (Rebar)',
      ],
    },
    {
      category: 'pipes',
      icon: <Settings size={36} />,
      title: 'Pipes & Tubes',
      items: [
        'Round Pipes (Galvanized & Black)',
        'Square Tubes',
        'Rectangular Tubes',
        'Thick Walled Boiler Tubes',
      ],
    },
    {
      category: 'accessories',
      icon: <Hammer size={36} />,
      title: 'Accessories',
      items: [
        'High-Tensile Bolts & Nuts',
        'Self-Drilling Roofing Screws',
        'Custom Flashings & Valleys',
        'Industrial Fasteners & Washers',
        'Silicone & Sealants',
      ],
    },
  ];

  const filteredProducts =
    activeTab === 'all'
      ? productData
      : productData.filter((p) => p.category === activeTab);

  return (
    <section id="products" className="section bg-dark">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Our Inventory</span>
          <h2 className="section-title">Premium Industrial Products</h2>
          <p className="section-desc">
            We manufacture and distribute top-tier steel and roofing materials engineered for reliability, strength, and longevity.
          </p>
        </div>

        <div className="products-tabs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`product-tab-btn ${activeTab === cat.id ? 'active' : ''}`}
              onClick={() => setActiveTab(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <motion.div layout className="products-grid">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((prod) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={prod.title}
                className="product-card glass glass-hover"
              >
                <div className="product-icon-wrapper">{prod.icon}</div>
                <h3 className="product-title">{prod.title}</h3>
                <ul className="product-items-list">
                  {prod.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="product-item">
                      <ShieldCheck size={16} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
export default Products;
