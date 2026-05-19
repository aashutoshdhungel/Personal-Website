import { useState, useEffect, useCallback, useMemo } from 'react'
import SEO from '../components/SEO.jsx'
import { useReveal } from '../hooks/useReveal.js'
import './Notes.css'

const NOTES = {
    'Grade 11': [
        {
            id: 'g11-phys-ch1',
            subject: 'Physics',
            title: 'Chapter 1: Kinematics',
            file: '/notes/grade_11/physics/chapter-1-kinematics.pdf',
            desc: 'Displacement, velocity, acceleration and equations of motion',
        },
        {
            id: 'g11-chem-ch1',
            subject: 'Chemistry',
            title: 'Chapter 1: Atomic Structure',
            file: '/notes/grade_11/chemistry/chapter-1-atomic-structure.pdf',
            desc: 'Bohr model, quantum numbers and electron configuration',
        },
        {
            id: 'g11-math-ch1',
            subject: 'Mathematics',
            title: 'Chapter 1: Sets and Functions',
            file: '/notes/grade_11/mathematics/chapter-1-sets-functions.pdf',
            desc: 'Set theory, relations and types of functions',
        },
        {
            id: 'g11-eng-ch1',
            subject: 'English',
            title: 'Unit 1: Language and Communication',
            file: '/notes/grade_11/english/unit-1-communication.pdf',
            desc: 'Reading comprehension, critical thinking, and functional grammar.',
        },
        {
            id: 'g11-nep-ch1',
            subject: 'Nepali',
            title: 'एकाइ १: व्याकरण र रचना',
            file: '/notes/grade_11/nepali/unit-1-grammar.pdf',
            desc: 'शब्दवर्ग, रुपायन, र सिर्जनात्मक लेखन शैली।',
        },
        {
            id: 'g11-bot-brassicaceae',
            subject: 'Botany',
            title: 'Brassicaceae',
            file: '/notes/grade_11/botany/brassicaceae.pdf',
            desc: 'Detailed notes on the mustard family "Brassicaceae".',
        },
        {
            id: 'g11-bot-cell_biology',
            subject: 'Botany',
            title: 'Cell Biology',
            file: '/notes/grade_11/botany/cell_biology.pdf',
            desc: 'Detailed notes on cell structure and function.',
        },
        {
            id: 'g11-zoo-ch1',
            subject: 'Zoology',
            title: 'Chapter 1: Animal Tissues',
            file: '/notes/grade_11/zoology/chapter-1-animal-tissues.pdf',
            desc: 'Epithelial, connective, muscular, and nervous tissue types.',
        },
    ],
    'Grade 12': [
        {
            id: 'g12-phys-ch1',
            subject: 'Physics',
            title: 'Chapter 1: Electrostatics',
            file: '/notes/grade_12/physics/chapter-1-electrostatics.pdf',
            desc: "Coulomb's law, electric field and potential",
        },
        {
            id: 'g12-chem-ch1',
            subject: 'Chemistry',
            title: 'Chapter 1: Electrochemistry',
            file: '/notes/grade_12/chemistry/chapter-1-electrochemistry.pdf',
            desc: 'Galvanic cells, electrolysis and Nernst equation',
        },
        {
            id: 'g12-math-ch1',
            subject: 'Mathematics',
            title: 'Chapter 1: Sets and Functions',
            file: '/notes/grade_12/mathematics/chapter-1-sets-functions.pdf',
            desc: 'Set theory, relations and types of functions',
        },
        {
            id: 'g12-eng-ch1',
            subject: 'English',
            title: 'Unit 1: Literature Section',
            file: '/notes/grade_12/english/unit-1-literature.pdf',
            desc: 'Analysis of prescribed short stories, poems, and essays.',
        },
        {
            id: 'g12-nep-ch1',
            subject: 'Nepali',
            title: 'एकाइ १: नेपाली साहित्य',
            file: '/notes/grade_12/nepali/unit-1-literature.pdf',
            desc: 'निर्धारित कविता, कथा र निबन्धहरूको मूलभाव विश्लेषण।',
        },
        {
            id: 'g12-bot-ch1',
            subject: 'Botany',
            title: 'Chapter 1: Plant Physiology',
            file: '/notes/grade_12/botany/chapter-1-plant-physiology.pdf',
            desc: 'Photosynthesis, respiration, transpiration, and plant hormones.',
        },
        {
            id: 'g12-zoo-ch1',
            subject: 'Zoology',
            title: 'Chapter 1: Human Systems',
            file: '/notes/grade_12/zoology/chapter-1-human-systems.pdf',
            desc: 'Detailed study of digestive, respiratory, and circulatory systems.',
        },
    ],
    'MBBS': [
        {
            id: 'grays-anatomy-5th-edition',
            subject: 'Anatomy',
            title: "Gray's Anatomy-5th Edition-2024",
            file: '/notes/mbbs/anatomy/grays-anatomy-for-students-5th-edition.pdf',
            desc: 'Comprehensive anatomy textbook covering all body systems with detailed illustrations.',
        },
    ],
}

