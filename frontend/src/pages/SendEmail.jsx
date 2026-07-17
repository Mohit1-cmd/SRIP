import React, { useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:8001/api';

export default function SendEmail() {
  const [form, setForm] = useState({
    email: '',
    name: '',
    position_title: 'Research Internship',
  });
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email.trim()) return;
    setStatus('sending');
    setMessage('');

    axios.post(`${API_BASE}/send-email/`, form)
      .then(res => {
        setStatus('success');
        setMessage(res.data.message || `Email sent to ${form.email}!`);
        setForm(prev => ({ ...prev, email: '', name: '' }));
      })
      .catch(err => {
        setStatus('error');
        const errMsg = err.response?.data?.error || 'Something went wrong. Check the backend logs.';
        setMessage(errMsg);
      });
  };

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto' }}>
      {/* Header */}
      <div className="page-header">
        <h1>Send Onboarding Email</h1>
        <p>Manually dispatch the SRIP onboarding email to any address. The email will include the Anumati login instructions.</p>
      </div>

      {/* Card */}
      <div className="section-card">
        <div className="section-header">
          <h2>Compose</h2>
          <span className="section-badge">POST /api/send-email/</span>
        </div>
        <div className="section-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="se-email">
                Recipient Email Address *
              </label>
              <input
                id="se-email"
                type="email"
                name="email"
                required
                className="form-control"
                placeholder="student@gmail.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="se-name">
                Recipient Name
              </label>
              <input
                id="se-name"
                type="text"
                name="name"
                className="form-control"
                placeholder="e.g. Mohit Khapekar"
                value={form.name}
                onChange={handleChange}
              />
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                Leave blank and the email will address them as "Applicant"
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="se-position">
                Position Title (shown in email body)
              </label>
              <input
                id="se-position"
                type="text"
                name="position_title"
                className="form-control"
                placeholder="e.g. Research Intern - NLP & Knowledge Graphs"
                value={form.position_title}
                onChange={handleChange}
              />
            </div>

            {/* Status Banner */}
            {status === 'success' && (
              <div style={{
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.85rem 1rem',
                marginBottom: '1.25rem',
                color: '#34d399',
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
              }}>
                ✅ {message}
              </div>
            )}
            {status === 'error' && (
              <div style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.85rem 1rem',
                marginBottom: '1.25rem',
                color: '#f87171',
                fontSize: '0.95rem',
              }}>
                ❌ {message}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={status === 'sending'}
                style={{ minWidth: '160px' }}
              >
                {status === 'sending' ? 'Sending…' : 'Send Email →'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Preview Card */}
      <div className="section-card" style={{ marginTop: '2rem' }}>
        <div className="section-header">
          <h2>Email Preview</h2>
          <span className="section-badge">live preview</span>
        </div>
        <div className="section-body">
          <pre style={{
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            padding: '1.25rem',
            fontFamily: 'monospace',
            fontSize: '0.82rem',
            color: 'var(--text-secondary)',
            whiteSpace: 'pre-wrap',
            lineHeight: '1.7',
          }}>
{`Subject: Application Received – ${form.position_title || 'Research Internship'} | WSL Lab, IIITB

Hi ${form.name || 'Applicant'},

Thank you for applying! We have received your application for the
${form.position_title || 'Research Internship'} position at WSL Lab, IIIT Bangalore.

Our team will review your details and get back to you shortly.

────────────────────────────────────────
NEXT STEP — SET UP YOUR ANUMATI LOCKER
────────────────────────────────────────
We use Anumati, a consent-based document locker, to collect
your supporting documents securely. We have pre-created an
account for you.

  Login URL : https://anumati1.iiitb.ac.in/login
  Username  : ${form.email || 'their-email@gmail.com'}

Once logged in:
  1. Create a locker named  →  SRIP Application
  2. Upload your CV, transcript, and Statement of Purpose
  3. Accept the connection request from our lab to share
     your documents with us.

────────────────────────────────────────

If you have any questions, just reply to this email.

Best regards,
WSL Lab, IIIT Bangalore
https://wsl.iiitb.ac.in`}
          </pre>
        </div>
      </div>
    </div>
  );
}
