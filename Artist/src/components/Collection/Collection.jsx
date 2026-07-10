import { useState, useEffect } from 'react'
import './Collection.css'

const FALLBACK_ARTWORKS = [
  { _id: '1', title: 'Convergences', medium: 'Mixed Media on Canvas', year: 2022, img: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&q=80', has360: false, description: 'An exploration of intersecting planes and the tension between chaos and order.' },
  { _id: '2', title: 'Ephemeral Bloom', medium: 'Oil on Canvas', year: 2021, img: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=80', has360: false, description: 'Capturing the fleeting beauty of nature and the passage of time through vibrant hues.' },
  { _id: '3', title: 'Solilace of Tide', medium: 'Natalia and Raven', year: 2023, img: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&q=80', has360: true, description: 'A deeply personal piece reflecting on memory and the constant ebb and flow of life.' },
  { _id: '4', title: 'Silent Whisper', medium: 'Fine Line Art', year: 2022, img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80', has360: false, description: 'Minimalist study focusing on the profound impact of negative space and silence.' },
  { _id: '5', title: 'Ethereal Ruins', medium: 'Oil on Mixed Travel', year: 2024, img: 'https://images.unsplash.com/photo-1605106702842-01a887a31122?w=600&q=80', has360: false, description: 'Depicting the remnants of forgotten structures reclaimed by ethereal, creeping mist.' },
  { _id: '6', title: 'The Observer', medium: 'Oil on Canvas Mar', year: 2022, img: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&q=80', has360: true, description: 'A portrait that seems to gaze back at the viewer, challenging perception and reality.' },
  { _id: '7', title: 'Whispering Shadows', medium: 'Charcoal on Paper', year: 2023, img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80', has360: false, description: 'Intricate charcoal work focusing on the interplay of light and dense shadow.' },
  { _id: '8', title: 'Luminous Void', medium: 'Acrylic on Canvas', year: 2021, img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80', has360: false, description: 'A study in color theory, examining how bright colors can evoke a sense of emptiness.' },
  { _id: '9', title: 'Autumn Resonance', medium: 'Oil on Wood Panel', year: 2024, img: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&q=80', has360: true, description: 'Warm, textured piece celebrating the rich palette and profound melancholy of autumn.' },
  { _id: '10', title: 'Serene Depths', medium: 'Watercolor', year: 2022, img: 'https://images.unsplash.com/photo-1580136608260-4eb11f4b24fe?w=600&q=80', has360: false, description: 'A fluid exploration of underwater tranquility and the subtle gradation of blue hues.' },
  { _id: '11', title: 'Temporal Shift', medium: 'Mixed Media', year: 2023, img: 'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?w=600&q=80', has360: false, description: 'Abstract collage representing the distortion of memory over long periods of time.' },
  { _id: '12', title: 'Golden Horizon', medium: 'Oil on Canvas', year: 2020, img: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=600&q=80', has360: true, description: 'A vast, expansive landscape painting focusing on the subtle transition of dusk light.' },
]

const artworks = [
  {
    id: 1,
    title: 'Convergences',
    medium: 'Mixed Media on Canvas',
    year: 2022,
    img: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&q=80',
    has360: false,
    description: 'An exploration of intersecting planes and the tension between chaos and order.'
  },
  {
    id: 2,
    title: 'Ephemeral Bloom',
    medium: 'Oil on Canvas',
    year: 2021,
    img: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=80',
    has360: false,
    description: 'Capturing the fleeting beauty of nature and the passage of time through vibrant hues.'
  },
  {
    id: 3,
    title: 'Solilace of Tide',
    medium: 'Natalia and Raven',
    year: 2023,
    img: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&q=80',
    has360: true,
    description: 'A deeply personal piece reflecting on memory and the constant ebb and flow of life.'
  },
  {
    id: 4,
    title: 'Silent Whisper',
    medium: 'Fine Line Art',
    year: 2022,
    img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80',
    has360: false,
    description: 'Minimalist study focusing on the profound impact of negative space and silence.'
  },
  {
    id: 5,
    title: 'Ethereal Ruins',
    medium: 'Oil on Mixed Travel',
    year: 2024,
    img: 'https://images.unsplash.com/photo-1605106702842-01a887a31122?w=600&q=80',
    has360: false,
    description: 'Depicting the remnants of forgotten structures reclaimed by ethereal, creeping mist.'
  },
  {
    id: 6,
    title: 'The Observer',
    medium: 'Oil on Canvas Mar',
    year: 2022,
    img: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&q=80',
    has360: true,
    description: 'A portrait that seems to gaze back at the viewer, challenging perception and reality.'
  },
  {
    id: 7,
    title: 'Whispering Shadows',
    medium: 'Charcoal on Paper',
    year: 2023,
    img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80',
    has360: false,
    description: 'Intricate charcoal work focusing on the interplay of light and dense shadow.'
  },
  {
    id: 8,
    title: 'Luminous Void',
    medium: 'Acrylic on Canvas',
    year: 2021,
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80',
    has360: false,
    description: 'A study in color theory, examining how bright colors can evoke a sense of emptiness.'
  },
  {
    id: 9,
    title: 'Autumn Resonance',
    medium: 'Oil on Wood Panel',
    year: 2024,
    img: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&q=80',
    has360: true,
    description: 'Warm, textured piece celebrating the rich palette and profound melancholy of autumn.'
  },
  {
    id: 10,
    title: 'Serene Depths',
    medium: 'Watercolor',
    year: 2022,
    img: 'https://images.unsplash.com/photo-1580136608260-4eb11f4b24fe?w=600&q=80',
    has360: false,
    description: 'A fluid exploration of underwater tranquility and the subtle gradation of blue hues.'
  },
  {
    id: 11,
    title: 'Temporal Shift',
    medium: 'Mixed Media',
    year: 2023,
    img: 'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?w=600&q=80',
    has360: false,
    description: 'Abstract collage representing the distortion of memory over long periods of time.'
  },
  {
    id: 12,
    title: 'Golden Horizon',
    medium: 'Oil on Canvas',
    year: 2020,
    img: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=600&q=80',
    has360: true,
    description: 'A vast, expansive landscape painting focusing on the subtle transition of dusk light.'
  }
]

export default function Collection() {
  const [artworks, setArtworks] = useState(FALLBACK_ARTWORKS)

  // Fetch artworks from API — use fallback if API is unavailable or empty
  useEffect(() => {
    fetch('/api/artworks')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setArtworks(data)
        }
      })
      .catch(() => {
        // silently fall back to hardcoded artworks
      })
  }, [])

  const openArtworkPage = (work) => {
    window.location.hash = '#/artwork/' + (work._id || work.id);
  }

  return (
    <section className="collection" id="collection">
      <div className="collection__header-wrapper" style={{ padding: '0 2rem' }}>
        {/* Header Row */}
        <div className="collection__header">
          <div className="collection__header-left">
            <span className="section-label">Gallery</span>
            <h2 className="collection__title" id="collection-title">The Collection</h2>
          </div>
          <p className="collection__description">
            Each piece is a singular vision of light and proportion,<br />
            crafted with intentionality and precision.
          </p>
        </div>
      </div>

      {/* Artwork Grid */}
      <div className="collection__grid-wrapper" style={{ padding: '0 2rem' }}>
        <div className="collection__grid" id="artwork-grid">
          {artworks.map((art) => (
            <article 
              className="art-card" 
              key={art._id || art.id} 
              id={`art-card-${art._id || art.id}`}
              onClick={() => openArtworkPage(art)}
            >
              <div className="art-card__image-wrap">
                <img
                  src={art.img}
                  alt={art.title}
                  className="art-card__image"
                  loading="lazy"
                />
                {art.has360 && (
                  <span className="art-card__badge" aria-label="360 degree view available">360°</span>
                )}
                <button className="art-card__plus-btn" aria-label="View Details" onClick={(e) => { e.stopPropagation(); openArtworkPage(art); }}>
                  +
                </button>
                <div className="art-card__overlay">
                  <span className="art-card__view-btn">View Work →</span>
                </div>
                {/* Title inside the image card */}
                <div className="art-card__inner-info">
                  <h3 className="art-card__inner-title">{art.title}</h3>
                  <p className="art-card__inner-meta">{art.medium}, {art.year}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
