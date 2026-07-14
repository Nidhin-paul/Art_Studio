import { useState, useEffect } from 'react'
import './AdminPage.css'
import '../components/Collection/Collection.css'

const STATUS_COLORS = {
  pending: { bg: '#fff8e6', color: '#b45309', label: 'Pending' },
  reviewed: { bg: '#eff6ff', color: '#1d4ed8', label: 'Reviewed' },
  replied: { bg: '#f0fdf4', color: '#15803d', label: 'Replied' },
}

const EMPTY_FORM = { title: '', medium: '', year: new Date().getFullYear(), img: '', description: '', has360: false, additionalImages: [], additionalImageDescriptions: [] }

export default function AdminPage() {
  const [tab, setTab] = useState('inquiries')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  // ── Inquiries state ──────────────────────────────
  const [inquiries, setInquiries] = useState([])
  const [loadingInquiries, setLoadingInquiries] = useState(true)
  const [inquiryError, setInquiryError] = useState(null)
  const [selected, setSelected] = useState(null)

  // ── Gallery state ────────────────────────────────
  const [artworks, setArtworks] = useState([])
  const [loadingArtworks, setLoadingArtworks] = useState(true)
  const [artworkError, setArtworkError] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [editId, setEditId] = useState(null)
  const [formError, setFormError] = useState(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const fetchInquiries = async () => {
    setLoadingInquiries(true)
    try {
      const res = await fetch('/api/inquiries')
      if (!res.ok) throw new Error('Failed to load')
      setInquiries(await res.json())
    } catch (err) { setInquiryError(err.message) }
    finally { setLoadingInquiries(false) }
  }

  const fetchArtworks = async () => {
    setLoadingArtworks(true)
    try {
      const res = await fetch('/api/artworks')
      if (!res.ok) throw new Error('Failed to load')
      setArtworks(await res.json())
    } catch (err) { setArtworkError(err.message) }
    finally { setLoadingArtworks(false) }
  }

  useEffect(() => { fetchInquiries() }, [])
  useEffect(() => { if (tab === 'gallery') fetchArtworks() }, [tab])

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      const updated = await res.json()
      setInquiries(prev => prev.map(i => i._id === id ? updated : i))
      if (selected?._id === id) setSelected(updated)
    } catch { alert('Failed to update status.') }
  }

  const handleSubmitArtwork = async (e) => {
    e.preventDefault()
    setFormError(null)
    setFormSuccess(false)
    setSubmitting(true)
    try {
      const isEdit = !!editId;
      const url = isEdit ? `/api/artworks/${editId}` : '/api/artworks';
      const method = isEdit ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, year: Number(form.year) }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      if (isEdit) {
        setArtworks(prev => prev.map(a => a._id === editId ? data : a))
      } else {
        setArtworks(prev => [...prev, data])
      }

      setForm(EMPTY_FORM)
      setEditId(null)
      setFormSuccess(true)
      setTimeout(() => setFormSuccess(false), 3000)
    } catch (err) { setFormError(err.message) }
    finally { setSubmitting(false) }
  }

  const handleEditArtwork = (art) => {
    setEditId(art._id);
    setForm({
      title: art.title,
      medium: art.medium,
      year: art.year,
      img: art.img,
      description: art.description || '',
      has360: art.has360 || false,
      additionalImages: art.additionalImages || [],
      additionalImageDescriptions: art.additionalImageDescriptions || (art.additionalImages || []).map(() => '')
    });
    setFormSuccess(false);
    setFormError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleAdditionalImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      Promise.all(files.map(file => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      })).then(results => {
        setForm(prev => ({
          ...prev,
          additionalImages: [...(prev.additionalImages || []), ...results],
          additionalImageDescriptions: [...(prev.additionalImageDescriptions || []), ...results.map(() => '')]
        }));
      });
    }
  };

  const removeAdditionalImage = (index) => {
    setForm(prev => ({
      ...prev,
      additionalImages: prev.additionalImages.filter((_, i) => i !== index),
      additionalImageDescriptions: (prev.additionalImageDescriptions || []).filter((_, i) => i !== index)
    }));
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setForm(EMPTY_FORM);
    setFormSuccess(false);
    setFormError(null);
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, img: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteArtwork = async (id) => {
    if (!window.confirm('Remove this artwork from the gallery?')) return
    try {
      await fetch(`/api/artworks/${id}`, { method: 'DELETE' })
      setArtworks(prev => prev.filter(a => a._id !== id))
    } catch { alert('Failed to delete.') }
  }

  const counts = {
    total: inquiries.length,
    pending: inquiries.filter(i => i.status === 'pending').length,
    reviewed: inquiries.filter(i => i.status === 'reviewed').length,
    replied: inquiries.filter(i => i.status === 'replied').length,
  }

  const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === 'admin123') {
      setIsAuthenticated(true)
      setLoginError('')
    } else {
      setLoginError('Incorrect password')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper">
        <form className="admin-login-form" onSubmit={handleLogin}>
          <h2 className="admin-login-title">Admin Panel</h2>
          <p className="admin-login-subtitle">Please enter your password to continue</p>
          <div className="admin-login-field">
            <input 
              type="password" 
              className="admin__input admin-login-input"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Password" 
              required 
            />
          </div>
          {loginError && <p className="admin__form-error" style={{ textAlign: 'center', marginTop: '0.5rem' }}>{loginError}</p>}
          <button type="submit" className="admin__add-btn admin-login-btn">Login</button>
          <a href="#/" className="admin-login-back">← Back to Site</a>
        </form>
      </div>
    )
  }

  return (
    <div className="admin">
      {/* Header */}
      <header className="admin__header">
        <div className="admin__header-left">
          <span className="admin__logo">AURA GALLERY</span>
          <span className="admin__subtitle">Admin Panel</span>
        </div>
        <a href="#/" className="admin__back">← Back to Site</a>
      </header>

      {/* Tabs */}
      <div className="admin__tabs">
        <button className={`admin__tab ${tab === 'inquiries' ? 'admin__tab--active' : ''}`} onClick={() => setTab('inquiries')}>
          📋 Inquiries <span className="admin__tab-badge">{counts.pending}</span>
        </button>
        <button className={`admin__tab ${tab === 'gallery' ? 'admin__tab--active' : ''}`} onClick={() => setTab('gallery')}>
          🖼️ Gallery <span className="admin__tab-badge">{artworks.length}</span>
        </button>
      </div>

      <main className="admin__main">

        {/* ── INQUIRIES TAB ── */}
        {tab === 'inquiries' && (
          <>
            <div className="admin__stats">
              {[
                { label: 'Total', value: counts.total, accent: '#1a1a1a' },
                { label: 'Pending', value: counts.pending, accent: '#b45309' },
                { label: 'Reviewed', value: counts.reviewed, accent: '#1d4ed8' },
                { label: 'Replied', value: counts.replied, accent: '#15803d' },
              ].map(s => (
                <div className="admin__stat-card" key={s.label}>
                  <span className="admin__stat-value" style={{ color: s.accent }}>{s.value}</span>
                  <span className="admin__stat-label">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="admin__layout">
              <div className="admin__table-wrap">
                <div className="admin__table-header">
                  <h2 className="admin__table-title">All Inquiries</h2>
                  <button className="admin__refresh-btn" onClick={fetchInquiries}>↻ Refresh</button>
                </div>
                {loadingInquiries && <p className="admin__loading">Loading...</p>}
                {inquiryError && <p className="admin__error">Error: {inquiryError}</p>}
                {!loadingInquiries && inquiries.length === 0 && <p className="admin__empty">No inquiries yet.</p>}
                {!loadingInquiries && inquiries.length > 0 && (
                  <table className="admin__table">
                    <thead><tr><th>Name</th><th>Email</th><th>Subject</th><th>Date</th><th>Status</th></tr></thead>
                    <tbody>
                      {inquiries.map(inq => {
                        const s = STATUS_COLORS[inq.status]
                        return (
                          <tr key={inq._id} className={`admin__row ${selected?._id === inq._id ? 'admin__row--active' : ''}`} onClick={() => setSelected(inq)}>
                            <td className="admin__cell--name">{inq.fullName}</td>
                            <td>{inq.email}</td>
                            <td className="admin__cell--subject">{inq.subject}</td>
                            <td>{formatDate(inq.createdAt)}</td>
                            <td><span className="admin__status-badge" style={{ background: s.bg, color: s.color }}>{s.label}</span></td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                )}
              </div>

              {selected && (
                <div className="admin__detail">
                  <div className="admin__detail-header">
                    <h3 className="admin__detail-name">{selected.fullName}</h3>
                    <button className="admin__detail-close" onClick={() => setSelected(null)}>✕</button>
                  </div>
                  <p className="admin__detail-email">{selected.email}</p>
                  <p className="admin__detail-date">{formatDate(selected.createdAt)}</p>
                  <div className="admin__detail-section">
                    <span className="admin__detail-label">Subject</span>
                    <p className="admin__detail-value">{selected.subject}</p>
                  </div>
                  <div className="admin__detail-section">
                    <span className="admin__detail-label">Message</span>
                    <p className="admin__detail-value admin__detail-message">{selected.message}</p>
                  </div>
                  <div className="admin__detail-section">
                    <span className="admin__detail-label">Update Status</span>
                    <div className="admin__status-btns">
                      {['pending', 'reviewed', 'replied'].map(s => (
                        <button key={s}
                          className={`admin__status-btn ${selected.status === s ? 'admin__status-btn--active' : ''}`}
                          style={selected.status === s ? { background: STATUS_COLORS[s].bg, color: STATUS_COLORS[s].color, borderColor: STATUS_COLORS[s].color } : {}}
                          onClick={() => updateStatus(selected._id, s)}
                        >{STATUS_COLORS[s].label}</button>
                      ))}
                    </div>
                  </div>
                  <a href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`} className="admin__reply-btn">Reply via Email →</a>
                </div>
              )}
            </div>
          </>
        )}

        {/* ── GALLERY TAB ── */}
        {tab === 'gallery' && (
          <div className="admin__gallery-layout">
            {/* Add/Edit Artwork Form */}
            <div className="admin__add-form-wrap">
              <h2 className="admin__table-title">{editId ? 'Edit Artwork' : 'Add New Artwork'}</h2>
              <form className="admin__add-form" onSubmit={handleSubmitArtwork}>
                <div className="admin__field">
                  <label className="admin__label">Title *</label>
                  <input className="admin__input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Silent Whisper" required maxLength={150} />
                </div>
                <div className="admin__field">
                  <label className="admin__label">Medium *</label>
                  <input className="admin__input" value={form.medium} onChange={e => setForm({ ...form, medium: e.target.value })} placeholder="e.g. Oil on Canvas" required maxLength={150} />
                </div>
                <div className="admin__field">
                  <label className="admin__label">Year *</label>
                  <input className="admin__input" type="number" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} min="1800" max="2099" required />
                </div>
                <div className="admin__field">
                  <label className="admin__label">Image URL OR Upload Image *</label>
                  <input className="admin__input" value={form.img} onChange={e => setForm({ ...form, img: e.target.value })} placeholder="https://images.unsplash.com/..." required />
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{ marginTop: '0.5rem', fontSize: '0.8rem' }} />
                  {form.img && <img src={form.img} alt="preview" className="admin__img-preview" onError={e => e.target.style.display = 'none'} />}
                </div>
                <div className="admin__field">
                  <label className="admin__label">Additional Images</label>
                  <input type="file" accept="image/*" multiple onChange={handleAdditionalImagesUpload} style={{ marginTop: '0.5rem', fontSize: '0.8rem' }} />
                  {form.additionalImages && form.additionalImages.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                      {form.additionalImages.map((imgSrc, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', background: '#f9fafb', borderRadius: '8px', padding: '0.75rem', border: '1px solid #e5e7eb' }}>
                          <div style={{ position: 'relative', flexShrink: 0 }}>
                            <img src={imgSrc} alt={`additional-${idx}`} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #ddd', display: 'block' }} />
                            <button type="button" onClick={() => removeAdditionalImage(idx)} style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', lineHeight: 1 }}>✕</button>
                          </div>
                          <div style={{ flex: 1 }}>
                            <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: '0.35rem' }}>Image {idx + 1} Caption</label>
                            <textarea
                              value={(form.additionalImageDescriptions || [])[idx] || ''}
                              onChange={e => {
                                const descs = [...(form.additionalImageDescriptions || form.additionalImages.map(() => ''))];
                                descs[idx] = e.target.value;
                                setForm(prev => ({ ...prev, additionalImageDescriptions: descs }));
                              }}
                              placeholder={`Caption for image ${idx + 1}…`}
                              maxLength={300}
                              rows={2}
                              style={{ width: '100%', resize: 'vertical', fontSize: '0.85rem', padding: '0.5rem 0.65rem', border: '1px solid #d1d5db', borderRadius: '6px', fontFamily: 'inherit', color: '#1a1a1a', background: '#fff', boxSizing: 'border-box' }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="admin__field">
                  <label className="admin__label">Description</label>
                  <textarea className="admin__input admin__textarea" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Short description of the artwork..." maxLength={1000} rows={3} />
                </div>
                <label className="admin__checkbox-label">
                  <input type="checkbox" checked={form.has360} onChange={e => setForm({ ...form, has360: e.target.checked })} />
                  Show 360° badge
                </label>
                {formError && <p className="admin__form-error">{formError}</p>}
                {formSuccess && <p className="admin__form-success">✅ Artwork {editId ? 'updated' : 'added to gallery'}!</p>}
                <div className="admin__form-actions" style={{ display: 'flex', gap: '0.5rem' }}>
                  <button type="submit" className="admin__add-btn" disabled={submitting} style={{ flex: 1 }}>
                    {submitting ? (editId ? 'Updating...' : 'Adding...') : (editId ? '✓ Update Gallery' : '+ Add to Gallery')}
                  </button>
                  {editId && (
                    <button type="button" className="admin__cancel-btn" onClick={handleCancelEdit} style={{ flex: '0 0 auto', padding: '0 1rem', background: '#f3f4f6', color: '#374151', border: '1px solid #e5e7eb', borderRadius: '8px', cursor: 'pointer', fontWeight: 500 }}>
                      Cancel
                    </button>
                  )}
                </div>
                {editId && (
                  <button type="button" onClick={() => handleDeleteArtwork(editId)} style={{ marginTop: '0.5rem', width: '100%', padding: '0.7rem', background: '#fff0f0', color: '#dc2626', border: '1.5px solid #fca5a5', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', transition: 'background 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#fee2e2'}
                    onMouseLeave={e => e.currentTarget.style.background = '#fff0f0'}
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                    Delete This Artwork
                  </button>
                )}
              </form>
            </div>

            {/* Artworks List */}
            <div className="admin__table-wrap">
              <div className="admin__table-header">
                <h2 className="admin__table-title">Gallery ({artworks.length} artworks)</h2>
                <button className="admin__refresh-btn" onClick={fetchArtworks}>↻ Refresh</button>
              </div>
              {loadingArtworks && <p className="admin__loading">Loading...</p>}
              {artworkError && <p className="admin__error">Error: {artworkError}</p>}
              {!loadingArtworks && artworks.length === 0 && <p className="admin__empty">No artworks in DB. Add one!</p>}
              {!loadingArtworks && artworks.length > 0 && (
                <div className="admin__artwork-grid">
                  {artworks.map(art => (
                    <article className="art-card art-card--admin" key={art._id} style={{ cursor: 'default' }}>
                      <div className="art-card__image-wrap">
                        <img src={art.img} alt={art.title} className="art-card__image" loading="lazy" />
                        {art.has360 && (
                          <span className="art-card__badge" aria-label="360 degree view available">360°</span>
                        )}
                        <button
                          className="admin__artwork-edit"
                          onClick={(e) => { e.stopPropagation(); handleEditArtwork(art); }}
                          title="Edit artwork"
                          style={{ position: 'absolute', bottom: '0.8rem', left: '0.8rem', zIndex: 30, background: 'rgba(255,255,255,0.97)', border: '1.5px solid #d1d5db', borderRadius: '8px', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a1a1a', boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }}
                        >
                          <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                        </button>

                        <button
                          className="admin__artwork-delete"
                          onClick={(e) => { e.stopPropagation(); handleDeleteArtwork(art._id); }}
                          title="Remove artwork"
                          style={{ position: 'absolute', bottom: '0.8rem', right: '0.8rem', zIndex: 30, background: 'rgba(255,255,255,0.97)', border: '1.5px solid #fca5a5', borderRadius: '8px', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626', boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }}
                        >
                          <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                        </button>
                      </div>
                      <div className="art-card__info" style={{ padding: '0.9rem 0 0', borderTop: 'none', marginTop: '0.5rem' }}>
                        <div className="art-card__info-left">
                          <h3 className="art-card__title" style={{ fontSize: '0.95rem', marginBottom: '0.15rem' }}>{art.title}</h3>
                          <p className="art-card__meta" style={{ fontSize: '0.72rem', color: '#9ca3af' }}>{art.medium}, {art.year}</p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
