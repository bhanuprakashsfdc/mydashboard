import "./Avatar.css";

export default function Avatar({
  name = "User",
  src,
  size = "md",
  status,
  ...props
}) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const sizeClass = `avatar-${size}`;

  return (
    <div className={`avatar ${sizeClass}`} title={name} {...props}>
      {src ? (
        <img src={src} alt={name} className="avatar-image" />
      ) : (
        <span className="avatar-initials">{initials}</span>
      )}
      {status && <span className={`avatar-status avatar-status-${status}`} />}
    </div>
  );
}