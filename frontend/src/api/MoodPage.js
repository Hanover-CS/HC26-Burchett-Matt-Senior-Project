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

function MoodPage() {
  const [moods, setMoods] = useState([]);
  const [formData, setFormData] = useState({ 
    positivity_level: "", 
    stress_level: "", 
    energy_level: "", 
    calmness_level: "", 
    motivation_level: "" });

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

  // create a component

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Mood Survey</h1>
      <p style={{ marginBottom: "20px" }}>Fill out your daily mood survey!</p>

      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <div>
          <label>
            Positivity Level (1-10):
            <input 
            type="number" 
            name="positivity_level" 
            value={formData.positivity_level}
            min="1" 
            max="10"
            onChange={handleChange} 
            required />
          </label>
        </div>
        <div>
          <label>
            Stress Level (1-10):
            <input 
            type="number" 
            name="stress_level"
            value={formData.stress_level}
            min="1" 
            max="10" 
            onChange={handleChange}
            required />
          </label>
        </div>
        <div>
          <label>
            Energy Level (1-10):
            <input 
            type="number" 
            name="energy_level" 
            value={formData.energy_level}
            min="1" 
            max="10" 
            onChange={handleChange}
            required />
          </label>
        </div>
        <div>
          <label>
            Calmness Level (1-10):
            <input 
            type="number" 
            name="calmness_level" 
            value={formData.calmness_level}
            min="1" 
            max="10" 
            onChange={handleChange}
            required />
          </label>
        </div>
        <div>
          <label>
            Motivation Level (1-10):
            <input 
            type="number" 
            name="motivation_level"
            value={formData.motivation_level}
            min="1" 
            max="10"
            onChange={handleChange} 
            required />
          </label>
        </div>
        <button type="submit">Submit Mood</button>
      </form>
      <h1>My Moods</h1>
      <ul>
        {moods.map((mood) => (
          <li key={mood.id}>
            {mood.date}<br />
            Positivity: {mood.positivity_level}, 
            Stress: {mood.stress_level},
            Energy: {mood.energy_level}, 
            Calmness: {mood.calmness_level},
            Motivation: {mood.motivation_level}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MoodPage;