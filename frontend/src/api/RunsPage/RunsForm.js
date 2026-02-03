/**
 * File: RunForm.js
 *
 * Description:
 * React component for the run submission form. This component renders
 * input fields for run details including date, name, distance, and total time.
 * It also includes a submit button to add the run.
 *
 * Responsibilities:
 * - Render form inputs for run data.
 * - Handle input changes via props.
 * - Trigger form submission via props.
 * 
 * Key Components / Functions:
 * - RunForm: Functional component rendering the form.
 * 
 * Dependencies:
 * - React
 */

import "./RunsPage.css";

function RunForm({ formData, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="run-form">
      <input
        type="datetime-local"
        name="date"
        value={formData.date}
        onChange={onChange}
        required
      />

      <input
        type="text"
        name="name"
        placeholder="Run Name"
        value={formData.name}
        onChange={onChange}
        required
      />

      <input
        type="number"
        name="distance"
        placeholder="Distance (miles)"
        value={formData.distance}
        onChange={onChange}
        step="0.01"
        required
      />

      <input
        type="text"
        name="total_time"
        placeholder="Time (HH:MM:SS)"
        value={formData.total_time}
        onChange={onChange}
        required
        pattern="^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$"
      />

      <button type="submit" className="button">
        Add Run
      </button>
    </form>
  );
}

export default RunForm;
