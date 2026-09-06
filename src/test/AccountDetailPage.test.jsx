import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import AccountDetailPage from "../pages/AccountDetailPage";
import { accounts } from "../data/data";

function renderWithRouter(ui, { route = "/" } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/accounts/:id" element={ui} />
      </Routes>
    </MemoryRouter>
  );
}

describe("AccountDetailPage", () => {
  it("renders account details", () => {
    const account = accounts[0];
    renderWithRouter(<AccountDetailPage />, { route: `/accounts/${account.id}` });
    expect(screen.getByText(account.name)).toBeInTheDocument();
    expect(screen.getByText(account.description)).toBeInTheDocument();
  });

  it("renders multiple URLs", () => {
    const account = accounts.find((a) => a.urls.length > 1);
    if (!account) return;
    renderWithRouter(<AccountDetailPage />, { route: `/accounts/${account.id}` });
    account.urls.forEach((urlItem) => {
      const url = typeof urlItem === 'string' ? urlItem : urlItem.url;
      if (url) expect(screen.getByText(url)).toBeInTheDocument();
    });
  });

  it("shows not found for invalid id", () => {
    renderWithRouter(<AccountDetailPage />, { route: "/accounts/nonexistent" });
    expect(screen.getByText("Account not found")).toBeInTheDocument();
  });
});
