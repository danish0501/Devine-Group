import React, { useEffect, useState } from 'react';
import "./Portfolio.css";
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import FloatingIcon from '../FloatingIcons/FloatingIcon';
import dg10Logo from "../../assets/DG10logo.png";
import dg11Logo from "../../assets/DG11logo.png";
import dg04Logo from "../../assets/DG04logo.png";
import dg05Logo from "../../assets/DG05logo.png";


const Portfolio = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    const [selectedStrategy, setSelectedStrategy] = useState(null); // Store selected strategy for modal
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    // Dynamically add a class to the body when Portfolio page is active
    useEffect(() => {
        document.body.classList.add('portfolio-page'); // Add class when Portfolio page is active

        return () => {
            document.body.classList.remove('portfolio-page'); // Remove class when leaving the page
        };
    }, []);

    const portfolioData = [
        {
            title: "Portfolio Balances",
            strategies: [
                { name: "DG10", percentage: "10%", balance: "$1,000", locked: "$100", icon: dg10Logo },
                { name: "DG04", percentage: "15%", balance: "$1,500", locked: "$150", icon: dg04Logo },
                { name: "DG11", percentage: "20%", balance: "$2,000", locked: "$200", icon: dg11Logo },
                { name: "DG05", percentage: "25%", balance: "$2,500", locked: "$250", icon: dg05Logo },
            ],
        },
        {
            title: "DeFi Collateral Balances",
            strategies: [
                { name: "DYXG", percentage: "12%", icon: dg10Logo },
                { name: "Strategy Y", percentage: "18%", icon: dg04Logo },
                { name: "Strategy Z", percentage: "22%", icon: dg11Logo },
                { name: "Strategy W", percentage: "30%", icon: dg05Logo },
            ],
        },
    ];

    // Function to handle modal opening
    const openModal = (strategy) => {
        setSelectedStrategy(strategy);
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedStrategy(null);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className='portfolio-container'>
            <div className="portfolio-sidebar">
                <Sidebar />
            </div>
            <div className="portfolios">
                <div className="portfolio">

                    {isMobile ? <Navbar /> : <Header />}

                    <div className="portfolio-intro-section">
                        <h2>Portfolio Overview</h2>
                        <p>PNLs & Balances</p>
                    </div>

                    {/* Portfolio Boxes Section */}
                    <div className="portfolio-boxes">
                        {portfolioData.map((data, index) => (
                            <div key={index} className="portfolio-box">
                                <h2>{data.title}</h2>
                                <div className="portfolio-strategies">
                                    {data.strategies.map((strategy, idx) => (
                                        <div key={idx} className="portfolio-strategy">
                                            <img
                                                src={strategy.icon}
                                                alt={`${strategy.name} Icon`}
                                                className="portfolio-strategy-icon"
                                                onClick={() => openModal(strategy)} // Open modal on icon click
                                            />
                                            <div className="portfolio-strategy-details">
                                                <div className="portfolio-strategy-header">{strategy.name}</div>
                                                {strategy.percentage && (
                                                    <div className="portfolio-strategy-percentage">Daily PNL: {strategy.percentage}</div>
                                                )}
                                                {strategy.balance && strategy.locked && (
                                                    <div className="portfolio-strategy-financials">
                                                        <div className="portfolio-financial-balance">
                                                            <span className="portfolio-financial-label">Balance</span>
                                                            <span className="portfolio-financial-value">{strategy.balance}</span>
                                                        </div>
                                                        <div className="portfolio-financial-locked">
                                                            <span className="portfolio-financial-label">Locked</span>
                                                            <span className="portfolio-financial-value">{strategy.locked}</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Floating Icons */}
                    <FloatingIcon />

                    {/* Modal (Strategy Details) */}
                    {isModalOpen && (
                        <div className="reserve-modal-overlay" onClick={closeModal}>
                            <div className="reserve-modal-content" onClick={(e) => e.stopPropagation()}>
                                <button className="close-modal" onClick={closeModal}>×</button>
                                <div className="modal-header">
                                    <h3>{selectedStrategy?.name}</h3>
                                </div>
                                <div className="modal-body">
                                    <p>Daily PNL: {selectedStrategy?.percentage}</p>
                                    {selectedStrategy?.balance && (
                                        <>
                                            <p>Balance: {selectedStrategy.balance}</p>
                                            <p>Locked: {selectedStrategy.locked}</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Portfolio;
