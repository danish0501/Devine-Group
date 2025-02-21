import React, { useState } from 'react';
import "./Navbar.css";
import MobileViewSidebar from '../Sidebar/MobileViewSidebar';

const Navbar = () => {

    const [account, setAccount] = useState(null);

    const connectWallet = () => {
        setAccount("0x1234567890abcdef");
    };

    return (
        <nav className='navbar'>
            <div className="hamburger">
                <MobileViewSidebar />
            </div>

            <div className={`navbar-header ${account ? 'connected' : ''}`} onClick={connectWallet} style={{ cursor: "pointer" }}>
                <div className="header-info">
                    {account ? (
                        <span className='connect-wallet'>{account}</span>
                    ) : (
                        <span className='connect-wallet'>Connect Wallet</span>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
