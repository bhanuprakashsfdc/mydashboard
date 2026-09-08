import { useState, useEffect } from "react";
import Icon from "../Icon/Icon";
import "./LiveTime.css";

export default function LiveTime() {
  const [now, setNow] = useState(new Date());
  const [format, setFormat] = useState(
    localStorage.getItem("timeFormat") || "24h"
  );
  const [showSeconds, setShowSeconds] = useState(
    localStorage.getItem("showSeconds") === "true"
  );

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleFormat = () => {
    const next = format === "24h" ? "12h" : "24h";
    setFormat(next);
    localStorage.setItem("timeFormat", next);
  };

  const toggleSeconds = () => {
    const next = !showSeconds;
    setShowSeconds(next);
    localStorage.setItem("showSeconds", String(next));
  };

  const formatTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let ampm = "";

    if (format === "12h") {
      ampm = hours >= 12 ? " PM" : " AM";
      hours = hours % 12;
      if (hours === 0) hours = 12;
    }

    const hh = String(hours).padStart(2, "0");
    const mm = String(minutes).padStart(2, "0");
    const ss = String(seconds).padStart(2, "0");

    return showSeconds ? `${hh}:${mm}:${ss}${ampm}` : `${hh}:${mm}${ampm}`;
  };

  const formatDate = (date) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
  };

  return (
    <div className="live-time" role="clock" aria-live="off">
      <div className="live-time-date">{formatDate(now)}</div>
      <div className="live-time-clock">{formatTime(now)}</div>
      <div className="live-time-controls">
        <button
          type="button"
          className="live-time-btn"
          onClick={toggleFormat}
          title={`Switch to ${format === "24h" ? "12h" : "24h"} format`}
          aria-label={`Time format: ${format}`}
        >
          <Icon name="Clock" size={14} />
          {format}
        </button>
        <button
          type="button"
          className="live-time-btn"
          onClick={toggleSeconds}
          title={showSeconds ? "Hide seconds" : "Show seconds"}
          aria-label={showSeconds ? "Seconds visible" : "Seconds hidden"}
        >
          <Icon name={showSeconds ? "Eye" : "EyeOff"} size={14} />
        </button>
      </div>
    </div>
  );
}