import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../images/logo.png"

function Navbar() {
    const [nav, setnav] = useState(false);
    
    const changeBackground = () => {
        if (window.scrollY >= 50) {
            setnav(true);
        } else {
            setnav(false);
        }
    }

    const scrollToHome = async () => {
        document.getElementById("main").scrollIntoView({ behavior: 'smooth', block: 'start' });
    } 
    const scrollToFeatures = async () => {
        document.getElementById("features").scrollIntoView({ behavior: 'smooth', block: 'start' });
    } 

    window.addEventListener('scroll', changeBackground);

    return (
        <nav className={nav ? 'nav active' : 'nav'}>
            <Link to='#' className='logo'>
                <img src={logo} alt='Peers' />
            </Link>
            <ul className='menu'>
                <li><Link onClick={scrollToHome}>Beranda</Link></li>
                <li><Link onClick={scrollToFeatures}>Fitur</Link></li>
                <li><Link to='/login' className='active'>Masuk</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;