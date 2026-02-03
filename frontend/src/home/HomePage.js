/**
 * File: HomePage.js
 *
 * Description:
 * React page component for the home page of the Mood & Running Task Tracker app.
 * This component serves as a simple landing page that welcomes users and provides
 * a brief overview of the app's purpose. 
 *
 * Responsibilities:
 * - Render a welcome message and brief description of the app.
 * - Serve as the landing page for users visiting the app.
 * - Display recent run and mood data.
 * 
 *
 * Key Components:
 * - HomePage: Main page component for the home page.
 *
 * Dependencies:
 * - React
 * - BASE_URL from ../api/config
 * - ./HomePage.css for styling
 *
 * Notes:
 * - Currently serves as a static landing page; future enhancements may include login functionality.
 *
 * Author: Matt Burchett
 * Last Modified: 2-2-2026
 */

import React, { useEffect, useState } from "react";
import { BASE_URL } from "../api/config";
import "./HomePage.css";

function HomePage() {

  const [latestRun, setLatestRun] = useState(null);
  const [latestMood, setLatestMood] = useState(null);

  useEffect(() => {
  fetch(`${BASE_URL}/api/recents`)
    .then(res => res.json())
    .then(data => {
      setLatestRun(data.latest_run);
      setLatestMood(data.latest_mood);
    });
  }, []);

  return (
    <main>
      <header>
        <h2>Welcome to the Mood & Running Task Tracker!</h2>
      </header>
      <p className="intro-text">
          Track your runs, monitor your progress, and stay motivated.
      </p>

      <section>
        <article>
          <h3>Recent Run</h3>
          <p className="box-text">View your latest run and stats.</p>
          {latestRun ? (
            <div className="box-text">
              <p><strong>{latestRun.date}</strong></p>
              <p>Name: {latestRun.name}</p>
              <p>Distance: {latestRun.distance} mi</p>
              <p>Pace: {latestRun.pace}</p>
              <p>Duration: {latestRun.total_time}</p>
            </div>
          ) : (
            <p className="box-text">No runs yet.</p>
          )}
        </article>

        <article>
          <h3>Recent Mood</h3>
          <p className="box-text">View your latest mood and stats.</p>
          {latestMood ? (
            <div className="box-text">
              <p><strong>{latestMood.date}</strong></p>
              <p>Positivity: {latestMood.positivity_level}</p>
              <p>Stress: {latestMood.stress_level}</p>
              <p>Energy: {latestMood.energy_level}</p>
              <p>Calmness: {latestMood.calmness_level}</p>
              <p>Motivation: {latestMood.motivation_level}</p>
            </div>
          ) : (
            <p className="box-text">No moods logged yet.</p>
          )}
        </article>
      </section>
    </main> 
    
  );
}

export default HomePage;