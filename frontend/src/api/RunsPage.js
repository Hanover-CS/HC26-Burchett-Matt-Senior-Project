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
 * Last Modified: 11-19-2025
 */

import React, { useEffect, useState } from "react";
import { getRuns } from "./runs";
import "./RunsPage.css";
import { BASE_URL } from "./config";

function RunsPage() {
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
      const res = await fetch(`${BASE_URL}/api/runs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to add run");

      //const data = await res.json();
      alert("✅ Run added successfully!");

      // Reset form
      setFormData({ name: "", date: "", total_time: "", distance: "" });
    } catch (err) {
      console.error(err);
      alert("❌ Error adding run");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/api/runs/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete run");
      setRuns(runs.filter((run) => run.id !== id));
      alert("✅ Run deleted successfully!");
      
    } catch (err) {
      console.error(err);
      alert("❌ Error deleting run");
    }
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Add Run</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px"}}>
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
          placeholder="Run name"
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
        <table className="runs-table" 
        style={{ 
        margin: "0 auto", 
        borderCollapse: "collapse", 
        width: "80%" 
        }}>
          <thead>
            <tr>
              <th className="th">Date</th>
              <th className="th">Name</th>
              <th className="th">Distance (mi)</th>
              <th className="th">Total Time</th>
              <th className="th">Pace</th>
              <th className="th"></th>
            </tr>
          </thead>

          <tbody>
            {runs.map((run) => (
              <tr key={run.id} className="tr">
                <td className="td">{run.date}</td>
                <td className="td">{run.name}</td>
                <td className="td">{run.distance}</td>
                <td className="td">{run.total_time}</td>
                <td className="td">{run.pace}</td>
                <td className="td">
                  <button className="button"
                    onClick={() => handleDelete(run.id)}
                    >
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

    </div>
  );
}

export default RunsPage;
