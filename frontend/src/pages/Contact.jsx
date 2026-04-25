import { useState } from 'react'
import SEO from '../components/SEO.jsx'
import { IconPhone, IconMap, IconLinkedin, IconHeart, IconArrowRight, IconFacebook } from '../components/Icons.jsx'
import { useReveal } from '../hooks/useReveal.js'
import './Contact.css'

const info = [
  { Icon: IconPhone, label: 'Phone', value: '+977 9705804558', href: 'tel:9705804558' },
  { Icon: IconMap, label: 'Location', value: 'Arjundhara, Jhapa, Nepal', href: null },
  { Icon: IconFacebook, label: 'Facebook', value: 'facebook.com/dhungelaashutosh', href: 'https://www.facebook.com/dhungelaashutosh' },
  { Icon: IconLinkedin, label: 'LinkedIn', value: 'aashutosh-dhungel', href: 'https://www.linkedin.com/in/aashutosh-dhungel-01b5bb393/' },
]

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')
  const ref = useReveal()

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  const isValid = form.name.trim() && form.email.trim() && form.message.trim()

  const handleSubmit = async e => {
    e.preventDefault()
    if (!isValid) return
    setStatus('sending')

    const fd = new FormData()
    fd.append('access_key', '59fd4889-92b9-4721-8bed-8b3e4467e2fa')
    fd.append('name', form.name)
    fd.append('email', form.email)
    fd.append('message', form.message)

    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd })
      const data = await res.json()
      setStatus(data.success ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const handleReset = () => { setForm({ name: '', email: '', message: '' }); setStatus('idle') }

  return (
    <main className="page-wrapper" ref={ref}>
      <SEO
        title="Contact"
        description="Get in touch with Aashutosh Dhungel. Talk about medicine, writing, or anything else."
      />

      <section className="contact-hero">
        <div className="container">
          <p className="label-tag anim-up">Get In Touch</p>
          <h1 className="section-heading contact-hero__title anim-up anim-up-1">Say Hello</h1>
          <p className="contact-hero__sub anim-up anim-up-2">
            Whether you want to talk about medicine, writing, or anything else, I would love to hear from you.
          </p>
        </div>
      </section>

      <section className="contact-body">
        <div className="container contact-grid">
          <div className="contact-info reveal">
            <div className="contact-info__head">Contact Details</div>
            <ul className="contact-info-list">
              {info.map(item => (
                <li key={item.label} className="contact-info-item">
                  <div className="contact-info-item__icon"><item.Icon /></div>
                  <div>
                    <span className="contact-info-item__label">{item.label}</span>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noreferrer" className="contact-info-item__link">
                        {item.value}
                      </a>
                    ) : (
                      <span className="contact-info-item__value">{item.value}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <div className="contact-info__note">
              <span className="contact-info__note-icon"><IconHeart /></span>
              <p>Based in the Terai of Nepal, passionate about medicine and writing.</p>
            </div>
          </div>

          <div className="contact-form-wrap reveal reveal-d1">
            {status === 'sent' ? (
              <div className="contact-success">
                <div className="contact-success__icon">
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="28" cy="28" r="26" strokeOpacity="0.25"/>
                    <path d="M17 28l8 8 14-16"/>
                  </svg>
                </div>
                <h3>Message Sent</h3>
                <p>Thank you for reaching out. I will get back to you soon.</p>
                <button className="btn btn-ghost" onClick={handleReset}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 className="contact-form__heading">Send a Message</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} autoComplete="name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input id="email" name="email" type="email" required placeholder="you@example.com" value={form.email} onChange={handleChange} autoComplete="email" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea id="message" name="message" required rows={6} placeholder="Write something here..." value={form.message} onChange={handleChange} />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary contact-submit"
                  disabled={!isValid || status === 'sending'}
                >
                  {status === 'sending' ? (
                    <><span className="contact-submit__spinner" aria-hidden="true" /> Sending</>
                  ) : (
                    <>Send Message <IconArrowRight /></>
                  )}
                </button>
                {status === 'error' && (
                  <p className="form-error">Something went wrong. Please try again.</p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Contact