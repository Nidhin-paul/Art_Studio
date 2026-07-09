import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" id="footer">
      <div className="footer__inner">
        <div className="footer__left">
          <a href="#" className="footer__logo" id="footer-logo">AURA GALLERY</a>
          <p className="footer__copy">
            © {year} Aura Gallery. All Rights Reserved.
          </p>
        </div>

        <nav className="footer__social" aria-label="Social media links">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social-link"
            id="footer-instagram"
          >
            Instagram
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social-link"
            id="footer-twitter"
          >
            Twitter
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social-link"
            id="footer-linkedin"
          >
            LinkedIn
          </a>
        </nav>

        <div className="footer__right">
          <a href="#/contact" className="footer__contact-link" id="footer-contact-link">
            Get in Touch ↗
          </a>
        </div>
      </div>
    </footer>
  )
}
