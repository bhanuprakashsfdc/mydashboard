import "./Checkbox.css";

export default function Checkbox({
  id,
  checked,
  indeterminate = false,
  onChange,
  label,
  title,
}) {
  return (
    <label className="checkbox-wrapper" title={title}>
      <input
        id={id}
        type="checkbox"
        className="checkbox-input"
        checked={checked}
        ref={(el) => {
          if (el) el.indeterminate = indeterminate;
        }}
        onChange={onChange}
      />
      <span className="checkbox-visual" aria-hidden="true">
        {checked && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 6L5 8.5L9.5 3.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      {label && <span className="checkbox-label">{label}</span>}
    </label>
  );
}
