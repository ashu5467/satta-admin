import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LearnMatka from './pages/LearnMatka';
import AboutMatka from './pages/AboutMatka';
import GuessMatka from './pages/GuessMatka';
import JodiChart from './components/JodiChart';
import PanelChart from './components/PanelChart ';
import ChartPage from './components/ChartPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Ensure HomePage is set here */}
        <Route path="/learn-matka" element={<LearnMatka />} />
        <Route path="/about-matka" element={<AboutMatka />} />
        <Route path="/guess-matka" element={<GuessMatka />} />
        <Route path="/jodi-chart" element={<JodiChart />} />
        <Route path="/panel-chart" element={<PanelChart />} />

        <Route path="/chart/:chartName" element={<ChartPage />} />
      </Routes>
    </Router>
  );
};

export default App;
