import React, { useState, useEffect } from 'react';
import "./Overview.css";
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import FloatingIcon from '../FloatingIcons/FloatingIcon';
import dg10Logo from "../../assets/DG10logo.png";
import dg11Logo from "../../assets/DG11logo.png";
import dg04Logo from "../../assets/DG04logo.png";
import dg05Logo from "../../assets/DG05logo.png";


function OverviewStrategies() {
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [account, setAccount] = useState(null); // Wallet connection state

  const openModal = (strategy) => {
    setSelectedStrategy(strategy);
  };

  const closeModal = () => {
    setSelectedStrategy(null);
  };

  // Dynamically add a class to the body when Portfolio page is active
  useEffect(() => {
    document.body.classList.add('strategies-page'); // Add class when Portfolio page is active

    return () => {
      document.body.classList.remove('strategies-page'); // Remove class when leaving the page
    };
  }, []);


  const strategies = [
    {
      name: 'DG10 Market Neutral',
      returnYTD: '5.3%',
      sharpeRatio: '1.2',
      maxDrawdown: '-2.1%',
      logo: dg10Logo,
      details: [
        'Average Monthly Returns: 2.53%',
        'Sortino Ratio: 2.9',
        'Minimum Investment: $500K',
        'Total Available Capacity: $100M',
        'Management Fee: 1.00%',
        'Performance Fee: 25.00%',
      ],
      overview: `DG10 uses funding rate arbitrage and relative value strategies to maintain near-zero market exposure. Key elements include taking advantage of USDT funding rates, mean reversion by buying oversold coins while hedging against Bitcoin, and maintaining a market-neutral position by balancing the different coins' shorts and longs.
      The strategy focuses on delivering consistent returns with very low drawdowns compared to typical crypto investments.
      Capitalizing on uncorrelated returns of digital assets, this approach supports portfolio diversification and return objectives, as well as an absolute return stream.`,
    },
    {
      name: 'DG11 Momentum',
      returnYTD: '8.4%',
      sharpeRatio: '1.8',
      maxDrawdown: '-3.5%',
      logo: dg11Logo,
      details: [
        'Average Monthly Returns: 3.5%',
        'Sortino Ratio: 3.1',
        'Minimum Investment: $750K',
        'Total Available Capacity: $150M',
        'Management Fee: 0.85%',
        'Performance Fee: 30.00%',
      ],
      overview: `The DG11 algorithms involve taking both long and short positions across a diverse selection of digital assets, capitalizing on recurring patterns and historical trends to optimize returns. By staying directionally agnostic, it allows for profit potential in both rising and falling markets, leveraging the inherent volatility of digital assets.
                With adaptive risk management, this approach dynamically adjusts to shifting market conditions, aiming to balance exposure to both high-reward scenarios and risk mitigation.
                The objective is to engage with market opportunities regardless of direction, fully utilizing digital asset volatility to maximize value in varied market environments.`,
    },
    {
      name: 'DG04 ML Synthesis',
      returnYTD: '12.1%',
      sharpeRatio: '2.3',
      maxDrawdown: '-1.8%',
      logo: dg04Logo,
      details: [
        'Average Monthly Returns: 4.2%',
        'Sortino Ratio: 3.5',
        'Minimum Investment: $1M',
        'Total Available Capacity: $200M',
        'Management Fee: 1.50%',
        'Performance Fee: 20.00%',
      ],
      overview: `The DG04 algorithms are implemented on OKX, Bitfinex, and Binance, focusing on the top 30 most liquid assets with a preference for high-market-cap assets.
                To optimize allocations across the various strategies within the portfolio, it leverages the Sharpe ratios and drawdown/alpha analysis, aiming to maximize risk-adjusted returns. 
                DG04 takes an aggressive approach to long positions, maintaining full exposure, while allowing short positions up to -60%. This approach reflects a primarily bullish outlook while also providing hedging capabilities.
                The DG04 algorithms combine multiple quantitative investment strategies into a carefully constructed portfolio. It includes Machine Learning and Volatility strategies (each comprising 16-30%), Mean Reversion and Market Neutral strategies (each at 22-40%), and Directional Trading strategies (24-45%). This mix aims to create a balanced yet dynamic investment profile.
                The Algorithm, using our AI model, is permitted to adjust the percentage of the sub-strategies that are live at any given time within predetermined levels. The sub-strategy integration makes it more dynamic and enables steady returns in all global macroeconomic market environments.`,
    },
    {
      name: 'DG05 HFT',
      returnYTD: '10.5%',
      sharpeRatio: '2.0',
      maxDrawdown: '-2.5%',
      logo: dg05Logo,
      details: [
        'Average Monthly Returns: 3.8%',
        'Sortino Ratio: 3.2',
        'Minimum Investment: $300K',
        'Total Available Capacity: $250M',
        'Management Fee: 1.20%',
        'Performance Fee: 15.00%',
      ],
      overview: `The DG05 strategy is a refined synthesis of our most successful quantitative models, specifically designed to achieve superior returns on a carefully assessed risk basis.
      By incorporating the key elements of our flagship HFT Opportunistic Momentum model, selected components of DG10’s Mean Reversion model, and advanced features of DG11’s Momentum model, DG05 represents a high-conviction investment approach that prioritizes precision and performance.`,
    },
  ];

  return (
    <div className="overview-container">
      <div className="overview-sidebar">
        <Sidebar />
      </div>
      <div className="overview">
        <div className="header"></div>

        <div className="intro-section">
          <h2>Off-Chain Systematic Investment Vaults</h2>
          <p>Allocate to institutional-grade off-chain RWA systematic investment strategies, on-chain.</p>
        </div>

        <div className="strategies-overview">
          {strategies.map((strategy, index) => (
            <div
              key={index}
              className="strategy-box"
              onClick={() => openModal(strategy)}
            >
              <img src={strategy.logo} alt={strategy.name} className="strategy-logo" />
              <div className="strategy-header">
                <h3>{strategy.name}</h3>
              </div>
              <div className="strategy-metrics">
                <p>Return YTD: <strong>{strategy.returnYTD}</strong></p>
                <p>Sharpe Ratio: <strong>{strategy.sharpeRatio}</strong></p>
                <p>Max Drawdown: <strong>{strategy.maxDrawdown}</strong></p>
              </div>
            </div>
          ))}
        </div>

        {selectedStrategy && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>{selectedStrategy.name} Details</h3>
                <button className="close-modal" onClick={closeModal}>X</button>
              </div>
              <div className="modal-body">
                {/* Overview Section */}
                <div className="overview-box">
                  <h4>Strategy Overview</h4>
                  <p>{selectedStrategy.overview}</p>
                </div>

                {/* Details Section */}
                <div className="details-box">
                  <p><strong>Return YTD:</strong> {selectedStrategy.returnYTD}</p>
                  <p><strong>Sharpe Ratio:</strong> {selectedStrategy.sharpeRatio}</p>
                  <p><strong>Max Drawdown:</strong> {selectedStrategy.maxDrawdown}</p>
                  <h4>Details:</h4>
                  {selectedStrategy.details.map((detail, index) => (
                    <p key={index}>{detail}</p>
                  ))}
                </div>

                <h4>Monthly Returns (Geometric Compounding)</h4>
                <table className="returns-table">
                  <thead>
                    <tr>
                      <th>Year</th>
                      <th>Jan</th>
                      <th>Feb</th>
                      <th>Mar</th>
                      <th>Apr</th>
                      <th>May</th>
                      <th>Jun</th>
                      <th>Jul</th>
                      <th>Aug</th>
                      <th>Sep</th>
                      <th>Oct</th>
                      <th>Nov</th>
                      <th>Dec</th>
                      <th>Yearly</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2024</td>
                      <td>-0.5%</td>
                      <td>3.1%</td>
                      <td>4.3%</td>
                      <td>1.8%</td>
                      <td>-0.9%</td>
                      <td>1.4%</td>
                      <td>2.1%</td>
                      <td>0.5%</td>
                      <td>-0.6%</td>
                      <td>-0.4%</td>
                      <td>3.4%</td>
                      <td>--</td>
                      <td>15.1%</td>
                    </tr>
                  </tbody>
                </table>

                <Link to="/vault">
                  <button className="vault-button">Go to Vault</button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Floating Icons */}
        <FloatingIcon />

      </div>
    </div>
  );
}

export default OverviewStrategies;
