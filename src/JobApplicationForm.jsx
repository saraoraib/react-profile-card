import { useState } from 'react';
import ExperienceCounter from './ExperienceCounter';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^[0-9+\-\s()]{7,}$/;
const STEPS = ['Personal Info', 'Experience', 'Review & Submit'];

const INITIAL_FORM = {
  fullName: '',
  email: '',
  phone: '',
  position: '',
  yearsExperience: 0,
  coverLetter: '',
  cvFile: null,
};

function JobApplicationForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState(INITIAL_FORM);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (currentStep) => {
    const e = {};
    if (currentStep === 0) {
      if (!form.fullName.trim()) e.fullName = true;
      if (!EMAIL_REGEX.test(form.email.trim())) e.email = true;
      if (!PHONE_REGEX.test(form.phone.trim())) e.phone = true;
    }
    if (currentStep === 1) {
      if (!form.position.trim()) e.position = true;
      if (form.yearsExperience === '' || Number(form.yearsExperience) < 0) e.yearsExperience = true;
      if (form.coverLetter.trim().length < 20) e.coverLetter = true;
      if (!form.cvFile) e.cvFile = true;
    }
    return e;
  };

  const goNext = () => {
    const foundErrors = validateStep(step);
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length === 0) {
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
    }
  };

  const goBack = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    setStep(0);
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="job-form">
        <p className="success-message">
          Thanks, {form.fullName}! Your application for "{form.position}" has been received.
        </p>
        <button type="button" className="form-button" onClick={resetForm}>
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <div className="job-form">
      <div className="step-row" aria-label="Application progress">
        {STEPS.map((label, i) => (
          <div key={label} className="step-item">
            <div className={`step-circle ${i === step ? 'active' : ''} ${i < step ? 'complete' : ''}`}>
              {i < step ? '✓' : i + 1}
            </div>
            <span className={`step-label ${i === step ? 'active' : ''}`}>{label}</span>
            {i < STEPS.length - 1 && <div className={`step-line ${i < step ? 'complete' : ''}`} />}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {step === 0 && (
          <div className="step-panel">
            <InputField
              label="Full Name"
              type="text"
              value={form.fullName}
              hasError={errors.fullName}
              errorMsg="Please enter your full name."
              onChange={(e) => updateField('fullName', e.target.value)}
            />
            <InputField
              label="Email"
              type="email"
              value={form.email}
              hasError={errors.email}
              errorMsg="Please enter a valid email address."
              onChange={(e) => updateField('email', e.target.value)}
            />
            <InputField
              label="Phone"
              type="tel"
              value={form.phone}
              placeholder="+970 592 856 679"
              hasError={errors.phone}
              errorMsg="Please enter a valid phone number."
              onChange={(e) => updateField('phone', e.target.value)}
            />
          </div>
        )}

        {step === 1 && (
          <div className="step-panel">
            <InputField
              label="Position Applying For"
              type="text"
              value={form.position}
              placeholder="e.g. Frontend Developer"
              hasError={errors.position}
              errorMsg="Please enter the position."
              onChange={(e) => updateField('position', e.target.value)}
            />

            <label className="form-label">
              Years of Experience
              <ExperienceCounter
                value={Number(form.yearsExperience) || 0}
                onChange={(val) => updateField('yearsExperience', val)}
              />
              {errors.yearsExperience && <span className="field-error">Please select a valid number of years.</span>}
            </label>

            <label className="form-label">
              Cover Letter
              <textarea
                className="form-input"
                style={{ borderColor: errors.coverLetter ? '#ef4444' : '#cbd5e1' }}
                value={form.coverLetter}
                rows={5}
                placeholder="Tell us why you're a great fit (min 20 characters)..."
                onChange={(e) => updateField('coverLetter', e.target.value)}
              />
              {errors.coverLetter && <span className="field-error">Please write at least 20 characters.</span>}
            </label>

            <label className="form-label">
              Upload CV / Resume
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="form-input"
                style={{ borderColor: errors.cvFile ? '#ef4444' : '#cbd5e1' }}
                onChange={(e) => updateField('cvFile', e.target.files[0] || null)}
              />
              {form.cvFile && <span className="cv-filename">📎 {form.cvFile.name}</span>}
              {errors.cvFile && <span className="field-error">Please upload a PDF or Word document.</span>}
            </label>
          </div>
        )}

        {step === 2 && (
          <div className="step-panel review-panel">
            <h3 className="review-heading">Review your application</h3>
            <dl className="review-list">
              <dt>Full Name</dt><dd>{form.fullName}</dd>
              <dt>Email</dt><dd>{form.email}</dd>
              <dt>Phone</dt><dd>{form.phone}</dd>
              <dt>Position</dt><dd>{form.position}</dd>
              <dt>Experience</dt><dd>{form.yearsExperience} year(s)</dd>
              <dt>Cover Letter</dt><dd>{form.coverLetter}</dd>
              <dt>CV / Resume</dt><dd>{form.cvFile ? form.cvFile.name : '—'}</dd>
            </dl>
          </div>
        )}

        <div className="step-nav">
          {step > 0 && (
            <button type="button" className="form-button secondary" onClick={goBack}>
              Back
            </button>
          )}
          {step < STEPS.length - 1 ? (
            <button type="button" className="form-button" onClick={goNext}>
              Next
            </button>
          ) : (
            <button type="submit" className="form-button">
              Submit Application
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function InputField({ label, type, value, placeholder, hasError, errorMsg, onChange }) {
  return (
    <label className="form-label">
      {label}
      <input
        type={type}
        className="form-input"
        style={{ borderColor: hasError ? '#ef4444' : '#cbd5e1' }}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {hasError && <span className="field-error">{errorMsg}</span>}
    </label>
  );
}

export default JobApplicationForm;