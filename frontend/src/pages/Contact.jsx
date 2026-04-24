import { useState } from 'react'
import SEO from '../components/SEO.jsx'
import { IconPhone, IconMap, IconGithub, IconLinkedin, IconHeart, IconArrowRight , IconFacebook} from '../components/Icons.jsx'
import './Contact.css'

const info = [
  { Icon: IconPhone, label: 'Phone', value: '+977 9705804558', href: 'tel:9705804558' },
  { Icon: IconMap, label: 'Location', value: 'Arjundhara, Jhapa, Nepal', href: null },
  { Icon: IconFacebook, label: 'Facebook', value: 'facebook.com/dhungelaashutosh', href: 'https://www.facebook.com/dhungelaashutosh' },
  { Icon: IconLinkedin, label: 'LinkedIn', value: 'linkedin.com/in/aashutosh-dhungel-01b5bb393/', href: 'https://www.linkedin.com/in/aashutosh-dhungel-01b5bb393/' },
]

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const isValid = form.name.trim() && form.email.trim() && form.message.trim()

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!isValid) return
    
    setStatus('sending') // Set loading state

    const formData = new FormData()
    formData.append("access_key", "59fd4889-92b9-4721-8bed-8b3e4467e2fa")
    formData.append("name", form.name)
    formData.append("email", form.email)
    formData.append("message", form.message)

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })

      const data = await response.json()
      if (data.success) {
        setStatus('sent')
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }
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
              <p>Based in the warm embrace of Terai of Nepal, passionate about medicine and writing.</p>
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
                <p>Thank you for reaching out. I will get back to you soon.</p>
                <button className="btn-outline" onClick={handleReset}>
                  Send Another
                </button>
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
                    required
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
                    required
                    placeholder="example@gmail.com"
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
                    required
                    rows={6}
                    placeholder="Write something here..."
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary contact-submit"
                  disabled={!isValid || status === 'sending'}
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                  <IconArrowRight />
                </button>
                {status === 'error' && (
                  <p style={{ color: 'red', marginTop: '10px' }}>Something went wrong. Please try again.</p>
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