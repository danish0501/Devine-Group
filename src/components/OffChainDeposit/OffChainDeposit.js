import React, { useState } from "react";
import "./OffChainDeposit.css";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import FloatingIcon from "../FloatingIcons/FloatingIcon";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";

// Import images for both light and dark themes
import dg10Dark from "../../assets/DG10logo.png";
import dg10Light from "../../assets/DG10logoWB.png";
import dg04Dark from "../../assets/DG04logo.png";
import dg04Light from "../../assets/DG04logoWB.png";
import dg05Dark from "../../assets/DG05logo.png";
import dg05Light from "../../assets/DG05logoWB.png";
import dg11Dark from "../../assets/DG11logo.png";
import dg11Light from "../../assets/DG11logoWB.png";
import ethLogo from "../../assets/ethlogo.png";
import usdtLogo from "../../assets/usdtlogo.png";
import usdcLogo from "../../assets/usdclogo.png";
import wbtcLogo from "../../assets/wbtclogo.png";
import apikeylogo from "../../assets/apikeylogo.png";
import secretkeylogo from "../../assets/secretkeylogo.png";
import WithdrawIconLight from "../../assets/WithdrawIconWB.png";
import WithdrawIconDark from "../../assets/WithdrawIcon.png";
import DepositIconLight from "../../assets/DepositIconWB.png";
import DepositIconDark from "../../assets/DepositIcon.png";
import VaultJSON from "../../ContractAbi/DG10Vault.json";
import ERC20JSON from "../../ContractAbi/ERC20.json";

