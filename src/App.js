import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Portfolio from './components/Portfolio/Portfolio';
import OverviewStrategies from './components/OverviewStrategies/Overview';
import Home from './components/Home/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Home />
        <Routes>
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/overview-strategies" element={<OverviewStrategies />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
