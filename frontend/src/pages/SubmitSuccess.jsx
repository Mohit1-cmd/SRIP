import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function SubmitSuccess() {
  const { state } = useLocation();
  const studentName = state?.name || 'Applicant';
  const studentEmail = state?.email || 'your email';

  return (
    <div className="success-card">
      <div className="success-icon">✓</div>
      <h2 className="success-title">Expression Submitted!</h2>
      <p className="success-msg">
        Thank you, <strong>{studentName}</strong>. We have successfully registered your interest. 
        An automated onboarding invitation has been triggered to <strong>{studentEmail}</strong>.
      </p>

      <div className="steps-list">
        <h4 style={{ marginBottom: '1.25rem', color: 'var(--text-primary)', fontWeight: '600' }}>
          Follow these steps to complete your application:
        </h4>
        
        <div className="step-item">
          <div className="step-number">1</div>
          <div className="step-text">
            Check your email for the pre-registration invite. (Check spam folder if not found).
          </div>
        </div>

        <div className="step-item">
          <div className="step-number">2</div>
          <div className="step-text">
            Go to <strong>Anumati CMS</strong> and sign up using your email: <code>{studentEmail}</code>.
          </div>
        </div>

        <div className="step-item">
          <div className="step-number">3</div>
          <div className="step-text">
            Create a locker in Anumati named: <code>SRIP Application</code>.
          </div>
        </div>

        <div className="step-item">
          <div className="step-number">4</div>
          <div className="step-text">
            Upload your <strong>CV / Resume</strong>, <strong>Unofficial Transcript</strong>, and <strong>Statement of Purpose</strong> into that locker.
          </div>
        </div>

        <div className="step-item">
          <div className="step-number">5</div>
          <div className="step-text">
            You will receive a Connection Request from <strong>WSL Lab</strong>. Accept it to securely share your files with us!
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
        <Link to="/" className="btn" style={{ backgroundColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
          Back to Positions
        </Link>
        <a 
          href="https://anumati1.iiitb.ac.in" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn-primary"
        >
          Go to Anumati
        </a>
      </div>
    </div>
  );
}
