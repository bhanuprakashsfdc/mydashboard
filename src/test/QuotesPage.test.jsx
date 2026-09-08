import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import QuotesPage from "../pages/QuotesPage";

function renderWithRouter(ui) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe("QuotesPage", () => {
  it("renders quotes page", () => {
    renderWithRouter(<QuotesPage />);
    expect(screen.getAllByText("Quotes").length).toBeGreaterThan(0);
    expect(screen.getByText("Featured")).toBeInTheDocument();
    expect(screen.getByText("All Quotes")).toBeInTheDocument();
  });

  it("renders featured quotes", () => {
    renderWithRouter(<QuotesPage />);
    expect(screen.getAllByText(/Never blame anyone in your life/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Unknown/).length).toBeGreaterThan(0);
  });

  it("renders quote categories", () => {
    renderWithRouter(<QuotesPage />);
    expect(screen.getAllByText("Life").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Motivation").length).toBeGreaterThan(0);
  });
});