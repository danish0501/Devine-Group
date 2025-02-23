import React, { useState } from 'react';
import "./Header.css";

const Header = () => {

    const [account, setAccount] = useState(null);

    const connectWallet = () => {
        setAccount("0x1234567890abcdef");
    };

    return (
        <div className="Header" onClick={connectWallet}>
            <div className="Header-container">
                <div className="Header-info">
                    {account ? (
                        <span className='connect-wallet'>{account}</span>
                    ) : (
                        <span className='connect-wallet'>Connect Wallet</span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header;
