import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Results Component - Score display and answer analysis
 * Shows final score, detailed results, and high score tracking
 * Implements restart functionality and persistent score storage
 */
const Results = () => {
  const [quizResults, setQuizResults] = useState(null);
  const [highScores, setHighScores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const results = localStorage.getItem('quizResults');
    if (results) {
      const parsedResults = JSON.parse(results);
      setQuizResults(parsedResults);
      
      // Load high scores
      const savedHighScores = localStorage.getItem('quizHighScores');
      if (savedHighScores) {
        setHighScores(JSON.parse(savedHighScores));
      }
    } else {
      // No results found, redirect to home
      navigate('/');
    }
  }, [navigate]);

  const handleRestart = () => {
    localStorage.removeItem('quizResults');
    navigate('/');
  };

  const saveHighScore = () => {
    if (!quizResults) return;
    
    const newHighScore = {
      score: quizResults.score,
      total: quizResults.totalQuestions,
      difficulty: quizResults.difficulty,
      date: new Date().toLocaleDateString(),
      percentage: Math.round((quizResults.score / quizResults.totalQuestions) * 100)
    };

    const updatedHighScores = [...highScores, newHighScore]
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 10); // Keep only top 10

    setHighScores(updatedHighScores);
    localStorage.setItem('quizHighScores', JSON.stringify(updatedHighScores));
  };

  const getScoreMessage = (score, total) => {
    const percentage = Math.round((score / total) * 100);
    
    if (percentage >= 90) return { message: "Outstanding! 🌟", color: "#28a745" };
    if (percentage >= 80) return { message: "Excellent! 🎉", color: "#28a745" };
    if (percentage >= 70) return { message: "Good job! 👍", color: "#ffc107" };
    if (percentage >= 60) return { message: "Not bad! 😊", color: "#fd7e14" };
    return { message: "Keep practicing! 💪", color: "#dc3545" };
  };

  if (!quizResults) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
          <div className="loading-text">Calculating Your Results</div>
          <div className="loading-subtext">Analyzing your performance...</div>
        </div>
      </div>
    );
  }

  const { questions, selectedAnswers, score, totalQuestions, difficulty } = quizResults;
  const scoreInfo = getScoreMessage(score, totalQuestions);

  return (
    <div className="container">
      {/* Score Display */}
      <div className="results-header">
        <h1 className="results-title">{scoreInfo.message}</h1>
        <div className="results-score">{score}/{totalQuestions}</div>
        <div className="results-percentage">
          {Math.round((score / totalQuestions) * 100)}% Correct
        </div>
        <div className="results-difficulty">
          Difficulty: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </div>
      </div>

      {/* High Scores Section */}
      {highScores.length > 0 && (
        <div className="high-scores">
          <h3 className="high-scores-title">
            <span>🏆</span>
            <span>High Scores</span>
          </h3>
          <div className="high-scores-grid">
            {highScores.slice(0, 5).map((highScore, index) => (
              <div key={index} className="high-score-item">
                <div className="high-score-percentage">{highScore.percentage}%</div>
                <div className="high-score-meta">
                  {highScore.difficulty} • {highScore.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detailed Results */}
      <div className="results-summary">
        <h3 className="results-summary-title">
          <span>📋</span>
          <span>Detailed Results</span>
        </h3>
        
        {questions.map((question, index) => {
          const userAnswer = selectedAnswers[index];
          const isCorrect = userAnswer?.isCorrect;
          
          return (
            <div 
              key={index} 
              className={`result-item ${isCorrect ? 'correct' : 'incorrect'}`}
            >
              <div className="result-question">
                Q{index + 1}: {question.question}
              </div>
              
              <div className="result-answer correct">
                <span>✅</span>
                <span>Correct Answer: {userAnswer?.correct}</span>
              </div>
              
              {userAnswer?.selected && userAnswer.selected !== 'skipped' && (
                <div className={`result-answer ${isCorrect ? 'correct' : 'incorrect'}`}>
                  <span>{isCorrect ? '✅' : '❌'}</span>
                  <span>Your Answer: {userAnswer.selected}</span>
                </div>
              )}
              
              {userAnswer?.selected === 'skipped' && (
                <div className="result-answer user-selected">
                  <span>⏭️</span>
                  <span>Question Skipped</span>
                </div>
              )}
              
              {!userAnswer?.selected && (
                <div className="result-answer user-selected">
                  <span>⏰</span>
                  <span>Time ran out - No answer selected</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="navigation" style={{ justifyContent: 'center', gap: '15px' }}>
        <button
          className="btn btn-outline"
          onClick={() => navigate('/')}
        >
          🏠 Home
        </button>
        
        <button
          className="btn btn-primary"
          onClick={handleRestart}
        >
          🔄 Try Again
        </button>
        
        {highScores.length < 10 && (
          <button
            className="btn btn-success"
            onClick={saveHighScore}
          >
            💾 Save Score
          </button>
        )}
      </div>
    </div>
  );
};

export default Results;