// List of vaults with their names and contract addresses
const VAULTS = [
    { name: "DG10 (USDT)", address: "0x758b1a44A13d23e6b842A0A802255CAb58C06844", tokenAddress: "0x582E68bDe36703fad9F82Eee42D77f28b986214e" },
    { name: "DG10 (USDC)", address: "0x0Ef1ffEd8aBa84D20FC649B99763F3550f1E1617", tokenAddress: "0xA0b86991c6218b36c1d19D4a2e9eb0ce3606eb48" },
    { name: "DG10 (WBTC)", address: "0x105Fb10b1B2F76b5E1713B97A71a181a4A687709", tokenAddress: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599" },
    { name: "DG11 (USDT)", address: "0x758b1a44A13d23e6b842A0A802255CAb58C06844", tokenAddress: "0x55d398326f99059fF775485246999027B3197955" },
    { name: "DG11 (USDC)", address: "0x758b1a44A13d23e6b842A0A802255CAb58C06844", tokenAddress: "0xA0b86991c6218b36c1d19D4a2e9eb0ce3606eb48" },
    { name: "DG11 (WBTC)", address: "0x758b1a44A13d23e6b842A0A802255CAb58C06844", tokenAddress: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599" },
    { name: "DG05 (USDT)", address: "0x8d7Cf204889c2eaCFafaa414b6c56bC6C1f42e5F", tokenAddress: "0x55d398326f99059fF775485246999027B3197955" },
    { name: "DG05 (USDC)", address: "0x8d7Cf204889c2eaCFafaa414b6c56bC6C1f42e5F", tokenAddress: "0x582E68bDe36703fad9F82Eee42D77f28b986214e" },
    { name: "DG05 (WBTC)", address: "0x758b1a44A13d23e6b842A0A802255CAb58C06844", tokenAddress: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599" },
    { name: "DG04 (USDT)", address: "0x5dCF57A47018CDfA8Bf6216404675491218275ba", tokenAddress: "0x55d398326f99059fF775485246999027B3197955" },
    { name: "DG04 (USDC)", address: "0x758b1a44A13d23e6b842A0A802255CAb58C06844", tokenAddress: "0xA0b86991c6218b36c1d19D4a2e9eb0ce3606eb48" },
    { name: "DG04 (WBTC)", address: "0x5034602bD7E7D141bfbbbBf2e9D4FAa283E94560", tokenAddress: "0x582E68bDe36703fad9F82Eee42D77f28b986214e" },
];

function OffChainDeposit() {
    const [selectedVault, setSelectedVault] = useState(VAULTS[0]);
    const [ethAmount, setEthAmount] = useState("");
    const [apiKey, setApiKey] = useState("");   // For API Key input
    const [secretKey, setSecretKey] = useState(""); // For Secret Key input
    const [vaultStats, setVaultStats] = useState({
        totalAssets: "0",
        exchangeRate: "1 ETH = vDG10",
    });
    const [isDeposit, setIsDeposit] = useState(true); // Toggle between Deposit and Withdraw
    const [approvalStatus, setApprovalStatus] = useState(false);
    const [loadingApproval, setLoadingApproval] = useState(false);
    const [loadingDeposit, setLoadingDeposit] = useState(false);
    const [loadingWithdraw, setLoadingWithdraw] = useState(false);
    const [theme, setTheme] = useState("light"); // Manage theme state
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const setVaultInstance = (vaultAddress) => {
        try {
            // Assuming you still want to interact with the contract
            // If needed, you can integrate your logic here for contract interaction
            console.log("Setting vault instance for", vaultAddress);
        } catch (error) {
            console.error("Error setting vault contract instance:", error);
        }
    };

    const fetchVaultStats = async () => {
        // Simulate fetching vault stats without Web3
        try {
            const totalAssets = "1000 ETH"; // Mock data for now
            const exchangeRate = "1 ETH = vDG10"; // Mock exchange rate
            setVaultStats({ totalAssets, exchangeRate });
        } catch (error) {
            console.error("Error fetching vault stats:", error);
        }
    };

    const approveToken = async () => {
        try {
            setLoadingApproval(true);
            // Mock approval logic
            console.log("Approving token for deposit...");
            setApprovalStatus(true);
            setLoadingApproval(false);
            alert("Approval successful. You can now deposit.");
        } catch (error) {
            console.error("Error approving token:", error);
            setLoadingApproval(false);
            alert("Approval failed. Please try again.");
        }
    };

    const deposit = async () => {
        if (!ethAmount) {
            alert("Please enter a valid amount.");
            return;
        }

        try {
            setLoadingDeposit(true);
            console.log("Depositing:", ethAmount);
            setLoadingDeposit(false);
            alert("Deposit successful!");
            fetchVaultStats();
        } catch (error) {
            console.error("Deposit failed:", error);
            setLoadingDeposit(false);
            alert("Deposit failed. Please try again.");
        }
    };

    const withdraw = async () => {
        if (!ethAmount) {
            alert("Please enter a valid amount.");
            return;
        }

        try {
            setLoadingWithdraw(true);
            console.log("Withdrawing:", ethAmount);
            setLoadingWithdraw(false);
            alert("Withdrawal successful!");
            fetchVaultStats();
        } catch (error) {
            console.error("Withdrawal failed:", error);
            setLoadingWithdraw(false);
            alert("Withdrawal failed. Please try again.");
        }
    };

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    const getVaultLogo = () => {
        if (selectedVault.name.includes("DG10")) return theme === "light" ? dg10Light : dg10Dark;
        if (selectedVault.name.includes("DG04")) return theme === "light" ? dg04Light : dg04Dark;
        if (selectedVault.name.includes("DG05")) return theme === "light" ? dg05Light : dg05Dark;
        if (selectedVault.name.includes("DG11")) return theme === "light" ? dg11Light : dg11Dark;
        return ethLogo;
    };

    const getActionIcon = () => {
        if (isDeposit) {
            return theme === "light" ? DepositIconLight : DepositIconDark;
        }
        return theme === "light" ? WithdrawIconLight : WithdrawIconDark;
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="offchain-container" data-theme={theme}>
            <div className="offchain-sidebar">
                <Sidebar />
            </div>
            <div className="offchain">

                {isMobile ? <Navbar /> : <Header />}

                <div className="metrics-bar">
                    <div className="metric">Sharpe: 3.54</div>
                    <div className="metric">Max DD: -5.00%</div>
                    <div className="metric">Vault AUM: {vaultStats.totalAssets} ETH</div>
                    <div className="metric">Providers: Algoz | Copper Custody</div>
                    <div className="metric">Avg 1Y Annualized APR: 30%</div>
                    <div className="metric">Redemptions: Liquid</div>
                </div>

                {/* <button className="allocate-offchain-button">
                    <Link to="/OffChainDeposit">Allocate to off-chain trading venues</Link>
                </button> */}

                <div className="offchain-intro-section">
                    <h2>Allocate To Our Institutional-Grade Quantitative Strategies</h2>
                    <p>Earn Yield from the Best Off-Chain Asset Managers in the Industry.</p>
                </div>

                <div className="offchain-containers">
                    <div className="offchain-header">
                        <img src={getVaultLogo()} alt="Vault Logo" className="offchain-icon" />
                        <select
                            className="offchain-select"
                            value={selectedVault.address}
                            onChange={(e) => {
                                const selected = VAULTS.find((vault) => vault.address === e.target.value);
                                setSelectedVault(selected);
                            }}
                        >
                            {VAULTS.map((vault) => (
                                <option key={vault.address} value={vault.address}>
                                    {vault.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="offchain-input-group">
                        <img src={apikeylogo} alt="API Key Logo" />
                        <input
                            type="text"
                            placeholder="Enter Sub-Account API Key"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                        />
                    </div>

                    <div className="offchain-input-group">
                        <img src={secretkeylogo} alt="Secret Key Logo" />
                        <input
                            type="text"
                            placeholder="Enter Sub-Account Secret Key"
                            value={secretKey}
                            onChange={(e) => setSecretKey(e.target.value)}
                        />
                    </div>

                    <div className="offchain-input-group">
                        <img
                            src={
                                selectedVault.name.includes("USDT")
                                    ? usdtLogo
                                    : selectedVault.name.includes("USDC")
                                        ? usdcLogo
                                        : selectedVault.name.includes("WBTC")
                                            ? wbtcLogo
                                            : ethLogo
                            }
                            alt="Token Logo"
                        />
                        <input
                            type="number"
                            placeholder={`Enter ${selectedVault.name.split(" ")[1]} Allocation amount`}
                            value={ethAmount}
                            onChange={(e) => setEthAmount(e.target.value)}
                        />
                    </div>

                    <button className="toggle-button" onClick={() => setIsDeposit(!isDeposit)}>
                        <img src={getActionIcon()} alt="Action Icon" className="action-icon" />
                    </button>

                    <button
                        className="stake-button"
                        onClick={isDeposit ? deposit : withdraw}
                        disabled={loadingApproval || loadingDeposit || loadingWithdraw}
                    >
                        {loadingApproval
                            ? "Approving..."
                            : loadingDeposit
                                ? "Depositing..."
                                : loadingWithdraw
                                    ? "Withdrawing..."
                                    : isDeposit
                                        ? "Deposit"
                                        : "Withdraw"}
                    </button>
                </div>
            </div>

            {/* Floating Icons */}
            <FloatingIcon />

        </div>
    );
}

export default OffChainDeposit;
