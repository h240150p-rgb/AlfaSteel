import React from 'react';

export const Process: React.FC = () => {
  const steps = [
    { num: '01', title: 'Consultation', desc: 'We discuss project scope, architectural plans, material preferences, and conceptual designs.' },
    { num: '02', title: 'Site Assessment', desc: 'Our technical team conducts detailed onsite checks, structural measures, and topographical evaluations.' },
    { num: '03', title: 'Quotation', desc: 'We provide an itemized, transparent cost breakdown matching budget goals with no hidden fees.' },
    { num: '04', title: 'Fabrication', desc: 'Precision manufacturing in our controlled factory workshop under severe QC checks.' },
    { num: '05', title: 'Construction', desc: 'Onsite assembly, structural erection, and professional roofing fitting by qualified crews.' },
    { num: '06', title: 'Project Delivery', desc: 'Final site handover, quality inspections, approvals, and certifications.' },
  ];

  return (
    <section className="section bg-surface">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">How We Work</span>
          <h2 className="section-title">Our Project Execution Process</h2>
          <p className="section-desc">
            A seamless, transparent roadmap that guarantees efficiency, safety, and precision at every phase.
          </p>
        </div>

        <div className="timeline">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
            >
              <div className="timeline-dot" />
              <div className="timeline-content glass glass-hover">
                <div className="timeline-num">{step.num}</div>
                <h3 className="timeline-title">{step.title}</h3>
                <p className="timeline-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Process;