const SUBJECT_ICONS = {
    Botany: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22V12" />
            <path d="M12 12c2.5-3.5 6-3.5 6-7.5s-3.5-3.5-6 0c-2.5-3.5-6-3.5-6 7.5s3.5 4 6 0z" />
            <path d="M12 14c-1.5 1-3.5 1-4.5 2.5S7 20 8.5 20.5s3-1 3.5-2.5" />
            <path d="M12 16c1.5 1 3.5 1 4.5 2.5s.5 3.5-1 4s-3-1-3.5-2.5" />
        </svg>
    ),
    Zoology: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 3h4v4h-4z" />
            <path d="M12 7v7M7 14h10v5a2 2 0 01-2 2H9a2 2 0 01-2-2v-5z" />
            <path d="M19 10a2 2 0 00-2-2h-1M5 10a2 2 0 012-2h1" />
            <circle cx="9.5" cy="17.5" r=".5" fill="currentColor" />
            <circle cx="14.5" cy="17.5" r=".5" fill="currentColor" />
        </svg>
    ),
    Chemistry: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 3h6v5l3 9a2 2 0 01-1.9 2.7H7.9A2 2 0 016 17l3-9V3z" />
            <path d="M6 3h12" />
        </svg>
    ),
    Physics: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <ellipse cx="12" cy="12" rx="11" ry="4.5" />
            <ellipse cx="12" cy="12" rx="11" ry="4.5" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="11" ry="4.5" transform="rotate(120 12 12)" />
        </svg>
    ),
    Mathematics: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="5" x2="5" y2="19" />
            <circle cx="6.5" cy="6.5" r="2.5" />
            <circle cx="17.5" cy="17.5" r="2.5" />
        </svg>
    ),
    English: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            <path d="M8 6h8M8 10h8M8 14h5" />
        </svg>
    ),
    Nepali: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 2v20" />
            <path d="M4 2l14 7-10 2 12 9H4" />
        </svg>
    ),
    Anatomy: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="5" r="3" />
            <path d="M12 8v7" />
            <path d="M6 10h12" />
            <path d="M9 15v6" />
            <path d="M15 15v6" />
        </svg>
    ),
    Default: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <polyline points="14 2 14 8 20 8" />
        </svg>
    ),
}

function PdfFileIcon() {
    return (
        <svg className="notes-card__icon" viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="48" rx="6" fill="var(--teal-mid)" />
            <path d="M8 2h18l12 12v32a2 2 0 01-2 2H8a2 2 0 01-2-2V4a2 2 0 012-2z" fill="none" stroke="var(--teal)" strokeWidth="1.5" />
            <path d="M26 2v12h12" stroke="var(--teal)" strokeWidth="1.5" strokeLinejoin="round" />
            <rect x="8" y="26" width="24" height="12" rx="2" fill="var(--teal)" />
            <text x="20" y="35" textAnchor="middle" fill="white" fontSize="7" fontFamily="var(--font-mono)" fontWeight="600" letterSpacing="0.5">
                PDF
            </text>
        </svg>
    )
}

