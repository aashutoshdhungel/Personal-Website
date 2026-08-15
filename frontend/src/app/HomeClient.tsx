"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Lock } from "lucide-react"
import styles from "./Home.module.css"
import { useTypingEffect } from "@/lib/useTypingEffect"
import { useReveal } from "@/lib/useReveal"
import { getAllBlogs } from "@/lib/blogs"
import PokemonCard from "@/components/PokemonCard"
import TypeBadge from "@/components/TypeBadge"
import { officialArtUrl, ROSTER, TYPE_COLORS, type ElementType } from "@/lib/pokedex"

const stats = [
  { value: "MBBS", label: "Goal" },
  { value: "2+", label: "Years Writing" },
  { value: "Nepal", label: "Home Region" }
]

const commands = [
  { label: "FIGHT", sub: "Profile", href: "/about", variant: "fight" },
  { label: "BAG", sub: "Pokedex", href: "/blog", variant: "bag" },
  { label: "POKEMON", sub: "Notes", href: "/notes", variant: "pokemon" },
  { label: "RUN", sub: "Contact", href: "/contact", variant: "run" }
] as const

type ActiveSlot = {
  locked: false
  slot: string
  title: string
  desc: string
  pokemonId: number
  type: ElementType
  level: number
  exp: number
  moves: readonly string[]
}

type LockedSlot = {
  locked: true
  slot: string
  hint: string
}

const party: readonly (ActiveSlot | LockedSlot)[] = [
  {
    locked: false,
    slot: "Slot 01",
    title: "Medicine",
    desc: "Passionate about human anatomy, clinical sciences, and the art of healing.",
    pokemonId: ROSTER.chikorita,
    type: "water",
    level: 42,
    exp: 68,
    moves: ["Diagnose", "Steady Hands", "Bedside Manner"]
  },
  {
    locked: false,
    slot: "Slot 02",
    title: "Poetry",
    desc: "Writing verses that capture the human condition and the beauty of existence.",
    pokemonId: ROSTER.clefairy,
    type: "fairy",
    level: 37,
    exp: 54,
    moves: ["Verse Craft", "Metaphor Storm", "Midnight Ink"]
  },
  {
    locked: false,
    slot: "Slot 03",
    title: "Stories",
    desc: "Crafting narratives that blend imagination with lived experience.",
    pokemonId: ROSTER.eevee,
    type: "psychic",
    level: 33,
    exp: 47,
    moves: ["Plot Twist", "World Build", "Character Study"]
  },
  {
    locked: false,
    slot: "Slot 04",
    title: "Biology",
    desc: "Fascinated by life at the molecular and cellular level.",
    pokemonId: ROSTER.bulbasaur,
    type: "grass",
    level: 45,
    exp: 72,
    moves: ["Cell Study", "Field Notes", "Dissection"]
  },
  {
    locked: true,
    slot: "Slot 05",
    hint: "New skill hatching soon"
  },
  {
    locked: true,
    slot: "Slot 06",
    hint: "Reserved for a future quest"
  }
]

