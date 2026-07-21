import { useState } from 'react';

function FeedbackForm() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) return;
    setSubmitted(true);
  };

  const resetForm = () => {
    setRating(0);
    setComment('');
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="feedback-form">
        <p>Thanks for your {rating}-star feedback!</p>
        <button onClick={resetForm}>Submit another</button>
      </div>
    );
  }

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <div className="star-row">
        {[1, 2, 3, 4, 5].map(star => (
          <span
            key={star}
            className={star <= rating ? 'star filled' : 'star'}
            onClick={() => setRating(star)}
          >
            ★
          </span>
        ))}
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Any comments? (optional)"
        rows={3}
      />

      <button type="submit">Submit Feedback</button>
    </form>
  );
}

export default FeedbackForm;