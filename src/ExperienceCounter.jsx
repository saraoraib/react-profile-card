import { useState } from "react";

function ExperienceCounter({ min = 0, max = 20 }) {
  const [value, setValue] = useState(0);

  const increment = () => {
    setValue(Math.min(value + 1, max));
  };

  const decrement = () => {
    setValue(Math.max(value - 1, min));
  };

  return (
    <div className="experience-counter">
      <button
        type="button"
        className="counter-btn"
        onClick={decrement}
        disabled={value <= min}
        aria-label="Decrease years of experience"
      >
        −
      </button>

      <span className="counter-value-small">
        {value} {value === 1 ? "year" : "years"}
      </span>

      <button
        type="button"
        className="counter-btn"
        onClick={increment}
        disabled={value >= max}
        aria-label="Increase years of experience"
      >
        +
      </button>
    </div>
  );
}

export default ExperienceCounter;