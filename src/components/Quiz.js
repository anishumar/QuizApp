import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchQuestions } from '../utils/api';

/**
 * Quiz Component - Main quiz interface
 * Handles question display, answer selection, timer, and navigation
 * Implements all core quiz functionality with error handling
 */
const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [currentOptions, setCurrentOptions] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const difficulty = new URLSearchParams(location.search).get('difficulty') || 'medium';

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      // Handle timeout - select no answer
      const currentQuestion = questions[currentQuestionIndex];
      if (currentQuestion) {
        const isCorrect = false; // Timeout means incorrect
        
        setSelectedAnswers(prev => ({
          ...prev,
          [currentQuestionIndex]: {
            selected: null,
            correct: currentQuestion.correct_answer,
            isCorrect
          }
        }));

        setIsAnswered(true);
        setShowCorrectAnswer(true);
      }
    }
  }, [timeLeft, isAnswered, questions, currentQuestionIndex]);

  // Fetch questions from API
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        const questionsData = await fetchQuestions(difficulty, 10);
        setQuestions(questionsData);
      } catch (err) {
        setError(err.message);
        // eslint-disable-next-line no-console
        console.error('Error fetching questions:', err);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [difficulty]);

  // Shuffle options when question changes
  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex < questions.length) {
      const currentQuestion = questions[currentQuestionIndex];
      const options = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
      const shuffledOptions = options.sort(() => Math.random() - 0.5);
      setCurrentOptions(shuffledOptions);
    }
  }, [questions, currentQuestionIndex]);


  const handleAnswerSelect = (selectedAnswer) => {
    if (isAnswered) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correct_answer;
    
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: {
        selected: selectedAnswer,
        correct: currentQuestion.correct_answer,
        isCorrect
      }
    }));

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setIsAnswered(true);
    setShowCorrectAnswer(true);
  };

  const handleSkip = () => {
    if (isAnswered) return; // Can't skip if already answered
    
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = false; // Skipped means incorrect
    
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: {
        selected: 'skipped',
        correct: currentQuestion.correct_answer,
        isCorrect
      }
    }));

    setIsAnswered(true);
    setShowCorrectAnswer(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setIsAnswered(false);
      setShowCorrectAnswer(false);
      setTimeLeft(30);
    } else {
      // Quiz completed, navigate to results
      const quizResults = {
        questions,
        selectedAnswers,
        score,
        totalQuestions: questions.length,
        difficulty
      };
      localStorage.setItem('quizResults', JSON.stringify(quizResults));
      navigate('/results');
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setIsAnswered(false);
      setShowCorrectAnswer(false);
      setTimeLeft(30);
    }
  };

  const getTimerClass = () => {
    if (timeLeft <= 5) return 'timer danger';
    if (timeLeft <= 10) return 'timer warning';
    return 'timer';
  };

  const getOptionClass = (option) => {
    if (!showCorrectAnswer) {
      return selectedAnswers[currentQuestionIndex]?.selected === option ? 'option-btn selected' : 'option-btn';
    }
    
    const currentAnswer = selectedAnswers[currentQuestionIndex];
    if (option === currentAnswer?.correct) {
      return 'option-btn correct';
    }
    if (option === currentAnswer?.selected && !currentAnswer?.isCorrect) {
      return 'option-btn incorrect';
    }
    return 'option-btn';
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
          <div className="loading-text">Preparing Your Challenge</div>
          <div className="loading-subtext">Loading questions and setting up the quiz...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">
          <div className="error-icon">⚠️</div>
          <h3 className="error-title">Challenge Unavailable</h3>
          <p className="error-message">{error}</p>
          <button 
            className="btn btn-primary" 
            onClick={() => window.location.reload()}
          >
            Retry Challenge
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="container">
        <div className="error">
          <div className="error-icon">📚</div>
          <h3 className="error-title">No Questions Available</h3>
          <p className="error-message">We couldn't find any questions for the selected difficulty level.</p>
          <button 
            className="btn btn-primary" 
            onClick={() => navigate('/')}
          >
            Choose Different Level
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="container">
      <div className="quiz-container">
        {/* Header with progress and timer */}
        <div className="question-header">
          <div className="question-meta">
            <div className="question-number">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
            <div className={getTimerClass()}>
              <span>⏱️</span>
              <span>{timeLeft}s</span>
            </div>
          </div>
          
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          
          <div className="question-text">
            {currentQuestion.question}
          </div>
        </div>

        {/* Question options */}
        <div className="question-options">
          {currentOptions.map((option, index) => (
            <button
              key={index}
              className={getOptionClass(option)}
              onClick={() => handleAnswerSelect(option)}
              disabled={isAnswered}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="navigation">
          <div className="navigation-buttons">
            <button
              className="btn btn-secondary"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              ← Previous
            </button>
            
            <button
              className="btn btn-outline"
              onClick={handleSkip}
              disabled={isAnswered}
            >
              Skip
            </button>
            
            <button
              className="btn btn-primary"
              onClick={handleNext}
              disabled={!isAnswered && timeLeft > 0}
            >
              {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next →'}
            </button>
          </div>
          
          <div className="score-display">
            <span>Score: {score}/{currentQuestionIndex + (isAnswered ? 1 : 0)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
