import "./Badge.css";

export default function Badge({ children, variant = "default", title }) {
  return (
    <span className={`badge badge-${variant}`} title={title}>
      {children}
    </span>
  );
}
