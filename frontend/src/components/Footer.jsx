import { Link } from 'react-router-dom'
import { IconFacebook, IconGithub, IconLinkedin } from './Icons.jsx'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">
             <img src="/favicon.png" width="24" height="20" viewBox="0 0 28 28" aria-hidden="true"/>
            <span>Aashutosh Dhungel</span>
          </div>
          <p className="footer__tagline">Aspiring Doctor · Writer · Dreamer from Nepal</p>
        </div>

        <nav className="footer__links" aria-label="Footer navigation">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="footer__socials">
          <a href="https://www.facebook.com/dhungelaashutosh" target="_blank" rel="noreferrer" aria-label="Facebook">
            <IconFacebook />
          </a>
          <a href="https://www.linkedin.com/in/aashutosh-dhungel-01b5bb393/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <IconLinkedin />
          </a>
        </div>
      </div>
      <div className="footer__bottom">
        <p className='developer-credit'>Meet the Developer: <a href="https://prasant-bhattarai.com.np" target="_blank" rel="noreferrer">Prasant Bhattarai</a></p>
      </div>

    </footer>
  )
}

export default Footer