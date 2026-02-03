import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RunsPage from "../api/RunsPage/RunsPage";
import { getRuns } from "../api/RunsPage/runs_connectors";

jest.mock("../api/RunsPage/runs_connectors");
global.fetch = jest.fn();
global.alert = jest.fn();

beforeEach(() => {
  getRuns.mockResolvedValue({
    runs: [
      {
        id: 1,
        date: "2025-01-01",
        name: "Test Run",
        distance: 3.5,
        total_time: "00:30:00",
        pace: "8:34"
      }
    ]
  });
});
afterEach(() => {
  jest.clearAllMocks();
});

test("loads and displays runs", async () => {
  render(<RunsPage />);

  // Wait for async load
  const row = await screen.findByText("Test Run");
  expect(row).toBeInTheDocument();
});

test("submits a new run", async () => {
  fetch.mockResolvedValueOnce({ ok: true });

  render(<RunsPage />);

  // Wait for initial fetch of runs
  await screen.findByText("Test Run");

  fireEvent.change(screen.getByPlaceholderText("Run Name"), {
    target: { value: "My New Run" }
  });

  fireEvent.change(screen.getByPlaceholderText("Distance (miles)"), {
    target: { value: "2" }
  });

  fireEvent.change(screen.getByPlaceholderText("Time (HH:MM:SS)"), {
    target: { value: "00:20:00" }
  });

  const dateInput = screen.getByDisplayValue("") || 
    document.querySelector("input[type=datetime-local]") ||
    document.querySelector("input[type=date]");
  
  fireEvent.change(dateInput, {
    target: { value: "2025-01-02T12:00" }
  });

  fireEvent.click(screen.getByRole("button", { name: /Add Run/i }));

  await waitFor(() => {
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

test("deletes a run", async () => {
  // FIRST: mock initial load of runs
  getRuns.mockResolvedValueOnce({
    runs: [
      {
        id: 1,
        date: "2025-01-01",
        name: "Test Run",
        distance: 3.5,
        total_time: "00:30:00",
        pace: "8:34"
      }
    ]
  });

  // Mock DELETE request
  fetch.mockResolvedValueOnce({ ok: true });

  // Mock re-fetch after delete
  getRuns.mockResolvedValueOnce({ runs: [] });

  render(<RunsPage />);

  // Wait for initial list to appear
  await screen.findByText("Test Run");

  const deleteBtn = await screen.findAllByRole("button", { name: /Delete/i });
  fireEvent.click(deleteBtn[0]);

  await waitFor(() => {
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/runs/1"),
      expect.any(Object)
    );
  });
});

// test("handles add run error", async () => {
//   fetch.mockResolvedValueOnce({ ok: false });

//   render(<RunsPage />);

//   // Wait for initial fetch of runs
//   await screen.findByText("Test Run");

//   fireEvent.change(screen.getByPlaceholderText("Run Name"), {
//     target: { value: "My New Run" }
//   });

//   fireEvent.change(screen.getByPlaceholderText("Distance (miles)"), {
//     target: { value: "2" }
//   });

//   fireEvent.change(screen.getByPlaceholderText("Time (HH:MM:SS)"), {
//     target: { value: "00:20:00" }
//   });

//   const dateInput = screen.getByDisplayValue("") || 
//     document.querySelector("input[type=datetime-local]") ||
//     document.querySelector("input[type=date]");
  
//   fireEvent.change(dateInput, {
//     target: { value: "2025-01-02T12:00" }
//   });

//   fireEvent.click(screen.getByRole("button", { name: /Add Run/i }));

//   await waitFor(() => {
//     expect(global.alert).toHaveBeenCalledWith("❌ Error adding run");
//   });
// });