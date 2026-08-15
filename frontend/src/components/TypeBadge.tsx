import { TYPE_COLORS, TYPE_LABELS, type ElementType } from "@/lib/pokedex"

export default function TypeBadge({ type }: { type: ElementType }) {
  return (
    <span
      className="type-badge"
      style={{ background: TYPE_COLORS[type] }}
    >
      {TYPE_LABELS[type]}
    </span>
  )
}
