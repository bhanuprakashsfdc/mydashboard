import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { quotes, quoteCategories } from "../data/quotes";
import Icon from "../components/Icon/Icon";
import Badge from "../components/ui/Badge";
import Sidebar from "../components/Sidebar/Sidebar";
import AppHeader from "../components/AppHeader/AppHeader";
import { prompts } from "../data/prompts";
import { youTubeTracks } from "../data/music";
import "./QuotesPage.css";

export default function QuotesPage() {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const featuredQuotes = useMemo(() => quotes.filter((q) => q.featured), []);
  const allQuotes = useMemo(() => quotes, []);

  return (
    <div className={`quotes-page ${sidebarCollapsed ? "quotes-page-collapsed" : ""}`}>
      <Sidebar
        selectedSection={null}
        onSelectSection={() => navigate("/")}
        accountCounts={{ all: 0 }}
        promptsCount={prompts.length}
        musicTracks={youTubeTracks}
        collapsed={sidebarCollapsed}
        onCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className="quotes-page-main">
        <AppHeader
          title="Quotes"
          subtitle="Inspiration and wisdom to reflect on"
          user={{ name: "Bhanu" }}
          onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          collapsed={sidebarCollapsed}
        />

        <div className="quotes-page-content">
          {featuredQuotes.length > 0 && (
            <div className="quotes-section">
              <h2 className="quotes-section-title">Featured</h2>
              <div className="quotes-grid">
                {featuredQuotes.map((quote) => (
                  <QuoteCard key={quote.id} quote={quote} />
                ))}
              </div>
            </div>
          )}

          <div className="quotes-section">
            <h2 className="quotes-section-title">All Quotes</h2>
            <div className="quotes-grid">
              {allQuotes.map((quote) => (
                <QuoteCard key={quote.id} quote={quote} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuoteCard({ quote }) {
  const categoryLabel = quoteCategories.find((c) => c.id === quote.category)?.label || quote.category;

  return (
    <div className="quote-card">
      <div className="quote-card-content">
        <span className="quote-icon">
          <Icon name="Quote" size={24} />
        </span>
        <p className="quote-text">{quote.text}</p>
      </div>
      <div className="quote-card-footer">
        <span className="quote-author">— {quote.author}</span>
        <Badge variant="default">{categoryLabel}</Badge>
      </div>
    </div>
  );
}