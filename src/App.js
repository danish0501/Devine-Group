import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Portfolio from './components/Portfolio/Portfolio';
import OverviewStrategies from './components/OverviewStrategies/Overview';
import Home from './components/Home/Home';
import Vault from './components/Vault/Vault';
import DevineReserve from './components/DevineReserve/DevineReserve';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/overview-strategies" element={<OverviewStrategies />} />
          <Route path="/vault" element={<Vault />} />
          <Route path="/devine-reserves" element={<DevineReserve />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
