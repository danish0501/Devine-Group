import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import devineLogo from "../../assets/Devinegrouplogo.png";

const Sidebar = () => {
    const [vaultDropdownOpen, setVaultDropdownOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        if (darkMode) {
            setDark();
        } else {
            setLight();
        }
    }, [darkMode]); // Re-run when darkMode changes

    const handleTheme = () => {
        setDarkMode((prevMode) => !prevMode); // Toggle state
    };

    const setDark = () => {
        localStorage.setItem("theme", "dark");
        document.documentElement.setAttribute("data-theme", "dark");
    };

    const setLight = () => {
        localStorage.setItem("theme", "light");
        document.documentElement.setAttribute("data-theme", "light");
    };

    return (
        <div>
            <div className="sidebar">
                <div className="logo-container">
                    <Link to="/">
                        <img src={devineLogo} alt="Logo" className="logo" />
                    </Link>
                </div>
                {/* Vaults Dropdown */}
                <div className="dropdown">
                    <div
                        className="dropdown-header nav-link"
                        onClick={() => setVaultDropdownOpen(!vaultDropdownOpen)}
                    >
                        On-Chain
                    </div>
                    {vaultDropdownOpen && (
                        <div className="dropdown-menu">
                            <Link to="/portfolio" className="dropdown-item">
                                Portfolio Balances
                            </Link>
                            <Link to="/overview-strategies" className="dropdown-item">
                                Overviews
                            </Link>
                            <Link to="/vault" className="dropdown-item">
                                Deposit/Withdraw
                            </Link>
                            <Link to="/devine-reserves" className="dropdown-item">
                                Reserves
                            </Link>
                            <Link to="/OffChainDeposit" className="dropdown-item">
                                Allocate to Off-Chain Trading Venues
                            </Link>
                            <Link to="/hedge-pool" className="dropdown-item">
                                Hedge Pools
                            </Link>
                        </div>
                    )}
                </div>
                <button className="theme-toggle-button" onClick={handleTheme}>
                    {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
