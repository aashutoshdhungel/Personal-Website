"use client"

import { useState } from "react"
import confetti from "canvas-confetti"
import { Phone, MapPin, Linkedin, Facebook, Heart, ArrowRight, CheckCircle2 } from "lucide-react"
import styles from "./Contact.module.css"
import { useReveal } from "@/lib/useReveal"
import { useGameSound } from "@/components/SoundProvider"

const info = [
  { Icon: Phone, label: "Phone", value: "+977 9705804558", href: "tel:+9779705804558" },
  { Icon: MapPin, label: "Location", value: "Arjundhara, Jhapa, Nepal", href: null },
  {
    Icon: Facebook,
    label: "Facebook",
    value: "facebook.com/dhungelaashutosh",
    href: "https://www.facebook.com/dhungelaashutosh"
  },
  {
    Icon: Linkedin,
    label: "LinkedIn",
    value: "aashutosh-dhungel",
    href: "https://www.linkedin.com/in/aashutosh-dhungel-01b5bb393/"
  }
]

type Status = "idle" | "sending" | "sent" | "error"

function fireConfetti() {
  confetti({
    particleCount: 90,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#d62d20", "#ffcb05", "#241a14", "#ffffff"]
  })
}

export default function ContactClient() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState<Status>("idle")
  const ref = useReveal<HTMLDivElement>()
  const { playSuccess, playClick } = useGameSound()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const isValid = form.name.trim() && form.email.trim() && form.message.trim()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return
    setStatus("sending")

    const fd = new FormData()
    fd.append("access_key", "59fd4889-92b9-4721-8bed-8b3e4467e2fa")
    fd.append("name", form.name)
    fd.append("email", form.email)
    fd.append("message", form.message)

    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd })
      const data = await res.json()
      if (data.success) {
        setStatus("sent")
        fireConfetti()
        playSuccess()
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  const handleReset = () => {
    setForm({ name: "", email: "", message: "" })
    setStatus("idle")
  }

  return (
    <main className="page-wrapper" ref={ref}>
      <section className={styles.hero}>
        <div className="container">
          <p className="label-tag anim-up">Pokemon Center</p>
          <h1 className={`section-heading ${styles.heroTitle}`}>Say Hello</h1>
          <p className={styles.heroSub}>
            Whether you want to talk about medicine, writing, or anything else, drop a message at
            the counter and Nurse Joy will pass it along.
          </p>
        </div>
      </section>

      <section className="section-pad" style={{ paddingTop: 0 }}>
        <div className={`container ${styles.grid}`}>
          <div className={styles.infoCard}>
            <div className={styles.infoHead}>Contact Details</div>
            <ul className={styles.infoList}>
              {info.map(item => (
                <li key={item.label} className={styles.infoItem}>
                  <span className={styles.infoIcon}>
                    <item.Icon size={16} />
                  </span>
                  <div>
                    <span className={styles.infoLabel}>{item.label}</span>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noreferrer" className={styles.infoValue}>
                        {item.value}
                      </a>
                    ) : (
                      <span className={styles.infoValue}>{item.value}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <div className={styles.note}>
              <Heart size={15} />
              <p>Based in the Terai of Nepal, passionate about medicine and writing.</p>
            </div>
          </div>

          <div className={styles.formWrap}>
            {status === "sent" ? (
              <div className={styles.success}>
                <CheckCircle2 size={48} className={styles.successIcon} />
                <h3>Message Sent</h3>
                <p>Thank you for reaching out. I will get back to you soon.</p>
                <button className="btn btn-ghost" onClick={() => { handleReset(); playClick() }}>
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 className={styles.formHeading}>Send a Message</h2>
                <div className={styles.row}>
                  <div className={styles.group}>
                    <label htmlFor="name">Your Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                      autoComplete="name"
                    />
                  </div>
                  <div className={styles.group}>
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="johndoe@gmail.com"
                      value={form.email}
                      onChange={handleChange}
                      autoComplete="email"
                    />
                  </div>
                </div>
                <div className={styles.group}>
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    maxLength={500}
                    required
                    rows={6}
                    placeholder="Write your message here, under 500 characters"
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className={`btn btn-primary ${styles.submit}`}
                  disabled={!isValid || status === "sending"}
                >
                  {status === "sending" ? "Sending" : <>Send Message <ArrowRight size={15} /></>}
                </button>
                {status === "error" && (
                  <p className={styles.error}>Something went wrong. Please try again.</p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
