import { useState, useEffect, useRef } from 'react'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const moreRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <a href="#/" className="navbar__logo" id="nav-logo">
          AURA GALLERY
        </a>

        <nav className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`} id="main-nav">
          <a href="#/" className="navbar__link" id="nav-home">Home</a>
        </nav>

        {/* More dropdown */}
        <div className="navbar__more" ref={moreRef} id="nav-more-wrapper">
          <button
            className={`navbar__more-btn ${moreOpen ? 'navbar__more-btn--open' : ''}`}
            onClick={() => setMoreOpen(!moreOpen)}
            id="nav-more-btn"
            aria-label="More options"
            aria-expanded={moreOpen}
            aria-haspopup="true"
          >
            <svg width="4" height="18" viewBox="0 0 4 18" fill="currentColor" aria-hidden="true">
              <circle cx="2" cy="2" r="2"/>
              <circle cx="2" cy="9" r="2"/>
              <circle cx="2" cy="16" r="2"/>
            </svg>
          </button>

          {moreOpen && (
            <div className="navbar__dropdown" id="nav-dropdown">
              <a
                href="#/about"
                className="navbar__dropdown-item"
                id="nav-about"
                onClick={() => setMoreOpen(false)}
              >
                About
              </a>
              <div className="navbar__dropdown-divider" />
              <a
                href="#/contact"
                className="navbar__dropdown-item navbar__dropdown-item--cta"
                id="nav-inquiry-dropdown"
                onClick={() => setMoreOpen(false)}
              >
                Inquiry
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
