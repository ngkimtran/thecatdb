import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../logo.png'

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-center">
                <Link to="/thecatdb/">
                    <img src={logo} alt="catdb logo" className="logo" />
                </Link>
                <ul className="nav-links">
                    <li>
                        <Link to="/thecatdb/">Home</Link>
                    </li>
                    <li>
                        <Link to="/thecatdb/about">About</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
