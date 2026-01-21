/**
 * File: MoodPage.js
 *
 * Description:
 * React page component for displaying and adding user mood surveys. This component
 * shows a form for entering mood details and a list of all existing mood entries
 * from the backend API. The component fetches data on mount and handles state
 * updates for both form input and mood listing.
 *
 * Responsibilities:
 * - Render a form allowing users to submit new mood survey data.
 * - Validate and send POST requests to the backend.
 * - Fetch existing moods from the backend when the page loads.
 * - Display mood information in a styled list.
 *
 * Key Components / Functions:
 * - MoodPage: Main page component with form and list.
 * - handleChange(): Updates form state on user input.
 * - handleSubmit(): Sends POST /api/mood request to backend.
 * 
 * Dependencies:
 * - React (useState, useEffect)
 * - fetch API
 *
 * Notes:
 * - Requires backend integer ratings for successful submission.
 * - Displays mood entries fetched from the backend.
 * 
 * Author: Matt Burchett
 * Last Modified: 12-9-2025
 */

import React, { useEffect, useState } from "react";
import { BASE_URL } from "./config";
import "./MoodPage.css";

function MoodPage() {
  const MOOD_FIELDS = [
  { name: "positivity_level", label: "Positivity" },
  { name: "stress_level", label: "Stress" },
  { name: "energy_level", label: "Energy" },
  { name: "calmness_level", label: "Calmness" },
  { name: "motivation_level", label: "Motivation" },
  ];

  const [moods, setMoods] = useState([]);

  const initialFormState = Object.fromEntries(
  MOOD_FIELDS.map(field => [field.name, 5])
  );

  const [formData, setFormData] = useState(initialFormState);
  

  // Loading all moods
  useEffect(() => {
    fetch(`${BASE_URL}/api/mood`)
      .then((res) => res.json())
      .then((data) => setMoods(data.moods));
    }, []);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Convert strings → integers
    const payload = {
      positivity_level: Number(formData.positivity_level),
      stress_level: Number(formData.stress_level),
      energy_level: Number(formData.energy_level),
      calmness_level: Number(formData.calmness_level),
      motivation_level: Number(formData.motivation_level),
    };

    try {
      const res = await fetch(`${BASE_URL}/api/mood`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to add run");

      alert("Survey submitted!");

      // Clear inputs
      setFormData({
        positivity_level: "", 
        stress_level: "", 
        energy_level: "", 
        calmness_level: "", 
        motivation_level: ""});
      } catch (err) {
        console.error(err);
        alert("Error submitting survey");
      }
  };

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

  return (
    <section className="mood-page-section">
      <h1>Mood Survey</h1>

      <form onSubmit={handleSubmit} className="mood-form">
        {MOOD_FIELDS.map(field => (
          <MoodSlider
            key={field.name}
            label={`${field.label} Level (1–10)`}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
          />
        ))}

        <button type="submit" className="button">
          Submit Mood
        </button>
      </form>
      <h1>My Moods</h1>
      {moods.length > 0 ? (
        <table className="mood-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Positivity</th>
              <th>Stress</th>
              <th>Energy</th>
              <th>Calmness</th>
              <th>Motivation</th>
            </tr>
          </thead>
          
          <tbody>
            {moods.map((mood) => (
              <tr key={mood.id}>
                <td>{mood.date}</td>
                <td>{mood.positivity_level}</td>
                <td>{mood.stress_level}</td>
                <td>{mood.energy_level}</td>
                <td>{mood.calmness_level}</td>
                <td>{mood.motivation_level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No mood entries found.</p>
      )}
    </section>
  );
}

export default MoodPage;