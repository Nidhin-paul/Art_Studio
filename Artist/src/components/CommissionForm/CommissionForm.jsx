import { useState } from 'react'
import './CommissionForm.css'

export default function CommissionForm() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit inquiry.')
      }

      setSubmitted(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="commission" id="contact">
      <div className="container">
        <div className="commission__inner">
          <div className="commission__header">
            <span className="section-label" id="commission-label">Inquiry</span>
            <h2 className="commission__title" id="commission-title">
              Commission Inquiries
            </h2>
            <p className="commission__subtitle">
              For custom commissions, exhibition inquiries, or to discuss a creative<br />
              collaboration, fill out the form below.
            </p>
          </div>

          {submitted ? (
            <div className="commission__success" id="commission-success">
              <div className="commission__success-icon">✓</div>
              <h3>Thank you for reaching out!</h3>
              <p>Eliza will respond to your inquiry within 2–3 business days.</p>
              <button
                className="commission__reset-btn"
                onClick={() => { setSubmitted(false); setForm({ fullName: '', email: '', subject: '', message: '' }) }}
              >
                Send another inquiry
              </button>
            </div>
          ) : (
            <form className="commission__form" onSubmit={handleSubmit} id="commission-form">
              {/* Security: Honeypot field to catch spam bots */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <label htmlFor="botcheck">Don't fill this out if you're human:</label>
                <input type="text" name="botcheck" id="botcheck" />
              </div>

              <div className="commission__row">
                <div className="commission__field">
                  <label htmlFor="fullName" className="commission__label">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    className="commission__input"
                    placeholder="John Doe"
                    value={form.fullName}
                    onChange={handleChange}
                    maxLength="100"
                    required
                  />
                </div>
                <div className="commission__field">
                  <label htmlFor="email" className="commission__label">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="commission__input"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={handleChange}
                    maxLength="150"
                    required
                  />
                </div>
              </div>

              <div className="commission__field">
                <label htmlFor="subject" className="commission__label">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="commission__input"
                  placeholder="Private Commission"
                  value={form.subject}
                  onChange={handleChange}
                  maxLength="200"
                  required
                />
              </div>

              <div className="commission__field">
                <label htmlFor="message" className="commission__label">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="commission__textarea"
                  placeholder="Tell me about your interest or specific artwork..."
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  maxLength="2000"
                  required
                />
              </div>

              <div className="commission__footer">
                {error && <p className="commission__error" style={{color: 'red', fontSize: '0.8rem', marginBottom: '1rem'}}>{error}</p>}
                <button 
                  type="submit" 
                  className="commission__submit" 
                  id="send-inquiry-btn"
                  disabled={isSubmitting}
                  style={{ opacity: isSubmitting ? 0.7 : 1 }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Inquiry →'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
