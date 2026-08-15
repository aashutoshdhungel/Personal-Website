import Link from "next/link"
import { Facebook, Linkedin, PenLine, ArrowUpRight } from "lucide-react"
import styles from "./Footer.module.css"
import TeamRocketBalloon from "./TeamRocketBalloon"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <TeamRocketBalloon />
      <div className="container">
        <div className={styles.main}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <span aria-hidden="true">{"\u{1FA84}"}</span>
              <span>Aashutosh Dhungel</span>
            </Link>
            <p className={styles.desc}>
              Medical aspirant and writer from Jhapa, Nepal. Leveling up toward MBBS while finding meaning in words.
            </p>
          </div>

          <div>
            <span className={styles.colLabel}>Navigate</span>
            <nav className={styles.links} aria-label="Footer navigation">
              <Link href="/">Home</Link>
              <Link href="/about">Trainer</Link>
              <Link href="/blog">Pokedex</Link>
              <Link href="/notes">Item Bag</Link>
              <Link href="/contact">PC</Link>
            </nav>
          </div>

          <div>
            <span className={styles.colLabel}>Connect</span>
            <div className={styles.socials}>
              <a
                href="https://www.facebook.com/dhungelaashutosh"
                target="_blank"
                rel="noreferrer"
                className={styles.socialLink}
              >
                <Facebook size={15} />
                <span>Facebook</span>
                <ArrowUpRight size={12} style={{ opacity: 0.6 }} />
              </a>
              <a
                href="https://www.linkedin.com/in/aashutosh-dhungel-01b5bb393/"
                target="_blank"
                rel="noreferrer"
                className={styles.socialLink}
              >
                <Linkedin size={15} />
                <span>LinkedIn</span>
                <ArrowUpRight size={12} style={{ opacity: 0.6 }} />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>Aashutosh Dhungel {new Date().getFullYear()}, all trainers reserved</span>
          <span>
            crafted by{" "}
            <a
              href="https://prasant-bhattarai.com.np"
              target="_blank"
              rel="noreferrer"
              className={styles.creditLink}
            >
              <PenLine size={13} />
              Prasant Bhattarai
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}