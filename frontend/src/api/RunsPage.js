/**
 * File: RunsPage.js
 *
 * Description:
 * React page component for displaying and adding user runs. This component shows
 * a form for entering run details and a table listing all existing runs from the
 * backend API. The component fetches data on mount and handles state updates for
 * both form input and run listing.
 *
 * Responsibilities:
 * - Render a form allowing users to submit new run data.
 * - Validate and send POST requests to the backend.
 * - Fetch existing runs from the backend when the page loads.
 * - Display run information in a styled table, including calculated pace.
 *
 * Key Components / Functions:
 * - RunsPage: Main page component with form and table.
 * - handleChange(): Updates form state on user input.
 * - handleSubmit(): Sends POST /api/runs request to backend.
 *
 * Dependencies:
 * - React (useState, useEffect)
 * - getRuns() from ./api/runs
 * - fetch API
 *
 * Notes:
 * - Requires backend time format HH:MM:SS for successful submission.
 * - Displays pace computed on the backend via Run model.
 *
 * Author: Matt Burchett
 * Last Modified: 1-15-2026
 */

import React, { useEffect, useState } from "react";
import { getRuns } from "./runs";
import "./RunsPage.css";
import { BASE_URL } from "./config";

function RunsPage() {

  const RUNS_URL = `${BASE_URL}/api/runs`;

  const addSuccess = "✅ Run added successfully!";
  const addError = "❌ Error adding run";
  
  const deleteSuccess = "✅ Run deleted successfully!";
  const deleteError = "❌ Error deleting run";

  const [runs, setRuns] = useState([]);
  const [formData, setFormData] = useState({ name: "", date: "", total_time: "", distance: "" });

  // Loading all runs
  useEffect(() => {
    getRuns().then((data) => {
      setRuns(data.runs);
    });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(RUNS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to add run");

      const data = await res.json();
      alert(addSuccess);

      // Reset form
      setRuns((prev) => [...prev, data.run]); 
      setFormData({ name: "", date: "", total_time: "", distance: "" });
    } catch (err) {
      console.error(err);
      alert(addError);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${RUNS_URL}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(deleteError);
      setRuns(runs.filter((run) => run.id !== id));
      alert(deleteSuccess);
      
    } catch (err) {
      console.error(err);
      alert(deleteError);
    }
  }

  return (
    <section className="run-page-section">
      <h1>Add Run</h1>

      <form onSubmit={handleSubmit} className="run-form">
        <input
          type="datetime-local"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Run Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="distance"
          placeholder="Distance (miles)"
          value={formData.distance}
          onChange={handleChange}
          step="0.01"
          required
        />
        <input
          type="text"
          name="total_time"
          placeholder="Time (HH:MM:SS)"
          value={formData.total_time}
          onChange={handleChange}
          required
          pattern="^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$"
        />
        <button type="submit" className="button">Add Run</button>
      </form>

      <h1>My Runs</h1>
      {runs.length > 0 ? (
        <table className="runs-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Distance (mi)</th>
              <th>Total Time</th>
              <th>Pace</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {runs.map((run) => (
              <tr key={run.id}>
                <td>{run.date}</td>
                <td>{run.name}</td>
                <td>{run.distance}</td>
                <td>{run.total_time}</td>
                <td>{run.pace}</td>
                <td>
                  <button className="button" onClick={() => handleDelete(run.id)}>
                  Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No runs found.</p>
      )}

    </section>
  );
}

export default RunsPage;
