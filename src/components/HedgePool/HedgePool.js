import React, { useEffect, useState } from "react";
import "./HedgePool.css";
import Sidebar from "../Sidebar/Sidebar";
import dg10Logo from "../../assets/DG10logo.png";
import dg11Logo from "../../assets/DG11logo.png";
import dg04Logo from "../../assets/DG04logo.png";
import dg05Logo from "../../assets/DG05logo.png";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";

const hedgePools = [
    { name: "DG10 Pool", logo: dg10Logo, className: "dg10-logo" },
    { name: "DG04 Pool", logo: dg04Logo, className: "dg04-logo" },
    { name: "DG11 Pool", logo: dg11Logo, className: "dg11-logo" },
    { name: "DG05 Pool", logo: dg05Logo, className: "dg05-logo" },
];

const HedgePool = () => {

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="hedge-containers">
            <div className="hedge-sidebar">
                <Sidebar />
            </div>
            <div className="hedge-container">

                {isMobile ? <Navbar /> : <Header />}

                <h2 className="hedge-title">Hedge Pools</h2>
                <p className="hedge-subtitle">Hedge Against The Quantitative Strategies, Earn Additional Yield</p>

                <div className="hedge-list">
                    {hedgePools.map((pool, index) => (
                        <button key={index} className="hedge-button">
                            {pool.logo && <img src={pool.logo} alt={pool.name} className={`pool-logo ${pool.className}`} />}
                            {pool.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );  
};

export default HedgePool;
