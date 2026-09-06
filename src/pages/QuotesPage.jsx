import { useMemo } from "react";
import { quotes, quoteCategories } from "../data/quotes";
import { getCategoryBadgeStyle } from "../utils/labels";
import "./QuotesPage.css";

export default function QuotesPage() {
  const featuredQuotes = useMemo(() => quotes.filter((q) => q.featured), []);
  const allQuotes = useMemo(() => quotes, []);

  return (
    <div className="quotes-page">
      <div className="quotes-page-header">
        <h1 className="quotes-page-title">Quotes</h1>
        <p className="quotes-page-subtitle">
          Inspiration and wisdom to reflect on
        </p>
      </div>

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
  );
}

function QuoteCard({ quote }) {
  const categoryStyle = useMemo(
    () => getCategoryBadgeStyle(quote.category),
    [quote.category]
  );
  const categoryLabel = quoteCategories.find((c) => c.id === quote.category)?.label || quote.category;

  return (
    <div className="quote-card">
      <div className="quote-card-content">
        <svg
          className="quote-icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M10 8H6C5.46957 8 4.96086 8.21071 4.58579 8.58579C4.21071 8.96086 4 9.46957 4 10V14C4 14.5304 4.21071 15.0391 4.58579 15.4142C4.96086 15.7893 5.46957 16 6 16H8V18H6C4.89543 18 4 17.1046 4 16V10C4 9.46957 4.21071 8.96086 4.58579 8.58579C4.96086 8.21071 5.46957 8 6 8H10V8ZM18 8H14C13.4696 8 12.9609 8.21071 12.5858 8.58579C12.2107 8.96086 12 9.46957 12 10V14C12 14.5304 12.2107 15.0391 12.5858 15.4142C12.9609 15.7893 13.4696 16 14 16H16V18H14C12.8954 18 12 17.1046 12 16V10C12 9.46957 12.2107 8.96086 12.5858 8.58579C12.9609 8.21071 13.4696 8 14 8H18V8Z"
            fill="currentColor"
          />
        </svg>
        <p className="quote-text">{quote.text}</p>
      </div>
      <div className="quote-card-footer">
        <span className="quote-author">— {quote.author}</span>
        <span
          className="badge"
          style={{
            backgroundColor: categoryStyle.backgroundColor,
            color: categoryStyle.color,
            borderColor: categoryStyle.borderColor,
          }}
        >
          {categoryLabel}
        </span>
      </div>
    </div>
  );
}
