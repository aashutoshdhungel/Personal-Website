import Link from "next/link"
import Image from "next/image"
import { Facebook, Linkedin, Code, ArrowUpRight } from "lucide-react"
import styles from "./Footer.module.css"
import WhosThatPokemon from "./WhosThatPokemon"

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Trainer" },
  { href: "/blog", label: "Pokedex" },
  { href: "/notes", label: "Item Bag" },
  { href: "/contact", label: "PC" },
]

const SOCIAL_LINKS = [
  {
    href: "https://www.facebook.com/dhungelaashutosh",
    label: "Facebook",
    icon: Facebook,
  },
  {
    href: "https://www.linkedin.com/in/aashutosh-dhungel-01b5bb393/",
    label: "LinkedIn",
    icon: Linkedin,
  },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.balloonWrapper}>
        <Image
          src="/rocket.png"
          alt="Team Rocket Meowth Balloon"
          width={120}
          height={120}
          className={styles.balloonImage}
          priority
        />
      </div>
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
            <h3 className={styles.colLabel}>Navigate</h3>
            <nav className={styles.links} aria-label="Footer navigation">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className={styles.colLabel}>Connect</h3>
            <div className={styles.socials}>
              {SOCIAL_LINKS.map((social) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    <IconComponent size={15} aria-hidden="true" />
                    <span>{social.label}</span>
                    <ArrowUpRight size={12} className={styles.externalIcon} aria-hidden="true" />
                    <span className={styles.srOnly}>(opens in a new tab)</span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        <WhosThatPokemon />

        <div className={styles.bottom}>
          <span>
            © {currentYear} Aashutosh Dhungel, all trainers reserved
          </span>
          <span>
            crafted by{" "}
            <a
              href="https://prasant-bhattarai.com.np"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.creditLink}
            >
              <Code size={13} aria-hidden="true" />
              <span>Prasant Bhattarai</span>
              <span className={styles.srOnly}>(opens in a new tab)</span>
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}