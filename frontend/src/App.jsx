import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PositionsList from './pages/PositionsList';
import ApplyForm from './pages/ApplyForm';
import SubmitSuccess from './pages/SubmitSuccess';
import SendEmail from './pages/SendEmail';

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<PositionsList />} />
            <Route path="/apply" element={<ApplyForm />} />
            <Route path="/success" element={<SubmitSuccess />} />
            <Route path="/send-email" element={<SendEmail />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>© {new Date().getFullYear()} WSL Lab, IIIT Bangalore. All rights reserved.</p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>
            Powered by Anumati CMS (DPI Primitive)
          </p>
        </footer>
      </div>
    </Router>
  );
}
