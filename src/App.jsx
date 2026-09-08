import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastProvider } from "./components/Toast/ToastProvider";
import { AudioProvider } from "./components/AudioPlayer/AudioProvider";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer";
import AccountsPage from "./pages/AccountsPage";
import AccountDetailPage from "./pages/AccountDetailPage";
import QuotesPage from "./pages/QuotesPage";
import PromptsPage from "./pages/PromptsPage";
import SkillsPage from "./pages/SkillsPage";
import CalculatorsPage from "./pages/CalculatorsPage";
import "./App.css";

export default function App() {
  return (
    <ToastProvider>
      <AudioProvider>
        <Router>
          <div className="app">
            <Routes>
              <Route path="/" element={<AccountsPage />} />
              <Route path="/accounts/:id" element={<AccountDetailPage />} />
              <Route path="/quotes" element={<QuotesPage />} />
              <Route path="/prompts" element={<PromptsPage />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/calculators" element={<CalculatorsPage />} />
            </Routes>
            <AudioPlayer />
          </div>
        </Router>
      </AudioProvider>
    </ToastProvider>
  );
}
