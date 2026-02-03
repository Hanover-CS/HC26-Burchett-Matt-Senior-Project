/**
 * File: RunsTable.js
 *
 * Description:
 * Displays a table of runs with delete actions.
 */

import "./RunsPage.css";

function RunsTable({ runs, onDelete }) {
  if (runs.length === 0) {
    return <p>No runs found.</p>;
  }

  return (
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
              <button
                className="button"
                onClick={() => onDelete(run.id)}
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

export default RunsTable;
