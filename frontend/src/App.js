/**
 * File: App.js
 *
 * Description:
 * Main React application component that sets up routing and navigation for the
 * Running Tracker and Mood Tracker web app. This component uses React Router to
 * define routes for different pages including Home, Runs, and Mood. It also
 * includes a navigation bar for easy access to these pages.
 *
 * Responsibilities:
 * - Configure React Router for page navigation.
 * - Render the navigation bar with site title/logo.
 * - Provide routes for Home and Runs pages.
 *
 * Key Components:
 * - App: Wrapper component with router and layout.
 * - HomePage: Simple landing page for the app.
 * - RunsPage: Imported component for managing run data.
 * - MoodPage: Imported component for managing mood survey data.
 *
 * Dependencies:
 * - React
 * - react-router-dom (Router, Routes, Route, NavLink)
 * - RunsPage from ./api/RunsPage
 * - HomePage from ./home/HomePage
 * - MoodPage from ./api/MoodPage
 * - ./App.css for styling
 *
 * Notes:
 * - Uses inline styles for navigation bar and header.
 * - Navigation links highlight when active.
 *
 * Author: Matt Burchett
 * Last Modified: 1-15-2026
 */

import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import RunsPage from "./api/RunsPage/RunsPage.js";
import HomePage from "./home/HomePage";
import MoodPage from "./api/MoodPage/MoodPage.js";
import "./App.css";


function App() {
  return (
    <Router>

      <nav>
        <h1 className="app-header-text">
          M&RTT
        </h1>

        <NavLink
          to="/"
          end
          className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}
        >
          Home
        </NavLink>
        <NavLink
          to="/runs"
          end
          className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}
        >
          Runs
        </NavLink>
        <NavLink
          to="/mood"
          end
          className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}
        >
          Mood
        </NavLink>
      </nav>

      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/runs" element={<RunsPage />} />
          <Route path="/mood" element={<MoodPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;