/**
 * File: MoodTable.js
 *
 * Description:
 * Displays a table of mood entries.
 * 
 * Responsibilities:
 * - Render a table of mood entries.
 * - Provide delete button for each mood entry.
 * 
 * Key Components / Functions:
 * - MoodTable: Functional component rendering the table.
 * 
 * Dependencies:
 * - ./MoodPage.css for styling
 * 
 * Author: Matt Burchett
 * Last Modified: 2-2-2026
 */

import "./MoodPage.css";

function MoodTable({ moods, onDelete }) {
  if (moods.length === 0) {
    return <p>No mood entries found.</p>;
  }

  return (
    <table className="mood-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Positivity</th>
          <th>Stress</th>
          <th>Energy</th>
          <th>Calmness</th>
          <th>Motivation</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {moods.map((mood) => (
          <tr key={mood.id}>
            <td>{mood.date}</td>
            <td>{mood.positivity_level}</td>
            <td>{mood.stress_level}</td>
            <td>{mood.energy_level}</td>
            <td>{mood.calmness_level}</td>
            <td>{mood.motivation_level}</td>
            <td>
              <button
                className="button"
                onClick={() => onDelete(mood.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MoodTable;
