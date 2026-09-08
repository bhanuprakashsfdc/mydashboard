import { useState, useRef, useEffect, ReactNode } from "react";
import Icon from "../Icon/Icon";
import "./Tooltip.css";

export default function Tooltip({
  children,
  content,
  placement = "top",
  delay = 200,
  disabled = false,
}) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const timeoutRef = useRef(null);

  const show = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (triggerRef.current && tooltipRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        const tipRect = tooltipRef.current.getBoundingClientRect();
        let x = 0, y = 0;
        switch (placement) {
          case "top":
            x = rect.left + rect.width / 2 - tipRect.width / 2;
            y = rect.top - tipRect.height - 8;
            break;
          case "bottom":
            x = rect.left + rect.width / 2 - tipRect.width / 2;
            y = rect.bottom + 8;
            break;
          case "left":
            x = rect.left - tipRect.width - 8;
            y = rect.top + rect.height / 2 - tipRect.height / 2;
            break;
          case "right":
            x = rect.right + 8;
            y = rect.top + rect.height / 2 - tipRect.height / 2;
            break;
        }
        setCoords({ x, y });
      }
      setVisible(true);
    }, delay);
  };

  const hide = () => {
    clearTimeout(timeoutRef.current);
    setVisible(false);
  };

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  if (disabled) return <>{children}</>;

  return (
    <span
      ref={triggerRef}
      className="tooltip-trigger"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {visible && (
        <span
          ref={tooltipRef}
          className={`tooltip tooltip-${placement}`}
          style={{ left: coords.x, top: coords.y }}
          role="tooltip"
        >
          {content}
        </span>
      )}
    </span>
  );
}