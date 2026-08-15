import { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { SunIcon, MoonIcon, IconMenu, IconClose } from './Icons.jsx'
import './Navbar.css'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/notes', label: 'Notes' },
  { to: '/contact', label: 'Contact' },
]

function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Close mobile menu on route change */
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  /* Close when clicking outside navbar area */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className={`navbar ${scrolled || menuOpen ? 'navbar--scrolled' : ''}`} ref={navRef}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo">
          <img src="/pfp.jpeg" alt="Aashutosh" width="24" height="24" />
          <span>Aashutosh</span>
        </Link>

        <nav className="navbar__nav" aria-label="Main navigation">
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__right">
          <button
            className="navbar__theme-btn"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          <Link to="/contact" className="btn btn-primary navbar__cta">
            Get In Touch
          </Link>

          <div className="navbar__burger-wrapper">
            <button
              className="navbar__burger"
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <IconClose /> : <IconMenu />}
            </button>

            {/* Dynamic floating dropdown menu */}
            <div 
              className={`navbar__dropdown ${menuOpen ? 'navbar__dropdown--open' : ''}`} 
              aria-hidden={!menuOpen}
            >
              {links.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) => `navbar__dropdown-link ${isActive ? 'navbar__dropdown-link--active' : ''}`}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar