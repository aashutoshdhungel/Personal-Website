import { Link } from 'react-router-dom'
import { IconFacebook, IconLinkedin } from './Icons.jsx'
import './Footer.css'

/* pen nib SVG for builder credit */
const NibIcon = () => (
  <svg className="credit-nib" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19l-7-7 1.5-1.5" />
    <path d="M5 12L12 5l7 7-7 7z" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
  </svg>
)

/* arrow for social links */
const ArrowUpRight = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
)

function Footer() {
  return (
    <footer className="footer">
      <div className="container">

        <div className="footer__main">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <img src="/favicon.png" alt="Aashutosh" width="30" height="30" style={{ borderRadius: '10%' }} />
              <span>Aashutosh Dhungel</span>
            </Link>
            <p className="footer__desc">
              Medical aspirant and writer from Jhapa, Nepal. Preparing for MBBS while finding meaning in words.
            </p>
          </div>

          <div>
            <span className="footer__col-label">Navigate</span>
            <nav className="footer__links" aria-label="Footer navigation">
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/notes">Notes</Link>
              <Link to="/contact">Contact</Link>
            </nav>
          </div>

          <div>
            <span className="footer__col-label">Connect</span>
            <div className="footer__socials">
              <a href="https://www.facebook.com/dhungelaashutosh" target="_blank" rel="noreferrer" className="footer__social-link">
                <IconFacebook />
                <span>Facebook</span>
                <ArrowUpRight />
              </a>
              <a href="https://www.linkedin.com/in/aashutosh-dhungel-01b5bb393/" target="_blank" rel="noreferrer" className="footer__social-link">
                <IconLinkedin />
                <span>LinkedIn</span>
                <ArrowUpRight />
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span className="footer__copy">Aashutosh Dhungel 2025</span>
          <span className="footer__credit">
            crafted by{' '}
            <a href="https://prasant-bhattarai.com.np" target="_blank" rel="noreferrer" className="footer__credit-link">
              <NibIcon />
              Prasant Bhattarai
            </a>
          </span>
        </div>

      </div>
    </footer>
  )
}

export default Footer