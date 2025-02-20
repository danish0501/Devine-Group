import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Portfolio from './components/Portfolio/Portfolio';
import OverviewStrategies from './components/OverviewStrategies/Overview';
import Home from './components/Home/Home';
import Vault from './components/Vault/Vault';
import DevineReserve from './components/DevineReserve/DevineReserve';
import OffChainDeposit from './components/OffChainDeposit/OffChainDeposit';
import HedgePool from './components/HedgePool/HedgePool';

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
          <Route path="/OffChainDeposit" element={<OffChainDeposit />} />
          <Route path="/hedge-pool" element={<HedgePool />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
