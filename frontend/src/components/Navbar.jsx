import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const isHomeActive = location.pathname === '/' || location.pathname.startsWith('/srip');

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <svg className="navbar-logo" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '32px', height: '32px' }}>
          <circle cx="50" cy="50" r="45" stroke="#6366f1" strokeWidth="10" />
          <path d="M30 50L45 65L70 35" stroke="#6366f1" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>WSL Lab, IIITB</span>
      </Link>
      <div className="navbar-nav">
        <Link 
          to="/" 
          className={`navbar-link ${isHomeActive ? 'active' : ''}`}
        >
          Internships
        </Link>
        <Link
          to="/send-email"
          className={`navbar-link ${location.pathname === '/send-email' ? 'active' : ''}`}
        >
          Send Email
        </Link>
        <a 
          href="https://anumati1.iiitb.ac.in" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="navbar-link"
        >
          Anumati CMS
        </a>
      </div>
    </nav>
  );
}
