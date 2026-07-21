import FeedbackForm from './FeedbackForm';
import ContactForm from './ContactForm';

function Contact() {
  return (
    <div>
      <h1>Contact Us</h1>

      <div className="contact-section">
        <h2 className="section-heading">Quick Feedback</h2>
        <FeedbackForm />
      </div>

      <div className="contact-section">
        <h2 className="section-heading">Send a Message</h2>
        <ContactForm />
      </div>
    </div>
  );
}

export default Contact;