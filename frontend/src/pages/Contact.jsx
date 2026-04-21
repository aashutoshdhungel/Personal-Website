import { useState } from 'react'
import SEO from '../components/SEO.jsx'
import { IconPhone, IconMap, IconGithub, IconLinkedin, IconHeart, IconArrowRight } from '../components/Icons.jsx'
import './Contact.css'

const info = [
  { Icon: IconPhone, label: 'Phone', value: '+977 9800000000', href: 'tel:9800000000' },
  { Icon: IconMap, label: 'Location', value: 'Arjundhara, Jhapa, Nepal', href: null },
  { Icon: IconGithub, label: 'GitHub', value: 'github.com/aashutoshdhungel', href: 'https://github.com/aashutoshdhungel' },
  { Icon: IconLinkedin, label: 'LinkedIn', value: 'linkedin.com', href: 'https://www.linkedin.com/in/aashutosh-dhungel-01b5bb393/' },
]

const YOUR_EMAIL = 'aashutoshdhungel@example.com'

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const isValid = form.name.trim() && form.email.trim() && form.message.trim()

  const handleSubmit = () => {
    if (!isValid) return
    const subject = encodeURIComponent(`Message from ${form.name}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
    window.open(`mailto:${YOUR_EMAIL}?subject=${subject}&body=${body}`)
    setStatus('sent')
  }

  const handleReset = () => {
    setForm({ name: '', email: '', message: '' })
    setStatus('idle')
  }

  return (
    <main className="page-wrapper">
      <SEO
        title="Contact"
        description="Get in touch with Aashutosh Dhungel. Talk about medicine, writing, or anything else."
      />

      <section className="contact-hero">
        <div className="contact-hero__glow" />
        <div className="container">
          <p className="section-label fade-in">Get In Touch</p>
          <h1 className="section-title contact-hero__title fade-in fade-in-delay-1">
            Say Hello
          </h1>
          <p className="contact-hero__sub fade-in fade-in-delay-2">
            Whether you want to talk about medicine, writing, or anything else, I would love to hear from you.
          </p>
        </div>
      </section>

      <section className="contact-body section-pad">
        <div className="container contact-grid">
          <div className="contact-info fade-in">
            <h3>Contact Details</h3>
            <ul>
              {info.map(item => (
                <li key={item.label}>
                  <div className="contact-info__icon">
                    <item.Icon />
                  </div>
                  <div>
                    <span className="contact-info__label">{item.label}</span>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noreferrer" className="contact-info__value contact-info__link">
                        {item.value}
                      </a>
                    ) : (
                      <span className="contact-info__value">{item.value}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="contact-note">
              <span className="contact-note__icon"><IconHeart /></span>
              <p>Based in the Terai foothills of Nepal, passionate about medicine and writing.</p>
            </div>
          </div>

          <div className="contact-form-wrap fade-in fade-in-delay-2">
            {status === 'sent' ? (
              <div className="contact-success">
                <div className="contact-success__icon">
                  <svg width="56" height="56" viewBox="0 0 56 56" aria-hidden="true">
                    <rect width="56" height="56" rx="14" fill="var(--accent-teal-dim)"/>
                    <path d="M17 28l8 8 14-16" stroke="#3dd6b5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                </div>
                <h3>Message Sent!</h3>
                <p>Your mail client has opened with the message pre-filled. Thank you for reaching out.</p>
                <button className="btn-outline" onClick={handleReset}>
                  Send Another
                </button>
              </div>
            ) : (
              <div className="contact-form">
                <h3 className="contact-form__heading">Send a Message</h3>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Hari Bahadur"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="hari@example.com"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder="Write something here..."
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="button"
                  className="btn-primary contact-submit"
                  onClick={handleSubmit}
                  disabled={!isValid}
                  aria-disabled={!isValid}
                >
                  Send Message
                  <IconArrowRight />
                </button>
                <p className="contact-form__note">
                  Opens your email client with the message pre-filled.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Contact