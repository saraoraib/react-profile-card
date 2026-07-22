import { useState } from 'react';
import FeedbackForm from './FeedbackForm';
import ContactForm from './ContactForm';
import JobApplicationForm from './JobApplicationForm';

const TABS = [
  { key: 'contact', label: 'Send a Message' },
  { key: 'feedback', label: 'Quick Feedback' },
  { key: 'job', label: 'Apply for a Job' },
];

function Contact() {
  const [activeTab, setActiveTab] = useState('contact');

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>

      <div className="tab-row" role="tablist" aria-label="Contact, Feedback, or Job Application">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.key}
            className={`tab-button ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="contact-section">
        {activeTab === 'contact' && <ContactForm />}
        {activeTab === 'feedback' && <FeedbackForm />}
        {activeTab === 'job' && <JobApplicationForm />}
      </div>
    </div>
  );
}

export default Contact;