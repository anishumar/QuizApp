import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Home Component - Landing page with difficulty selection
 * Provides clean interface for users to choose quiz difficulty
 * Implements accessibility features and responsive design
 */
const Home = () => {
  const [difficulty, setDifficulty] = useState('');
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    if (difficulty) {
      navigate(`/quiz?difficulty=${difficulty}`);
    }
  };

  const difficulties = [
    { value: 'easy', label: 'Easy', description: 'Basic questions' },
    { value: 'medium', label: 'Medium', description: 'Moderate difficulty' },
    { value: 'hard', label: 'Hard', description: 'Challenging questions' }
  ];

  return (
    <div className="container">
      <div className="app-header">
        <h1 className="app-title">Knowledge Challenge</h1>
        <p className="app-subtitle">Test your expertise across multiple difficulty levels</p>
      </div>
      
      <div className="difficulty-selector">
        <h2 className="difficulty-title">Select Your Challenge Level</h2>
        <div className="difficulty-horizontal">
          {difficulties.map((diff) => (
            <div
              key={diff.value}
              className={`difficulty-card ${difficulty === diff.value ? 'selected' : ''}`}
              onClick={() => setDifficulty(diff.value)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setDifficulty(diff.value);
                }
              }}
            >
              <div className="difficulty-name">{diff.label}</div>
              <div className="difficulty-description">{diff.description}</div>
            </div>
          ))}
        </div>
        
        <button
          className="btn btn-primary"
          onClick={handleStartQuiz}
          disabled={!difficulty}
          style={{ 
            padding: '16px 48px', 
            fontSize: '18px',
            minWidth: '200px'
          }}
        >
          Begin Challenge
        </button>
      </div>
    </div>
  );
};

export default Home;
