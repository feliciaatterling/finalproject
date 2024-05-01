import './App.js';
import React, { useState } from 'react';
import './App.css';
import menu from './Images/menu.png';

// Component for our navbar
// Retractable, vertical
// References to Home (catalog), Guides, Contact
function Navbar( {changeView} ) {
    
    const [open, setOpen] = useState(false);

    const toggleNavigation = () => {
        setOpen(!open);
    }

    return (
        <div className={`${open ? 'bg-dark' : ''}`}>
            <img src={menu} alt="picture" onClick={toggleNavigation} style={{ padding: '10px' }} />
            <div className={`d-flex flex-column flex-shrink-0 p-3 text-white bg-dark ${open ? 'nav-open' : 'nav-closed'}`} style={{height: "100vh", transition: "all 0.3s"}}>
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-4">Next Stop</span>
                </a>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto" style={{ alignItems: 'center' }}>
                    <li style={{ paddingBottom: '10px' }}>
                        <button className="btn btn-primary" onClick={() => {changeView(0); toggleNavigation()}}>Home</button>
                    </li>
                    <li style={{ paddingBottom: '10px' }}>
                        <button className="btn btn-primary" onClick={() => {changeView(1); toggleNavigation()}}>Guides</button>
                    </li>
                    <li style={{ paddingBottom: '10px' }}>
                        <button className="btn btn-primary" onClick={() => {changeView(2); toggleNavigation()}}>Contact</button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;