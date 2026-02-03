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
 * - handleRunSubmit(): Sends POST /api/runs request to backend.
 * - handleRunDelete(): Sends DELETE /api/runs/:id request to backend.
 *
 * Dependencies:
 * - React (useState, useEffect)
 * - getRuns() from ./api/runs
 * - fetch API
 * - RunForm from ./RunsForm
 * - RunsTable from ./RunsTable
 * - ./RunsPage.css for styling
 *
 * Notes:
 * - Requires backend time format HH:MM:SS for successful submission.
 * - Displays pace computed on the backend via Run model.
 * - Alerts user on success/failure of add/delete operations.
 *
 * Author: Matt Burchett
 * Last Modified: 2-2-2026
 */

import { useEffect, useState } from "react";

import { getRuns } from "./runs";
import { BASE_URL } from "../config";

import "./RunsPage.css";

import RunForm from "./RunsForm";
import RunsTable from "./RunsTable";

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

  const handleRunSubmit = async (e) => {
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

  const handleRunDelete = async (id) => {
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

      <RunForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleRunSubmit}
      />

      <h1>My Runs</h1>
      <RunsTable
        runs={runs}
        onDelete={handleRunDelete}
      />

    </section>
  );
}

export default RunsPage;
