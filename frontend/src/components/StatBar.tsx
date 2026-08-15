"use client"

import { motion } from "framer-motion"
import { TYPE_COLORS, type ElementType } from "@/lib/pokedex"

type Props = {
  label: string
  value: number
  type: ElementType
}

export default function StatBar({ label, value, type }: Props) {
  return (
    <div className="stat-item">
      <div className="stat-item__row">
        <span className="stat-item__name">{label}</span>
        <span className="stat-item__pct">{value}</span>
      </div>
      <div className="stat-track">
        <motion.div
          className="stat-fill"
          style={{ background: TYPE_COLORS[type] }}
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: [0, 0, 0.2, 1] }}
        />
      </div>
    </div>
  )
}
