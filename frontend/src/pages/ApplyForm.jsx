import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ApplyForm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const positionId = searchParams.get('position') || '';
  const positionTitle = searchParams.get('title') || 'Research Internship';

  const [formData, setFormData] = useState({
    position: positionId,
    full_name: '',
    date_of_birth: '',
    phone_number: '',
    email: '',
    institute: '',
    roll_number: '',
    programme: '',
    cgpa: '',
    preferred_faculty: '',
    mode: 'Remote',
    requested_duration_start: '',
    requested_duration_end: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const apiBaseUrl = 'http://localhost:8001/api';
    
    axios.post(`${apiBaseUrl}/applications/`, {
      ...formData,
      position: formData.position ? parseInt(formData.position) : null
    })
    .then(response => {
      setSubmitting(false);
      navigate('/success', { state: { name: formData.full_name, email: formData.email } });
    })
    .catch(err => {
      // Extract error message from API if available
      let errorMsg = 'Failed to submit application. Please try again.';
      if (err.response && err.response.data) {
        if (err.response.data.email) {
          errorMsg = err.response.data.email[0];
        } else if (typeof err.response.data === 'string') {
          errorMsg = err.response.data;
        } else {
          errorMsg = JSON.stringify(err.response.data);
        }
      }
      
      console.warn('API submission failed:', err);
      
      // If we got an actual response error from our API, display it and stop.
      // E.g., duplicate email.
      if (err.response) {
        setError(errorMsg);
        setSubmitting(false);
      } else {
        // Handle actual network error
        setError('Network error. Please try again later.');
        setSubmitting(false);
      }
    });
  };

  return (
    <div className="form-container" style={{ paddingBottom: '4rem' }}>
      <div className="apply-hero">
        <div className="apply-hero-subtitle">Student Research Internship Portal · SRIP</div>
        <h1>Application: {positionTitle}</h1>
        <p>Fields below are tagged to show how each one is meant to be handled in a consent-aware design — see the key underneath.</p>
      </div>

      <div className="stepper-card">
        <div className="step active">
          <div className="step-circle">1</div>
          <span>Application Details</span>
        </div>
        <div className="step-divider"></div>
        <div className="step inactive">
          <div className="step-circle">2</div>
          <span>Document Verification — Anumati Locker</span>
        </div>
      </div>

      <div className="tags-info-box">
        <div className="tag-info-item">
          <span className="tag-icon tag-ecma">*</span>
          <div>
            <h4>ECMA</h4>
            <p>Acts as a rule/condition governing a data flow — not a raw value itself.</p>
          </div>
        </div>
        <div className="tag-info-item">
          <span className="tag-icon tag-zkp">#</span>
          <div>
            <h4>ZKP</h4>
            <p>Only a boolean/threshold proof is needed — the raw value doesn't have to be disclosed.</p>
          </div>
        </div>
        <div className="tag-info-item">
          <span className="tag-icon tag-dpdp">$</span>
          <div>
            <h4>DPDP</h4>
            <p>Personal data under DPDP 2023 — requires a lawful basis and consent.</p>
          </div>
        </div>
      </div>

      {error && (
        <div style={{ color: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: 'var(--radius-sm)', margin: '1.5rem 0', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        
        {/* Section 1 */}
        <div className="section-card">
          <div className="section-header">
            <h2>1. Applicant Identity</h2>
            <span className="section-badge">§1</span>
          </div>
          <div className="section-body">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="full_name">
                  Full Name <span className="tag-icon tag-dpdp">$</span>
                </label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  required
                  className="form-control"
                  placeholder="As per institution records"
                  value={formData.full_name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="date_of_birth">
                  Date of Birth <span className="tag-icon tag-dpdp">$</span><span className="tag-icon tag-zkp">#</span>
                </label>
                <input
                  type="date"
                  id="date_of_birth"
                  name="date_of_birth"
                  required
                  className="form-control"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                />
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Most workflows only need "age ≥ 18: yes/no"</div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="phone_number">
                  Contact Number <span className="tag-icon tag-dpdp">$</span>
                </label>
                <input
                  type="tel"
                  id="phone_number"
                  name="phone_number"
                  required
                  className="form-control"
                  placeholder="+91"
                  value={formData.phone_number}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email Address <span className="tag-icon tag-dpdp">$</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="form-control"
                  placeholder="name@institution.edu"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="section-card">
          <div className="section-header">
            <h2>2. Academic Record</h2>
            <span className="section-badge">§2</span>
          </div>
          <div className="section-body">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="institute">
                  Institution Name
                </label>
                <input
                  type="text"
                  id="institute"
                  name="institute"
                  required
                  className="form-control"
                  placeholder="University / college"
                  value={formData.institute}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="roll_number">
                  Enrollment / Roll Number <span className="tag-icon tag-dpdp">$</span>
                </label>
                <input
                  type="text"
                  id="roll_number"
                  name="roll_number"
                  required
                  className="form-control"
                  placeholder=""
                  value={formData.roll_number}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="programme">
                  Degree Program / Branch
                </label>
                <input
                  type="text"
                  id="programme"
                  name="programme"
                  required
                  className="form-control"
                  placeholder="e.g. B.Tech CSE"
                  value={formData.programme}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="cgpa">
                  CGPA <span className="tag-icon tag-dpdp">$</span><span className="tag-icon tag-zkp">#</span>
                </label>
                <input
                  type="text"
                  id="cgpa"
                  name="cgpa"
                  required
                  className="form-control"
                  placeholder="0.00"
                  value={formData.cgpa}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="section-card">
          <div className="section-header">
            <h2>3. Internship Request Parameters</h2>
            <span className="section-badge">§3</span>
          </div>
          <div className="section-body">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="preferred_faculty">
                  Preferred Faculty / Lab
                </label>
                <input
                  type="text"
                  id="preferred_faculty"
                  name="preferred_faculty"
                  className="form-control"
                  value={formData.preferred_faculty}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="mode">
                  Mode
                </label>
                <select
                  id="mode"
                  name="mode"
                  className="form-control"
                  value={formData.mode}
                  onChange={handleChange}
                >
                  <option value="Remote">Remote</option>
                  <option value="In-person">In-person</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Requested Duration <span className="tag-icon tag-ecma">*</span>
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <input
                  type="date"
                  id="requested_duration_start"
                  name="requested_duration_start"
                  required
                  className="form-control"
                  value={formData.requested_duration_start}
                  onChange={handleChange}
                />
                <span style={{ color: 'var(--text-muted)' }}>to</span>
                <input
                  type="date"
                  id="requested_duration_end"
                  name="requested_duration_end"
                  required
                  className="form-control"
                  value={formData.requested_duration_end}
                  onChange={handleChange}
                />
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                Defines the consent_window that governs how long shared data stays valid
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={submitting}
            style={{ padding: '1rem 2rem', fontSize: '1rem' }}
          >
            {submitting ? 'Submitting...' : 'Continue to Document Verification →'}
          </button>
        </div>
      </form>
    </div>
  );
}
