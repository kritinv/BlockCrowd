import React from 'react';
import './Header.css';

const Header = ({ onNavigate }) => {
    return (
        <header className="app-header">
            <div className="logo-container" onClick={() => onNavigate('home')}>
                <img src="/BlockCrowd-logos/BlockCrowd-logos_white.png" alt="BlockCrowd Logo" className="header-logo" />
                <span className="logo-text">BlockCrowd</span>
            </div>
            <nav className="header-nav">
                <button onClick={() => onNavigate('home')} className="nav-link">Home</button>
                <button onClick={() => onNavigate('explore')} className="nav-link">Explore Campaigns</button>
                <button onClick={() => onNavigate('create')} className="nav-link special-link">Start a Campaign</button>
                <button onClick={() => onNavigate('manage')} className="nav-link">Manage Campaigns</button>
            </nav>
        </header>
    );
}

export default Header;