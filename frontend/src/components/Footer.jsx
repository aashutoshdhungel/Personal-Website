import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">
            <svg width="24" height="24" viewBox="0 0 28 28">
              <rect width="28" height="28" rx="6" fill="#0a1628"/>
              <rect x="12" y="5" width="4" height="18" rx="1.5" fill="#3dd6b5"/>
              <rect x="5" y="12" width="18" height="4" rx="1.5" fill="#3dd6b5"/>
            </svg>
            <span>Aashutosh Dhungel</span>
          </div>
          <p className="footer__tagline">Aspiring Doctor · Writer · Dreamer from Nepal</p>
        </div>

        <div className="footer__links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer__socials">
          <a href="https://github.com/aashutoshdhungel" target="_blank" rel="noreferrer" aria-label="GitHub">
            <Icon id="github" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Icon id="linkedin" />
          </a>
        </div>
      </div>
      <div className="footer__bottom">
        <p>Crafted with care in Arjundhara, Nepal</p>
      </div>
    </footer>
  )
}

export default Footer
