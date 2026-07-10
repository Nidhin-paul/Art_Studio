import { useState, useEffect } from 'react';
import './ArtworkPage.css';

const FALLBACK_ARTWORKS = [
  { _id: '1', title: 'Convergences', medium: 'Mixed Media on Canvas', year: 2022, img: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&q=80', has360: false, description: 'An exploration of intersecting planes and the tension between chaos and order.', additionalImages: ['https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&q=80', 'https://images.unsplash.com/photo-1574182245530-967d9b3831af?w=600&q=80'] },
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
];

export default function ArtworkPage({ id }) {
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/artworks')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const found = data.find(art => (art._id || art.id).toString() === id);
          if (found) {
            setArtwork(found);
          } else {
            const fallbackFound = FALLBACK_ARTWORKS.find(art => (art._id || art.id).toString() === id);
            setArtwork(fallbackFound);
          }
        } else {
          const fallbackFound = FALLBACK_ARTWORKS.find(art => (art._id || art.id).toString() === id);
          setArtwork(fallbackFound);
        }
        setLoading(false);
      })
      .catch(() => {
        const fallbackFound = FALLBACK_ARTWORKS.find(art => (art._id || art.id).toString() === id);
        setArtwork(fallbackFound);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="artwork-page loading">Loading...</div>;
  if (!artwork) return <div className="artwork-page not-found">Artwork not found</div>;

  return (
    <div className="artwork-page">
      <div className="artwork-page__container">
        <button className="artwork-page__back" onClick={() => window.location.hash = '#/'}>
          ← Back to Gallery
        </button>
        <div className="artwork-page__content">
          <div className="artwork-page__image-wrap">
            <img src={artwork.img} alt={artwork.title} className="artwork-page__image" />
          </div>
          <div className="artwork-page__details">
            <h1 className="artwork-page__title">{artwork.title}</h1>
            <p className="artwork-page__meta">{artwork.medium} • {artwork.year}</p>
            <p className="artwork-page__desc">{artwork.description}</p>
          </div>
        </div>

        {artwork.additionalImages && artwork.additionalImages.length > 0 && (
          <div className="artwork-page__additional">
            <h2 className="artwork-page__additional-title">More Views & Details</h2>
            <div className="artwork-page__additional-grid">
              {artwork.additionalImages.map((img, idx) => (
                <div key={idx} className="artwork-page__additional-item">
                  <img src={img} alt={`${artwork.title} detail ${idx + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="artwork-page__action">
          <a href="#/contact" className="artwork-page__inquiry-btn">
            Inquire About This Work
          </a>
        </div>
      </div>
    </div>
  );
}
