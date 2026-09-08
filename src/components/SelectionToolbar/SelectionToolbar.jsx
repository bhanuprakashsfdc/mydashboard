import Button from "../ui/Button";
import "./SelectionToolbar.css";

export default function SelectionToolbar({ selectedCount, onClear }) {
  if (selectedCount === 0) return null;

  return (
    <div className="selection-toolbar" role="status" aria-live="polite">
      <span className="selection-toolbar-count">
        {selectedCount} selected
      </span>
      <Button variant="ghost" size="sm" onClick={onClear}>
        Clear
      </Button>
    </div>
  );
}