function ViewIcon() {
    return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    )
}

function DownloadIcon() {
    return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
    )
}

function CloseIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    )
}

function EmptyIcon() {
    return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--ink-4)' }}>
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="9" y1="13" x2="15" y2="13" />
            <line x1="9" y1="17" x2="13" y2="17" />
        </svg>
    )
}

function ErrorIcon() {
    return (
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <circle cx="12" cy="16" r="1" fill="currentColor" />
        </svg>
    )
}

function groupBySubject(notes) {
    return notes.reduce((acc, note) => {
        if (!acc[note.subject]) acc[note.subject] = []
        acc[note.subject].push(note)
        return acc
    }, {})
}

async function checkPdfExists(file) {
    try {
        const response = await fetch(file, { method: 'HEAD', cache: 'no-cache' })
        const type = response.headers.get('content-type') || ''
        return response.ok && type.includes('pdf')
    } catch {
        return false
    }
}

function PdfModal({ note, onClose }) {
    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)

    useEffect(() => {
        const onKey = e => { if (e.key === 'Escape') onClose() }
        document.addEventListener('keydown', onKey)
        document.body.style.overflow = 'hidden'
        return () => {
            document.removeEventListener('keydown', onKey)
            document.body.style.overflow = ''
        }
    }, [onClose])

    useEffect(() => {
        let active = true

        async function validate() {
            setLoading(true)
            setFailed(false)
            const exists = await checkPdfExists(note.file)
            if (!active) return
            if (!exists) setFailed(true)
            setLoading(false)
        }

        validate()
        return () => { active = false }
    }, [note.file])

    return (
        <div
            className="notes-modal-backdrop"
            onClick={e => { if (e.target === e.currentTarget) onClose() }}
        >
            <div className="notes-modal" role="dialog" aria-modal="true" aria-label={note.title}>
                <div className="notes-modal__header">
                    <PdfFileIcon />

                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="notes-modal__title">{note.title}</div>
                        <div className="notes-modal__subtitle">{note.subject}</div>
                    </div>

                    <div className="notes-modal__actions">
                        {!failed && (
                            <a
                                href={note.file}
                                download
                                className="notes-btn notes-btn--primary"
                                style={{ flex: 'none' }}
                                aria-label="Download PDF"
                            >
                                <DownloadIcon />
                                Download
                            </a>
                        )}

                        <button className="notes-modal__close" onClick={onClose} aria-label="Close viewer">
                            <CloseIcon />
                        </button>
                    </div>
                </div>

                <div className="notes-modal__body">
                    {loading ? (
                        <div className="notes-error-state">
                            <p>Loading file</p>
                        </div>
                    ) : failed ? (
                        <div className="notes-error-state">
                            <ErrorIcon />
                            <h3>File not found</h3>
                            <p>This PDF is missing or unavailable</p>
                        </div>
                    ) : (
                        <iframe
                            src={`${note.file}#toolbar=1&navpanes=0`}
                            title={note.title}
                            aria-label={note.title}
                            onError={() => setFailed(true)}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

function NoteCard({ note, onView }) {
    const [checking, setChecking] = useState(false)

    const handleView = async () => {
        if (checking) return
        setChecking(true)
        const exists = await checkPdfExists(note.file)
        setChecking(false)
        onView(exists ? note : { ...note, missing: true })
    }

    const handleDownload = async e => {
        e.preventDefault()
        if (checking) return
        setChecking(true)
        const exists = await checkPdfExists(note.file)
        setChecking(false)
        if (!exists) {
            alert('PDF file not found')
            return
        }
        window.open(note.file, '_blank')
    }

    return (
        <div className="notes-card">
            <PdfFileIcon />

            <div className="notes-card__title">{note.title}</div>

            {note.desc && (
                <div className="notes-card__desc">{note.desc}</div>
            )}

            <div className="notes-card__actions">
                <button
                    className="notes-btn notes-btn--primary"
                    onClick={handleView}
                    disabled={checking}
                >
                    <ViewIcon />
                    {checking ? 'Checking' : 'View'}
                </button>

                <a
                    href={note.file}
                    onClick={handleDownload}
                    className="notes-btn"
                    aria-label="Download"
                >
                    <DownloadIcon />
                    Save
                </a>
            </div>
        </div>
    )
}

function SubjectSection({ subject, notes, onView }) {
    const Icon = SUBJECT_ICONS[subject] || SUBJECT_ICONS.Default

    return (
        <div className="notes-subject">
            <div className="notes-subject-head">
                <div className="notes-subject-icon">{Icon}</div>

                <h2 className="notes-subject-name">{subject}</h2>

                <span className="notes-subject-count">
                    {notes.length} {notes.length === 1 ? 'file' : 'files'}
                </span>
            </div>

            <div className="notes-grid">
                {notes.map(note => (
                    <NoteCard key={note.id} note={note} onView={onView} />
                ))}
            </div>
        </div>
    )
}

export default function Notes() {
    const grades = useMemo(() => Object.keys(NOTES), [])

    const [activeGrade, setActiveGrade] = useState(grades[0])
    const [openNote, setOpenNote] = useState(null)

    const ref = useReveal()

    const handleView = useCallback(note => setOpenNote(note), [])
    const handleClose = useCallback(() => setOpenNote(null), [])

    const grouped = useMemo(() => {
        const gradeNotes = NOTES[activeGrade] || []
        return groupBySubject(gradeNotes)
    }, [activeGrade])

    return (
        <main className="page-wrapper" ref={ref}>
            <SEO
                title="Notes"
                description="Study notes for Grade 11 and Grade 12 subjects including Botany Zoology Chemistry Physics Mathematics English and Nepali"
            />

            <section className="notes-hero">
                <div className="container">
                    <p className="label-tag anim-up">Study Resources</p>

                    <h1 className="section-heading notes-hero__title anim-up anim-up-1">
                        Notes and <em>Study Material</em>
                    </h1>

                    <p className="notes-hero__sub anim-up anim-up-2">
                         PDF notes organized by grade and subject. View online or download to your device.
                    </p>
                </div>
            </section>

            <div className="notes-tabs-bar">
                <div className="container">
                    <div className="notes-tabs-inner" role="tablist" aria-label="Select grade">
                        {grades.map(grade => (
                            <button
                                key={grade}
                                id={`tab-${grade.replace(/\s+/g, '-').toLowerCase()}`}
                                role="tab"
                                aria-selected={activeGrade === grade}
                                aria-controls={`panel-${grade.replace(/\s+/g, '-').toLowerCase()}`}
                                className={`notes-tab-btn ${activeGrade === grade ? 'notes-tab-btn--active' : ''}`}
                                onClick={() => setActiveGrade(grade)}
                            >
                                {grade}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <section
                className="notes-body"
                id={`panel-${activeGrade.replace(/\s+/g, '-').toLowerCase()}`}
                role="tabpanel"
                aria-labelledby={`tab-${activeGrade.replace(/\s+/g, '-').toLowerCase()}`}
            >
                <div className="container">
                    {Object.keys(grouped).length === 0 ? (
                        <div className="notes-empty">
                            <EmptyIcon />
                            <p>No notes added for {activeGrade} yet</p>
                        </div>
                    ) : (
                        Object.entries(grouped).map(([subject, notes]) => (
                            <SubjectSection
                                key={subject}
                                subject={subject}
                                notes={notes}
                                onView={handleView}
                            />
                        ))
                    )}
                </div>
            </section>

            {openNote && (
                <PdfModal note={openNote} onClose={handleClose} />
            )}
        </main>
    )
}