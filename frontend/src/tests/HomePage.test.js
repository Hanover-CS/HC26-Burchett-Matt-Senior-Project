import { render, screen } from "@testing-library/react";
import HomePage from "../home/HomePage.js";

test("renders homepage welcome text", () => {
  render(<HomePage />);
  expect(screen.getByText(/Welcome to the Mood/i)).toBeInTheDocument();
});

test("renders both info boxes", () => {
  render(<HomePage />);
  expect(screen.getByText("Recent Run")).toBeInTheDocument();
  expect(screen.getByText("Recent Mood")).toBeInTheDocument();
});
