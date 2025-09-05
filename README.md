# Quiz App - React Challenge Submission

A modern, responsive quiz application built with React that demonstrates front-end fundamentals, state management, and clean UI/UX design.

## 🎯 Assignment Requirements Met

### ✅ UI/UX Requirements
- **Clean, responsive layout** that works on desktop and mobile
- **One question at a time** with four multiple-choice options
- **Prominent navigation** with Next, Previous, and Skip functionality
- **Clear score and progress display** with visual progress bar
- **Modern typography** using Inter font family

### ✅ Core Features
- **Quiz Page**: Loads 10 multiple-choice questions from Open Trivia DB API
- **Single question display** with 4 shuffled options
- **Answer selection** required before proceeding
- **Score tracking** for correct/incorrect selections
- **Results page** with detailed answer analysis and restart functionality

### ✅ Technical Requirements
- **React functional components** with useState and useEffect hooks
- **Effective props usage** for component communication
- **Custom CSS styling** with modern design system
- **State management** for complete quiz flow
- **React Router** with /quiz and /results routes

### ✅ Bonus Features Implemented
- **Timer per question** (30 seconds) with auto-lock
- **Progress indicator** with visual progress bar
- **Difficulty levels** (Easy, Medium, Hard)
- **Persistent high scores** via localStorage
- **Smooth animations** and hover effects
- **Accessibility features** with keyboard navigation

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation & Running

```bash
# Clone the repository
git clone <repository-url>
cd quizapp

# Install dependencies
npm install

# Start development server
npm start

# Open http://localhost:3000 in your browser
```

### Building for Production

```bash
npm run build
```

## 🏗️ Architecture & Design Decisions

### Component Structure
```
src/
├── components/
│   ├── Home.js          # Landing page with difficulty selection
│   ├── Quiz.js          # Main quiz interface with timer
│   └── Results.js       # Results page with score analysis
├── utils/
│   └── api.js           # API utility with fallback to local data
├── data/
│   └── questions.json   # Local questions fallback
├── App.js               # Main app with routing
└── index.css            # Global styles and responsive design
```

### State Management
- **useState** for component-level state (questions, answers, score, timer)
- **useEffect** for side effects (API calls, timers, localStorage)
- **Props** for passing data between components
- **localStorage** for persistent high scores

### API Integration
- **Primary**: Open Trivia DB API with error handling
- **Fallback**: Local questions.json for offline functionality
- **Error states**: Graceful handling of network issues

### Responsive Design
- **Mobile-first approach** with breakpoints at 768px and 480px
- **Flexible layouts** that adapt to all screen sizes
- **Touch-friendly** buttons and interactions

## 🎨 Key Features

### Quiz Experience
- **Difficulty Selection**: Choose between Easy, Medium, or Hard
- **Question Timer**: 30-second countdown with visual warnings
- **Answer Options**: 4 shuffled multiple-choice options
- **Skip Functionality**: Skip questions you're unsure about
- **Progress Tracking**: Visual progress bar and question counter

### Results & Scoring
- **Final Score**: Clear display of correct answers vs total
- **Answer Review**: See which answers were correct/incorrect
- **High Score Tracking**: Persistent storage of top scores
- **Restart Option**: Easy way to try again

### Technical Excellence
- **Error Handling**: Comprehensive error states and recovery
- **Performance**: Optimized rendering and state updates
- **Accessibility**: Keyboard navigation and ARIA labels
- **Code Quality**: Clean, commented, and maintainable code

## 🧪 Testing & Edge Cases

### Handled Scenarios
- ✅ Network connectivity issues
- ✅ Empty or malformed API responses
- ✅ Rapid user interactions
- ✅ Browser refresh during quiz
- ✅ Timer edge cases and timeouts
- ✅ Mobile responsiveness across devices

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design testing

## 📱 Mobile Experience

- **Touch-optimized** interface with proper button sizing
- **Responsive navigation** that stacks on mobile
- **Optimized typography** for readability
- **Smooth scrolling** and interactions

## 🚀 Deployment

The app is ready for deployment to any static hosting service:

- **GitHub Pages**: `npm run deploy`
- **Netlify**: Drag and drop the build folder
- **Vercel**: Connect GitHub repository
- **Any static host**: Upload build folder contents

## 💡 Technical Highlights

- **Clean Architecture**: Well-organized component structure
- **State Management**: Efficient use of React hooks
- **Error Boundaries**: Graceful error handling throughout
- **Performance**: Optimized re-renders and API calls
- **Accessibility**: WCAG compliant design patterns
- **Code Quality**: ESLint compliant, well-documented code

## 📄 License

MIT License - see LICENSE file for details

---

**Built with React, modern CSS, and attention to detail** ✨