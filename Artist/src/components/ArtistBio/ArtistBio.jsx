import './ArtistBio.css'

export default function ArtistBio() {
  return (
    <section className="artist" id="artist">
      <div className="container">
        <div className="artist__layout">
          {/* Left: Studio Photo + Quote */}
          <div className="artist__left">
            <div className="artist__photo-wrap">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80"
                alt="Eliza Thorne painting in her studio"
                className="artist__photo"
                id="artist-studio-photo"
              />
            </div>
            <div className="artist__quote-card" id="artist-quote-card">
              <p className="artist__quote-location">Paris</p>
              <blockquote className="artist__quote-text">
                "Art is the soul of the community."
              </blockquote>
            </div>
          </div>

          {/* Right: Bio Content */}
          <div className="artist__right">
            <span className="section-label" id="artist-label">The Artist</span>
            <h2 className="artist__name" id="artist-name">Eliza Thorne</h2>
            <div className="artist__bio">
              <p>
                Raised in the light-drenched landscapes of the Pacific Northwest, Eliza Thorne explores the intersection of intimacy and physical depth. Her work is characterized by a meticulous palette and an emphasis on tactility that tells the story of the spaces of quiet contemplation.
              </p>
              <p>
                With over fifteen years of studio practice, Eliza has exhibited in galleries across Europe, New York, and Rome. She presents a deeply felt aesthetic through, often involving the blending of region and form to achieve the softness and illumination of her artistic vision and canon.
              </p>
            </div>
            <a href="#/contact" className="artist__cta" id="artist-cta-btn">
              Book a Full Inquiry <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
