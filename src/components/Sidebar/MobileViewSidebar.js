import { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import Drawer from "@mui/material/Drawer";
import { IconButton } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import devineLogo from "../../assets/Devinegrouplogo.png";

function MobileViewSidebar() {
    const [open, setOpen] = useState(false);
    const [vaultDropdownOpen, setVaultDropdownOpen] = useState(false);
    const isMobile = useMediaQuery("(max-width:500px)");

    return (
        <div>
            <IconButton
                onClick={() => {
                    setOpen(true);
                }}
            >
                <MenuRoundedIcon style={{ fontSize: "32px", color: "black" }} />
            </IconButton>

            {/* Drawer Component */}
            <Drawer
                anchor={"left"}
                open={open}
                onClose={() => setOpen(false)}
                PaperProps={{
                    style: { width: isMobile ? "100%" : "220px" }, 
                  }}
            >
                <div className="mobile-sidebar">
                    <div className="logo-container">
                        <img src={devineLogo} alt="Logo" className="logo" />
                    </div>

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

                    <button className="theme-toggle-button" >
                        Switch to Theme
                    </button>
                </div>
            </Drawer>
        </div>
    );
}

export default MobileViewSidebar;
