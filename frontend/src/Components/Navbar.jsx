import React, { useState } from 'react';
import './Navbar.css'; // Import the CSS file
import {Link} from 'react-router-dom'

const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchTerm);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="container">
                    <form className="search-form" onSubmit={handleSearch}>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search..."
                            className="search-input"
                        />
                        <button type="submit" className="search-button">Search</button>
                    </form>
                </div>
                <div className="heading">Chat Me!</div>
                <div className="navbar-links">
                    <div className="navbar-link"><Link to="/Home">Home</Link></div>
                    <div className="navbar-link">Login</div>
                    <div className="navbar-link">Sign Up</div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
