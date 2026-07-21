import { useState } from 'react';

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (name.trim() === '') newErrors.name = true;
    if (!email.includes('@')) newErrors.email = true;
    if (message.trim() === '') newErrors.message = true;
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundErrors = validate();
    setErrors(foundErrors);

    if (Object.keys(foundErrors).length === 0) {
      setSubmitted(true);
    }
  };

  return (
    <div className="contact-form">
      {submitted ? (
        <p className="success-message">Thanks, {name}! Your message has been received.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label className="form-label">
            Name
            <input
              type="text"
              className="form-input"
              style={{ borderColor: errors.name ? '#ef4444' : '#cbd5e1' }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label className="form-label">
            Email
            <input
              type="email"
              className="form-input"
              style={{ borderColor: errors.email ? '#ef4444' : '#cbd5e1' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="form-label">
            Message
            <textarea
              className="form-input"
              style={{ borderColor: errors.message ? '#ef4444' : '#cbd5e1' }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
          </label>

          <button type="submit" className="form-button">Send</button>
        </form>
      )}
    </div>
  );
}

export default ContactForm;