import { useState } from 'react'
import Icon from '../components/Icon.jsx'
import './Contact.css'

const info = [
  { icon: 'phone', label: 'Phone', value: '+977 9800000000', href: 'tel:9800000000' },
  { icon: 'map', label: 'Location', value: 'Arjundhara, Jhapa, Nepal', href: null },
  { icon: 'github', label: 'GitHub', value: 'github.com/aashutoshdhungel', href: 'https://github.com/aashutoshdhungel' },
  { icon: 'linkedin', label: 'LinkedIn', value: 'linkedin.com', href: 'https://linkedin.com' },
]

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    const subject = encodeURIComponent(`Message from ${form.name}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
    window.location.href = `mailto:aashutoshdhungel@example.com?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <main className="page-wrapper">
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
                    <Icon id={item.icon} className="icon" />
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
              <Icon id="heart" className="icon icon-sm" />
              <p>Based in the Terai foothills of Nepal, passionate about medicine and writing.</p>
            </div>
          </div>

          <div className="contact-form-wrap fade-in fade-in-delay-2">
            {sent ? (
              <div className="contact-success">
                <div className="contact-success__icon">
                  <svg width="40" height="40" viewBox="0 0 40 40">
                    <rect width="40" height="40" rx="10" fill="var(--accent-teal-dim)"/>
                    <path d="M12 20l6 6 10-12" stroke="#3dd6b5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                </div>
                <h3>Message Ready</h3>
                <p>Your mail client has opened with the message. Thank you for reaching out.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
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
                    required
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
                    required
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
                    required
                  />
                </div>
                <button type="submit" className="btn-primary contact-submit">
                  Send Message
                  <Icon id="arrow-right" className="icon icon-sm" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Contact
