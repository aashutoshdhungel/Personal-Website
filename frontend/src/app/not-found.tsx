import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function NotFound() {
  return (
    <main className="page-wrapper" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "80vh" }}>
      <div style={{ textAlign: "center", padding: "0 20px" }}>
        <span
          aria-hidden="true"
          style={{
            display: "block",
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(3rem, 12vw, 7rem)",
            color: "var(--accent)",
            marginBottom: "12px"
          }}
        >
          404
        </span>
        <h1 className="section-heading" style={{ marginBottom: "12px" }}>
          A Wild Error Appeared
        </h1>
        <p style={{ color: "var(--ink-2)", fontSize: "17px", marginBottom: "24px" }}>
          This route fled before you could catch it. It might have been moved, renamed, or never
          existed at all.
        </p>
        <Link href="/" className="btn btn-primary">
          Return Home <ArrowRight size={15} />
        </Link>
      </div>
    </main>
  )
}
