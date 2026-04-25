import { Link } from 'react-router-dom'
import { IconFacebook, IconLinkedin } from './Icons.jsx'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__main">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <img src="/pfp.jpeg" alt="Aashutosh" width="30" height="30" style={{ borderRadius: '50%' }} />
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
              <Link to="/contact">Contact</Link>
            </nav>
          </div>

          <div>
            <span className="footer__col-label">Connect</span>
            <div className="footer__socials">
              <a href="https://www.facebook.com/dhungelaashutosh" target="_blank" rel="noreferrer" className="footer__social-link">
                <IconFacebook />
                <span>Facebook</span>
              </a>
              <a href="https://www.linkedin.com/in/aashutosh-dhungel-01b5bb393/" target="_blank" rel="noreferrer" className="footer__social-link">
                <IconLinkedin />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span className="footer__copy">Aashutosh Dhungel 2025</span>
          <span className="footer__credit">
            Built by <a href="https://prasant-bhattarai.com.np" target="_blank" rel="noreferrer">Prasant Bhattarai</a>
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer