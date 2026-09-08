import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "../components/Toast/ToastProvider";
import PromptsPage from "../pages/PromptsPage";

function renderWithRouter(ui) {
  return render(
    <ToastProvider>
      <BrowserRouter>{ui}</BrowserRouter>
    </ToastProvider>
  );
}

describe("PromptsPage", () => {
  it("renders prompts page", () => {
    renderWithRouter(<PromptsPage />);
    expect(screen.getByRole("heading", { name: "Prompts" })).toBeInTheDocument();
    expect(screen.getByText("Available Prompts")).toBeInTheDocument();
  });

  it("renders prompt templates", () => {
    renderWithRouter(<PromptsPage />);
    expect(screen.getByText("Weekly Update to Manager")).toBeInTheDocument();
    expect(screen.getByText("Project Status Report")).toBeInTheDocument();
    expect(screen.getByText("Corporate Weekly Status Email")).toBeInTheDocument();
  });

  it("shows empty state when no prompt selected", () => {
    renderWithRouter(<PromptsPage />);
    expect(screen.getByText("Select a prompt template to get started")).toBeInTheDocument();
  });

  it("renders form fields when prompt selected", async () => {
    const user = userEvent.setup();
    renderWithRouter(<PromptsPage />);
    const promptCard = screen.getByText("Weekly Update to Manager");
    await user.click(promptCard);
    expect(screen.getByLabelText(/What did you achieve this week/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/What are your priorities for next week/i)).toBeInTheDocument();
  });

  it("copies prompt text when copy button clicked", async () => {
    const user = userEvent.setup();
    renderWithRouter(<PromptsPage />);
    const copyButtons = screen.getAllByText("Copy Prompt");
    await user.click(copyButtons[0]);
    expect(screen.getByText("Copied")).toBeInTheDocument();
  });
});