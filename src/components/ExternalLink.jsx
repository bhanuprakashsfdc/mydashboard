import Icon from "../Icon/Icon";
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
      <Icon name="ExternalLink" size={12} aria-hidden="true" />
    </a>
  );
}