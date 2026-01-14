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
 *
 * Notes:
 * - Uses inline styles for navigation bar and header.
 * - Navigation links highlight when active.
 *
 * Author: Matt Burchett
 * Last Modified: 11-19-2025
 */

import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import RunsPage from "./api/RunsPage";
import HomePage from "./home/HomePage";
import MoodPage from "./api/MoodPage";


function App() {
  return (
    <Router>

      <nav style={{ 
      background: "#15324e",
      padding: "15px 30px", 
      textAlign: "center", 
      display: "flex",
      alignItems: "center"
      }}>

        <h1 style={{ 
          margin: 0, 
          fontSize: "30px", 
          color: "black", 
          backgroundColor: "#2EC4B6",
          padding: "8px 14px",             // inside spacing
          borderRadius: "8px",              // rounded corners
          display: "inline-block"
          }}>
          M&RTT
        </h1>

        <NavLink
          to="/"
          end
          style={({ isActive }) => ({
            margin: "0 50px",
            fontSize: "25px",
            fontWeight: isActive ? "bold" : "normal",
            color: "white",
            textDecoration: "none",
          })}
        >
          Home
        </NavLink>
        <NavLink
          to="/runs"
          end
          style={({ isActive }) => ({
            margin: "0 50px",
            fontSize: "25px",
            fontWeight: isActive ? "bold" : "normal",
            color: "white",
            textDecoration: "none",
          })}
        >
          Runs
        </NavLink>
        <NavLink
          to="/mood"
          end
          style={({ isActive }) => ({
            margin: "0 50px",
            fontSize: "25px",
            fontWeight: isActive ? "bold" : "normal",
            color: "white",
            textDecoration: "none",
          })}
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