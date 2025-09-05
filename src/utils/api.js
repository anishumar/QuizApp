import axios from 'axios';
import questionsData from '../data/questions.json';

/**
 * API Utility - Handles question fetching with fallback
 * Primary: Open Trivia DB API with error handling
 * Fallback: Local questions.json for offline functionality
 */
const API_BASE_URL = 'https://opentdb.com/api.php';

export const fetchQuestions = async (difficulty = 'medium', amount = 10) => {
  try {
    const response = await axios.get(API_BASE_URL, {
      params: {
        amount,
        difficulty,
        type: 'multiple'
      },
      timeout: 10000 // 10 second timeout
    });

    if (response.data.response_code === 0) {
      return response.data.results.map((q, index) => ({
        id: index,
        question: decodeHtml(q.question),
        correct_answer: decodeHtml(q.correct_answer),
        incorrect_answers: q.incorrect_answers.map(answer => decodeHtml(answer)),
        difficulty: q.difficulty,
        category: q.category
      }));
    } else {
      throw new Error(`API Error: Response code ${response.data.response_code}`);
    }
  } catch (error) {
    console.warn('API failed, using local questions:', error.message);
    
    // Fallback to local questions
    const localQuestions = questionsData[difficulty] || questionsData.medium;
    const shuffledQuestions = localQuestions.sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffledQuestions.slice(0, Math.min(amount, localQuestions.length));
    
    return selectedQuestions.map((q, index) => ({
      id: index,
      question: q.question,
      correct_answer: q.correct_answer,
      incorrect_answers: q.incorrect_answers,
      difficulty: q.difficulty,
      category: q.category
    }));
  }
};

const decodeHtml = (html) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};
