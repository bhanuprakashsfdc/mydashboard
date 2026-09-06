import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccountsPage from "./pages/AccountsPage";
import AccountDetailPage from "./pages/AccountDetailPage";
import QuotesPage from "./pages/QuotesPage";
import PromptsPage from "./pages/PromptsPage";
import SkillsPage from "./pages/SkillsPage";
import "./App.css";

export default function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<AccountsPage />} />
          <Route path="/accounts/:id" element={<AccountDetailPage />} />
          <Route path="/quotes" element={<QuotesPage />} />
          <Route path="/prompts" element={<PromptsPage />} />
          <Route path="/skills" element={<SkillsPage />} />
        </Routes>
      </div>
    </Router>
  );
}
