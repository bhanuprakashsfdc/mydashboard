import * as lucide from "lucide-react";

export default function Icon({
  name,
  size = 16,
  color = "currentColor",
  stroke = 1.5,
  "aria-hidden": ariaHidden = true,
  ...props
}) {
  const LucideIcon = lucide[name];
  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found in lucide-react`);
    return null;
  }
  return (
    <LucideIcon
      size={size}
      color={color}
      strokeWidth={stroke}
      aria-hidden={ariaHidden}
      {...props}
    />
  );
}