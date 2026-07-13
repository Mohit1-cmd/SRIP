import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MOCK_POSITIONS = [
  {
    id: 1,
    title: 'Research Intern - NLP & Knowledge Graphs',
    duration: 'May–July 2025 (8 weeks)',
    eligibility: 'Pre-final/Final year UG or PG students in CS/IT or allied branches. Prior experience in Python and NLP frameworks is required.',
    description: 'Work on building dense knowledge graphs and extracting relations from raw academic articles. You will collaborate on developing state-of-the-art information extraction systems.'
  },
  {
    id: 2,
    title: 'Research Intern - Privacy-Preserving DPI Models',
    duration: 'June–August 2025 (12 weeks)',
    eligibility: 'BTech/MTech/PhD students with interests in cryptography, decentralized identity (W3C DID), and consent frameworks.',
    description: 'Explore cryptographic primitives (zero-knowledge proofs, secure multi-party computation) and implement locker-and-connection extensions within the Anumati consent ecosystem.'
  },
  {
    id: 3,
    title: 'Frontend Engineer Intern - Consent Management Portal',
    duration: 'May–July 2025 (8 weeks)',
    eligibility: 'UG students with strong React, CSS, and UI design skills. Understanding of web authentication and RESTful APIs is a plus.',
    description: 'Design and build interactive dashboards to visualize consent graphs, connection permissions, and resource lineages for Anumati.'
  }
];

export default function PositionsList() {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const apiBaseUrl = 'http://localhost:8001/api';
    axios.get(`${apiBaseUrl}/positions/`)
      .then(response => {
        // If empty, fallback to mock data
        if (response.data && response.data.length > 0) {
          setPositions(response.data);
        } else {
          setPositions(MOCK_POSITIONS);
        }
        setLoading(false);
      })
      .catch(err => {
        console.warn('API connection failed, falling back to mock positions:', err);
        setPositions(MOCK_POSITIONS);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Loading open positions...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1>Student Research Internship Programme (SRIP)</h1>
        <p>Join Web Science Lab (WSL) at IIIT Bangalore. Work on cutting-edge research in NLP, Knowledge Graphs, and Privacy-Preserving Digital Public Infrastructures.</p>
      </div>

      <div className="positions-grid">
        {positions.map(pos => (
          <div key={pos.id} className="position-card">
            <div>
              <h3 className="position-card-title">{pos.title}</h3>
              <div className="position-meta-container">
                <span className="position-tag">{pos.duration}</span>
              </div>
              <p className="position-desc">{pos.description}</p>
              <div className="position-eligibility">
                <strong>Eligibility:</strong> {pos.eligibility}
              </div>
            </div>
            <button 
              className="btn btn-primary"
              onClick={() => navigate(`/apply?position=${pos.id}&title=${encodeURIComponent(pos.title)}`)}
            >
              Express Interest
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
