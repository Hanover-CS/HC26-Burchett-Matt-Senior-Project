/**
 * File: MoodForm.js
 *
 * Description:
 * Form component for submitting a mood survey.
 * 
 * Responsibilities:
 * - Render sliders for mood attributes.
 * - Handle input changes and form submission.
 * 
 * Key Components / Functions:
 * - MoodForm: Functional component rendering the form.
 * - MoodSlider: Sub-component for individual sliders.
 * 
 * Dependencies:
 * - ./MoodPage.css for styling
 * 
 * Author: Matt Burchett
 * Last Modified: 2-2-2026
 */

import "./MoodPage.css";

function MoodSlider({ label, name, value, onChange }) {
  return (
    <div className="slider-group">
      <label>
        {label}:
        <input
          type="range"
          name={name}
          min="1"
          max="10"
          step="1"
          value={value}
          onChange={onChange}
          className="mood-slider"
        />
      </label>

      <div className="slider-scale">
        {[...Array(10)].map((_, i) => (
          <span key={i}>{i + 1}</span>
        ))}
      </div>
    </div>
  );
}

function MoodForm({ fields, formData, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="mood-form">
      {fields.map((field) => (
        <MoodSlider
          key={field.name}
          label={`${field.label} Level (1–10)`}
          name={field.name}
          value={formData[field.name]}
          onChange={onChange}
        />
      ))}

      <button type="submit" className="button">
        Submit Mood
      </button>
    </form>
  );
}

export default MoodForm;
