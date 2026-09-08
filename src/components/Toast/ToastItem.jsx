import { useState, useEffect } from "react";
import Icon from "../Icon/Icon";
import "./Toast.css";

export default function ToastItem({ message, type = "info", duration = 3000, onClose, action }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 10);
    const hideTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onClose?.(), 300);
    }, duration);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [duration, onClose]);

  const icons = {
    success: "CheckCircle",
    error: "XCircle",
    warning: "AlertCircle",
    info: "Info",
  };

  return (
    <div className={`toast toast-${type} ${visible ? "toast-visible" : ""}`}>
      <span className="toast-icon">
        <Icon name={icons[type]} size={18} />
      </span>
      <span className="toast-message">{message}</span>
      {action && (
        <button type="button" className="toast-action" onClick={action.onClick}>
          {action.label}
        </button>
      )}
      <button
        type="button"
        className="toast-close"
        onClick={() => {
          setVisible(false);
          setTimeout(() => onClose?.(), 300);
        }}
        aria-label="Dismiss"
      >
        <Icon name="X" size={14} />
      </button>
    </div>
  );
}