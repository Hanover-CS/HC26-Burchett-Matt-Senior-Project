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
 * Last Modified: 1-28-2025
 */

import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import "./MoodPage.css";
import MoodForm from "./MoodForm";
import MoodTable from "./MoodTable";

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

      const data = await res.json();
      alert("Survey submitted!");
      
      // Update mood list without refresh
      setMoods((prev) => [...prev, data.mood]);

      // Clear inputs
      setFormData({
        positivity_level: "5", 
        stress_level: "5", 
        energy_level: "5", 
        calmness_level: "5", 
        motivation_level: "5"});
      } catch (err) {
        console.error(err);
        alert("Error submitting survey");
      }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/api/mood/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete mood");
      setMoods(moods.filter((mood) => mood.id !== id));
      alert("✅ Mood deleted successfully!");
      
    } catch (err) {
      console.error(err);
      alert("❌ Error deleting mood");
    }
  }

  return (
    <section className="mood-page-section">
      <h1>Mood Survey</h1>

      <MoodForm
        fields={MOOD_FIELDS}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      <h1>My Moods</h1>

      <MoodTable moods={moods} onDelete={handleDelete} />
    </section>
  );
}

export default MoodPage;