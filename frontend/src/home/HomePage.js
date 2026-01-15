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
 * - Provide styled boxes for recent activity and adding new runs (placeholders for future functionality).
 *
 * Key Components:
 * - HomePage: Main page component for the home page.
 *
 * Dependencies:
 * - React
 *
 * Notes:
 * - Currently serves as a static landing page; future enhancements may include login functionality.
 *
 * Author: Matt Burchett
 * Last Modified: 11-19-2025
 */

import React from "react";
import "./HomePage.css";

function HomePage() {
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
          <h3>Recent Activity</h3>
          <p className="box-text">View your latest runs and stats.</p>
        </article>

        <article>
          <h3>Recent Mood</h3>
          <p className="box-text">View your latest moods and stats.</p>
        </article>
      </section>
    </main> 
    
  );
}

export default HomePage;