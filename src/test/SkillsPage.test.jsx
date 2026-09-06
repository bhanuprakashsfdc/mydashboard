import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SkillsPage from "../pages/SkillsPage";

function renderWithRouter(ui) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe("SkillsPage", () => {
  it("renders skills page", () => {
    renderWithRouter(<SkillsPage />);
    expect(screen.getByText("Skills")).toBeInTheDocument();
    expect(screen.getByText("Technical skills and expertise")).toBeInTheDocument();
  });

  it("renders skill categories", () => {
    renderWithRouter(<SkillsPage />);
    expect(screen.getByText("Frontend")).toBeInTheDocument();
    expect(screen.getByText("Backend")).toBeInTheDocument();
    expect(screen.getByText("Database")).toBeInTheDocument();
  });

  it("renders skill cards", () => {
    renderWithRouter(<SkillsPage />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
    expect(screen.getByText("Python")).toBeInTheDocument();
  });

  it("renders skill descriptions", () => {
    renderWithRouter(<SkillsPage />);
    expect(screen.getByText("JavaScript library for building user interfaces")).toBeInTheDocument();
  });
});
