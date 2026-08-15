"use client"

import { useMemo, useState } from "react"
import { Eye, Download, X, FileText, Inbox } from "lucide-react"
import styles from "./Notes.module.css"
import { REGIONS, groupBySubject, type NoteItem } from "@/lib/notes"
import { TYPE_COLORS, SUBJECT_TYPE } from "@/lib/pokedex"
import { useReveal } from "@/lib/useReveal"
import { useGameSound } from "@/components/SoundProvider"

function PdfModal({ note, onClose }: { note: NoteItem; onClose: () => void }) {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHead}>
          <span>{note.title}</span>
          <button className={styles.modalClose} onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>
        </div>
        <div className={styles.modalBody}>
          <iframe src={note.file} title={note.title} />
        </div>
      </div>
    </div>
  )
}

function NoteCard({ note, onView }: { note: NoteItem; onView: (n: NoteItem) => void }) {
  const { playClick } = useGameSound()

  return (
    <div className={styles.card}>
      <FileText size={22} />
      <span className={styles.cardTitle}>{note.title}</span>
      {note.desc && <span className={styles.cardDesc}>{note.desc}</span>}
      <div className={styles.cardActions}>
        <button
          className={`${styles.pillBtn} ${styles.pillBtnPrimary}`}
          onClick={() => { onView(note); playClick() }}
        >
          <Eye size={12} /> View
        </button>
        <a href={note.file} download className={styles.pillBtn} onClick={playClick}>
          <Download size={12} /> Save
        </a>
      </div>
    </div>
  )
}

function SubjectSection({
  subject,
  notes,
  onView
}: {
  subject: string
  notes: NoteItem[]
  onView: (n: NoteItem) => void
}) {
  const type = SUBJECT_TYPE[subject] || "normal"

  return (
    <div className={styles.subject}>
      <div className={styles.subjectHead}>
        <span className={styles.subjectIcon} style={{ background: TYPE_COLORS[type] }}>
          <FileText size={16} />
        </span>
        <h2 className={styles.subjectName}>{subject}</h2>
        <span className={styles.subjectCount}>
          {notes.length} {notes.length === 1 ? "item" : "items"}
        </span>
      </div>
      <div className={styles.grid}>
        {notes.map(note => (
          <NoteCard key={note.id} note={note} onView={onView} />
        ))}
      </div>
    </div>
  )
}

export default function NotesClient() {
  const [activeRegion, setActiveRegion] = useState(REGIONS[0].key)
  const [openNote, setOpenNote] = useState<NoteItem | null>(null)
  const ref = useReveal<HTMLDivElement>()
  const { playSelect } = useGameSound()

  const region = REGIONS.find(r => r.key === activeRegion) || REGIONS[0]
  const grouped = useMemo(() => groupBySubject(region.notes), [region])

  return (
    <main className="page-wrapper" ref={ref}>
      <section className={styles.hero}>
        <div className="container">
          <p className="label-tag anim-up">Item Bag</p>
          <h1 className={`section-heading ${styles.heroTitle}`}>
            Notes and <em>Study Material</em>
          </h1>
          <p className={styles.heroSub}>
            PDF notes organized by region and route. View online or save to your device before
            your next battle with the exam.
          </p>
        </div>
      </section>

      <div className={styles.tabsBar}>
        <div className="container">
          <div className={styles.tabsInner} role="tablist" aria-label="Select region">
            {REGIONS.map(r => (
              <button
                key={r.key}
                role="tab"
                aria-selected={activeRegion === r.key}
                className={`${styles.tabBtn} ${activeRegion === r.key ? styles.tabBtnActive : ""}`}
                onClick={() => { setActiveRegion(r.key); playSelect() }}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="section-pad">
        <div className="container">
          {Object.keys(grouped).length === 0 ? (
            <div className={styles.empty}>
              <Inbox size={28} />
              <p>No notes added for this region yet</p>
            </div>
          ) : (
            Object.entries(grouped).map(([subject, notes]) => (
              <SubjectSection key={subject} subject={subject} notes={notes} onView={setOpenNote} />
            ))
          )}
        </div>
      </section>

      {openNote && <PdfModal note={openNote} onClose={() => setOpenNote(null)} />}
    </main>
  )
}
