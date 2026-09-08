import { useState, useRef, useEffect } from "react";
import Input from "../ui/Input";
import Icon from "../Icon/Icon";

export default function SearchBar({ value, onChange, placeholder = "Search accounts..." }) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (focused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focused]);

  return (
    <div className={`search-bar ${focused ? "search-bar-focused" : ""}`}>
      <span className="search-bar-icon">
        <Icon name="Search" size={16} />
      </span>
      <Input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {value && (
        <button
          type="button"
          className="search-bar-clear"
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          <Icon name="X" size={14} />
        </button>
      )}
    </div>
  );
}