export default function HomeClient() {
  const sectionRef = useReveal<HTMLDivElement>()
  const typingText = useTypingEffect(["Aspiring Doctor.", "A Poet By Heart."])
  const featuredPosts = getAllBlogs().slice(0, 3)

  return (
    <main className="page-wrapper" ref={sectionRef}>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.screenBezel}>
            <div className={styles.bezelDots} aria-hidden="true">
              <span />
              <span />
            </div>

            <div className={styles.heroGrid}>
              <div className={styles.dialogueCol}>
                <div className={styles.speechBox}>
                  <p className={styles.speechText}>
                    A wild <strong>AASHUTOSH</strong> appeared. He wants to join your team as a
                    Medical Aspirant &amp; Poet.
                  </p>
                  <span className={styles.speechArrow} aria-hidden="true" />
                </div>

                <div className={styles.nameplate}>
                  <div className={styles.typing}>{typingText}</div>
                  <h1 className={styles.title}>
                    Aashutosh
                    <br />
                    <em>Dhungel</em>
                  </h1>
                  <p className={styles.subtitle}>
                    A medical enthusiast, poet, and story writer from Jhapa, Nepal. Preparing for
                    MBBS while finding meaning in words, one Pokedex entry at a time.
                  </p>
                </div>

                <div className={styles.commandBox} role="group" aria-label="Quick navigation">
                  {commands.map(cmd => (
                    <Link
                      key={cmd.label}
                      href={cmd.href}
                      className={`${styles.commandBtn} ${styles[`cmd_${cmd.variant}`]}`}
                    >
                      <span className={styles.commandLabel}>{cmd.label}</span>
                      <span className={styles.commandSub}>{cmd.sub}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className={styles.trainerCard}>
                <div className={styles.trainerCardHead}>
                  <span className={styles.trainerBadge}>LV. 99</span>
                  <span className={styles.trainerClass}>Pre-Med</span>
                </div>

                <div className={styles.photoFrame}>
                  <Image
                    src="/pfp.jpeg"
                    alt="Aashutosh Dhungel, medical aspirant and writer"
                    width={260}
                    height={260}
                    priority
                  />
                </div>

                <div className={styles.trainerName}>Aashutosh Dhungel</div>
                <div className={styles.trainerSub}>Medical Aspirant, Jhapa, Nepal</div>

                <div className={styles.hpRow}>
                  <span className={styles.hpLabel}>HP</span>
                  <div className={styles.hpTrack}>
                    <div className={styles.hpFill} />
                  </div>
                  <span className={styles.hpValue}>100/100</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.hud}>
            {stats.map(s => (
              <div key={s.label} className={styles.hudChip}>
                <span className={styles.hudValue}>{s.value}</span>
                <span className={styles.hudLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container">
          <div className={styles.partyHeader}>
            <p className="label-tag reveal">Starter Party</p>
            <h2 className="section-heading reveal reveal-d1">Party Summary Screen</h2>
            <p className={`${styles.partyDesc} reveal reveal-d2`}>
              Between textbooks and the stethoscope, there is a world of stories waiting to be
              told. Four active party members, two slots still training.
            </p>
          </div>

          <div className={styles.partyGrid}>
            {party.map((item, i) =>
              item.locked ? (
                <div
                  key={item.slot}
                  className={`${styles.partySlot} ${styles.partySlotLocked} reveal`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <Lock size={20} />
                  <span className={styles.lockedLabel}>Empty Slot</span>
                  <span className={styles.lockedSub}>{item.hint}</span>
                </div>
              ) : (
                <div
                  key={item.slot}
                  className={`${styles.partySlot} reveal`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className={styles.partySlotTop}>
                    <span className={styles.slotIndex}>{item.slot}</span>
                    <TypeBadge type={item.type} />
                  </div>

                  <Image
                    src={officialArtUrl(item.pokemonId)}
                    alt=""
                    width={64}
                    height={64}
                    className={styles.partySprite}
                    unoptimized
                  />

                  <h3 className={styles.partyName}>{item.title}</h3>
                  <p className={styles.partyText}>{item.desc}</p>

                  <div className={styles.levelRow}>
                    <span className={styles.levelValue}>Lv {item.level}</span>
                    <div className={styles.expTrack}>
                      <div
                        className={styles.expFill}
                        style={{ width: `${item.exp}%`, background: TYPE_COLORS[item.type] }}
                      />
                    </div>
                  </div>

                  <div className={styles.moveset}>
                    {item.moves.map(move => (
                      <span key={move} className={styles.moveChip}>
                        {move}
                      </span>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container">
          <div className={styles.postsHeader}>
            <div>
              <p className="label-tag reveal">Recently Caught</p>
              <h2 className="section-heading reveal reveal-d1">Featured Pokedex Entries</h2>
            </div>
            <Link href="/blog" className="btn btn-ghost">
              View All Entries <ArrowRight size={15} />
            </Link>
          </div>

          <div className={styles.postsFrame}>
            <div className={styles.postsFrameBar}>
              <span className={styles.postsFrameDot} aria-hidden="true" />
              <span>Entry Log</span>
            </div>
            <div className={styles.postsGrid}>
              {featuredPosts.map(post => (
                <PokemonCard key={post.slug} post={post} />
              ))}
            </div>
          </div>

          <div className={styles.postsFooter}>
            <Link href="/blog" className="btn btn-primary">
              Explore Full Pokedex <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}