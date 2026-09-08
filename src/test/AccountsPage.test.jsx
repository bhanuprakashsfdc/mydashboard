import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import AccountsPage from "../pages/AccountsPage";
import { accounts } from "../data/data";

function renderWithRouter(ui) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe("AccountsPage", () => {
  it("renders accounts grid with data", () => {
    renderWithRouter(<AccountsPage />);
    expect(screen.getByText("Accounts")).toBeInTheDocument();
    expect(screen.getByText("GitHub")).toBeInTheDocument();
  });

  it("shows correct account count", () => {
    renderWithRouter(<AccountsPage />);
    expect(screen.getByText(`${accounts.length} accounts`)).toBeInTheDocument();
  });

  it("filters accounts by search", async () => {
    const user = userEvent.setup();
    renderWithRouter(<AccountsPage />);
    const search = screen.getByPlaceholderText("Search accounts...");
    await user.type(search, "github");
    expect(screen.getByText("GitHub")).toBeInTheDocument();
  });

  it("renders sidebar sections", () => {
    renderWithRouter(<AccountsPage />);
    const sidebar = document.querySelector(".sidebar");
    expect(sidebar).toBeTruthy();
    expect(screen.getByText("Personal", { selector: ".sidebar-item-label" })).toBeInTheDocument();
    expect(screen.getByText("Hobby", { selector: ".sidebar-item-label" })).toBeInTheDocument();
    expect(screen.getByText("Work", { selector: ".sidebar-item-label" })).toBeInTheDocument();
  });

  it("renders prompts link in sidebar footer", () => {
    renderWithRouter(<AccountsPage />);
    const promptsLink = document.querySelector('.sidebar-quotes-link[href="/prompts"]');
    expect(promptsLink).toBeTruthy();
    expect(screen.getByText("Prompts", { selector: ".sidebar-item-label" })).toBeInTheDocument();
  });

  it("clears selection", async () => {
    const user = userEvent.setup();
    renderWithRouter(<AccountsPage />);
    const nameCell = screen.getByText("GitHub");
    const row = nameCell.closest('[role="row"]');
    const checkbox = row?.querySelector('input[type="checkbox"]');
    expect(checkbox).toBeTruthy();
    if (checkbox) {
      await user.click(checkbox);
    }
    expect(screen.getAllByText("1 selected").length).toBeGreaterThan(0);
    const clearBtn = screen.getByText("Clear");
    await user.click(clearBtn);
    expect(screen.queryByText("1 selected")).not.toBeInTheDocument();
  });

  it("opens external links in new tab", async () => {
    renderWithRouter(<AccountsPage />);
    const links = screen.getAllByTitle("https://github.com");
    expect(links[0]).toHaveAttribute("target", "_blank");
    expect(links[0]).toHaveAttribute("rel", "noopener noreferrer");
  });
});
