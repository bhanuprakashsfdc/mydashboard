import "./ExternalLink.css";

export default function ExternalLink({ href, children, title }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="external-link"
      title={title || href}
    >
      {children || "Open"}
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M4.5 2.5H9.5V7.5H8V3.707L2.354 9.354 1.646 8.646 7.293 3H4.5V2.5Z"
          fill="currentColor"
        />
        <path
          d="M1.5 2.5H7.5"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    </a>
  );
}
