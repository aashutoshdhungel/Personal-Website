import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import './Navbar.css'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo">
          <svg width="28" height="28" viewBox="0 0 28 28">
            <rect width="28" height="28" rx="6" fill="#0a1628"/>
            <rect x="12" y="5" width="4" height="18" rx="1.5" fill="#3dd6b5"/>
            <rect x="5" y="12" width="18" height="4" rx="1.5" fill="#3dd6b5"/>
          </svg>
          <span>Aashutosh</span>
        </Link>

        <nav className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`}>
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__right">
          <Link to="/contact" className="btn-primary navbar__cta">
            Get In Touch
          </Link>
          <button
            className="navbar__burger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <Icon id={menuOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
