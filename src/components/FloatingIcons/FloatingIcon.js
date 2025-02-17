import React from 'react';
import "./FloatingIcon.css";
import gitbookIcon from "../../assets/gitbookIcon.png"
import xIcon from "../../assets/xIcon.png";
import linkedinIcon from "../../assets/linkedinIcon.png";
import devineLogo from "../../assets/Devinegrouplogo.png";

const FloatingIcon = () => {
    return (
        <div className="floating-icons">
            <a href="https://devine-group.gitbook.io/devine-group" target='_blank' rel="noreferrer noopener" className="icon-link">
                <img src={gitbookIcon} alt="Gitbook Icon" className="floating-icon" />
            </a>
            <a href="https://x.com/i/flow/login?redirect_after_login=%2Fdevinegroupxyz" target='_blank' rel="noreferrer noopener" className="icon-link">
                <img src={xIcon} alt="Twitter Icon" className="floating-icon" />
            </a>
            <a href="https://www.linkedin.com/company/devine-group/" target='_blank' rel="noreferrer noopener" className="icon-link">
                <img src={linkedinIcon} alt="LinkedIn Icon" className="floating-icon" />
            </a>
            <a href="https://www.devinegroup.xyz/" target='_blank' rel="noreferrer noopener" className="icon-link">
                <img src={devineLogo} alt="Devine Logo" className="floating-icon" />
            </a>
        </div>
    )
}

export default FloatingIcon;
