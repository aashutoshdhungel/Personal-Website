"use client"

import { MapPin, Phone, Linkedin, Stethoscope, Heart, Award } from "lucide-react"
import styles from "./About.module.css"
import StatBar from "@/components/StatBar"
import { useReveal } from "@/lib/useReveal"
import type { ElementType } from "@/lib/pokedex"

const badges = [
  {
    year: "2082",
    title: "Terai Badge, Entrance Prep Begins",
    desc: "Started intensive study for MBBS entrance examinations, focusing on Biology, Chemistry, and Physics."
  },
  {
    year: "2081",
    title: "Verse Badge, Discovered Poetry",
    desc: "Found solace in verse during challenging times, beginning to write poems that explore emotion and nature."
  },
  {
    year: "2080",
    title: "Care Badge, Interest in Medicine",
    desc: "Witnessed local healthcare challenges and became deeply motivated to contribute as a future physician."
  }
]

const skills: { label: string; level: number; type: ElementType }[] = [
  { label: "Biology", level: 20, type: "grass" },
  { label: "Chemistry", level: 15, type: "poison" },
  { label: "Physics", level: 20, type: "electric" },
  { label: "Creative Writing", level: 75, type: "psychic" },
  { label: "Poetry", level: 70, type: "fairy" }
]

const infoItems = [
  { Icon: MapPin, label: "Location", value: "Arjundhara, Jhapa, Nepal", href: null },
  { Icon: Phone, label: "Phone", value: "+977 9705804558", href: "tel:+9779705804558" },
  {
    Icon: Linkedin,
    label: "LinkedIn",
    value: "aashutosh-dhungel",
    href: "https://www.linkedin.com/in/aashutosh-dhungel-01b5bb393/"
  },
  { Icon: Stethoscope, label: "Aim", value: "MBBS Doctor", href: null },
  { Icon: Heart, label: "Hobbies", value: "Poetry, Story Writing", href: null }
]

export default function AboutClient() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <main className="page-wrapper" ref={ref}>
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div>
            <p className="label-tag anim-up">Trainer Profile</p>
            <h1 className={`section-heading ${styles.heroTitle}`}>
              A Doctor in the Making,
              <br />
              <em>A Writer at Heart</em>
            </h1>
            <p className={styles.intro}>
              I am dancing between the shadows of childhood and the dawn of youth, caught in
              introspective musings. I explore what it means to be a scholar chasing excellence
              and, someday, a physician who earns the pride of those who shaped me. The name
              Aashutosh Dhungel is a work in progress, and every day adds a new line to that
              story, and a new entry to this Pokedex.
            </p>
          </div>

          <div className={styles.quoteCard}>
            <p className={styles.quote}>
              Medicine is the most humane of the arts, the most artistic of the sciences, and the
              most scientific of the humanities.
            </p>
            <p className={styles.quoteAttr}>Personal philosophy</p>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className={`container ${styles.layout}`}>
          <aside className={styles.card}>
            <div className={styles.cardHead}>Personal Details</div>
            <ul className={styles.infoList}>
              {infoItems.map(item => (
                <li key={item.label} className={styles.infoItem}>
                  <span className={styles.infoIcon}>
                    <item.Icon size={16} />
                  </span>
                  <div>
                    <span className={styles.infoKey}>{item.label}</span>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noreferrer" className={styles.infoVal}>
                        {item.value}
                      </a>
                    ) : (
                      <span className={styles.infoVal}>{item.value}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </aside>

          <div>
            <h2 className={styles.sectionTitle}>Move Set, Subject Proficiency</h2>
            <div className={styles.statList}>
              {skills.map(s => (
                <StatBar key={s.label} label={s.label} value={s.level} type={s.type} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.timelineSection}>
        <div className="container">
          <div className={styles.timelineHeader}>
            <p className="label-tag reveal">Gym Badges</p>
            <h2 className="section-heading reveal reveal-d1">Milestones So Far</h2>
          </div>
          <div className={styles.badgeGrid}>
            {badges.map((b, i) => (
              <div key={b.title} className={`${styles.badgeCard} reveal`} style={{ transitionDelay: `${i * 100}ms` }}>
                <div className={styles.badgeIcon}>
                  <Award size={26} />
                </div>
                <span className={styles.badgeYear}>{b.year} BS</span>
                <h3 className={styles.badgeTitle}>{b.title}</h3>
                <p className={styles.badgeDesc}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
