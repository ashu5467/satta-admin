import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LearnMatka from './pages/LearnMatka';
import AboutMatka from './pages/AboutMatka';
import GuessMatka from './pages/GuessMatka';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Ensure HomePage is set here */}
        <Route path="/learn-matka" element={<LearnMatka />} />
        <Route path="/about-matka" element={<AboutMatka />} />
        <Route path="/guess-matka" element={<GuessMatka />} />
      </Routes>
    </Router>
  );
};

export default App;
