import React, { useState, useEffect } from "react";
import "./Vault.css";
import Web3 from "web3";
import { Link } from "react-router-dom";
import Sidebar from '../Sidebar/Sidebar';
import FloatingIcon from '../FloatingIcons/FloatingIcon';

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
import WithdrawIconLight from "../../assets/WithdrawIconWB.png";
import WithdrawIconDark from "../../assets/WithdrawIcon.png";
import DepositIconLight from "../../assets/DepositIconWB.png";
import DepositIconDark from "../../assets/DepositIcon.png";
import VaultJSON from "../../ContractAbi/DG10Vault.json";
import ERC20JSON from "../../ContractAbi/ERC20.json";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";

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

function Vault() {
    const [account, setAccount] = useState(null);
    const [web3, setWeb3] = useState(null);
    const [vaultContract, setVaultContract] = useState(null);
    const [selectedVault, setSelectedVault] = useState(VAULTS[0]);
    const [ethAmount, setEthAmount] = useState("");
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

    useEffect(() => {
        if (window.ethereum) {
            const web3Instance = new Web3(window.ethereum);
            setWeb3(web3Instance);
        } else {
            alert("Please install MetaMask!");
        }
    }, []);

    const connectWallet = async () => {
        if (!web3) {
            alert("Web3 not initialized. Please install MetaMask.");
            return;
        }

        try {
            const accounts = await web3.eth.requestAccounts();
            if (accounts.length > 0) {
                setAccount(accounts[0]);
                setVaultInstance(web3, selectedVault.address);
                checkApprovalStatus(accounts[0], selectedVault.tokenAddress);
            } else {
                alert("Please connect to MetaMask!");
            }
        } catch (error) {
            console.error("Error connecting wallet:", error);
            alert("Failed to connect to MetaMask. Please try again.");
        }
    };

    const setVaultInstance = (web3Instance, vaultAddress) => {
        try {
            const contract = new web3Instance.eth.Contract(VaultJSON.abi, vaultAddress);
            setVaultContract(contract);
            fetchVaultStats(contract);
        } catch (error) {
            console.error("Error setting vault contract instance:", error);
        }
    };

    const fetchVaultStats = async (contract) => {
        try {
            const totalAssets = await contract.methods.totalAssets().call();
            const exchangeRate = "1 ETH = vDG10";
            setVaultStats({ totalAssets, exchangeRate });
        } catch (error) {
            console.error("Error fetching vault stats:", error);
        }
    };

    const checkApprovalStatus = async (userAddress, tokenAddress) => {
        const tokenContract = new web3.eth.Contract(ERC20JSON.abi, tokenAddress);
        const allowance = await tokenContract.methods.allowance(userAddress, selectedVault.address).call();
        setApprovalStatus(allowance > 0);
    };

    const approveToken = async () => {
        const tokenContract = new web3.eth.Contract(ERC20JSON.abi, selectedVault.tokenAddress);
        try {
            setLoadingApproval(true);
            const amountToApprove = web3.utils.toWei(ethAmount, "ether");
            await tokenContract.methods.approve(selectedVault.address, amountToApprove).send({ from: account });
            setApprovalStatus(true);
            setLoadingApproval(false);
            alert("Approval successful. You can now deposit.");
        } catch (error) {
            console.error("Error approving token:", error);
            setLoadingApproval(false);
            alert("Approval failed. Please try again.");
        }
    };

    const stake = async () => {
        if (!vaultContract || !ethAmount || !account) {
            alert("Invalid input, contract not loaded, or MetaMask account not connected.");
            return;
        }

        if (!approvalStatus) {
            approveToken();
            return;
        }

        try {
            setLoadingDeposit(true);
            await vaultContract.methods.deposit(web3.utils.toWei(ethAmount, "ether"), account).send({ from: account });
            setLoadingDeposit(false);
            alert("Deposit successful!");
            fetchVaultStats(vaultContract);
        } catch (error) {
            console.error("Deposit failed:", error);
            setLoadingDeposit(false);
            alert("Deposit failed. Please try again.");
        }
    };

    const withdraw = async () => {
        if (!vaultContract || !account) {
            alert("Invalid input, contract not loaded, or MetaMask account not connected.");
            return;
        }

        try {
            setLoadingWithdraw(true);
            const maxShares = await vaultContract.methods.maxRedeem(account).call();
            const withdrawAmountInShares = await vaultContract.methods.previewWithdraw(web3.utils.toWei(ethAmount, "ether")).call();

            if (withdrawAmountInShares > maxShares) {
                alert("Exceeds max redeem limit.");
                setLoadingWithdraw(false);
                return;
            }

            await vaultContract.methods.redeem(withdrawAmountInShares, account, account).send({ from: account });
            setLoadingWithdraw(false);
            alert("Withdrawal successful!");
            fetchVaultStats(vaultContract);
        } catch (error) {
            console.error("Withdrawal failed:", error);
            setLoadingWithdraw(false);
            alert("Withdrawal failed. Please try again.");
        }
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
        <div className="vault-container">
            <div className="vault-sidebar">
                <Sidebar />
            </div>
            <div className="vaults">
                <div className="vault">

                    {isMobile ? <Navbar /> : <Header />}

                    <div className="vault-metrics-bar">
                        <div className="vault-metric">Sharpe: 3.54</div>
                        <div className="vault-metric">Max DD: -5.00%</div>
                        <div className="vault-metric">Vault AUM: {vaultStats.totalAssets} ETH</div>
                        <div className="vault-metric">Providers: Algoz | Copper Custody</div>
                        <div className="vault-metric">Avg 1Y Annualized APR: 30%</div>
                        <div className="vault-metric">Redemptions: Liquid</div>
                    </div>

                    <button className="vault-allocate-offchain-button">
                        <Link to="/OffChainDeposit">Allocate to off-chain trading venues</Link>
                    </button>

                    <div className="vault-intro-section">
                        <h2>Deposit ETH, Receive vDG10</h2>
                        <p>Allocate to DG10 off-chain systematic investment strategy.</p>
                    </div>

                    <div className="vault-inner-container">
                        <div className="vault-containers">
                            <div className="vault-header">
                                <img src={getVaultLogo()} alt="Vault Logo" className="vault-icon" />
                                <select
                                    className="vault-select"
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

                            <div className="input-group">
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
                                    placeholder={`Enter ${selectedVault.name.split(" ")[1]} amount`}
                                    value={ethAmount}
                                    onChange={(e) => setEthAmount(e.target.value)}
                                />
                            </div>

                            <button className="vault-toggle-button" onClick={() => setIsDeposit(!isDeposit)}>
                                <img src={getActionIcon()} alt="Action Icon" className="action-icon" />
                            </button>

                            <button
                                className="vault-stake-button"
                                onClick={isDeposit ? stake : withdraw}
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

                            <div className="vault-info-box">
                                <p>You will receive: <strong>{ethAmount} vDG10</strong></p>
                                <p>Exchange Rate: <strong>{vaultStats.exchangeRate}</strong></p>
                                <p>Max Network Cost: <strong>$1.18</strong></p>
                                <p>Transaction Fee: <strong>0.01%</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Icons */}
            <FloatingIcon />

        </div>
    );
}

export default Vault;
