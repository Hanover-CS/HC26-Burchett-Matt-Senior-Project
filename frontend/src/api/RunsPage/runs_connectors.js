/**
 * File: runs.js
 *
 * Description:
 * Provides helper functions for interacting with the backend API for run data.
 * This file currently includes functionality to fetch all runs from the server.
 *
 * Responsibilities:
 * - Define the backend base URL.
 * - Export API functions that communicate with the Flask backend.
 * - Handle errors during API requests and provide fallback behavior.
 *
 * Key Functions:
 * - getRuns(): Fetches all runs from /api/runs and returns them as JSON.
 *
 * Dependencies:
 * - fetch API (native)
 *
 * Author: Matt Burchett
 * Last Modified: 11-19-2025
 */

import { BASE_URL } from "../config";

export async function getRuns() {
  try {
    const res = await fetch(`${BASE_URL}/api/runs`);
    if (!res.ok) throw new Error("Failed to fetch runs");
    return await res.json();
  } catch (err) {
    console.error("Error fetching runs:", err);
    return { runs: [] };
  }
}