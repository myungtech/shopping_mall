import React from 'react';
import { Link } from 'react-router-dom';
import styles from './nav.module.css';


const Nav = (props) => (

    <nav className={styles.navbar}>
        <i className="navbar-logo fab fa-react"></i>
        <Link className={styles.mall} to="/"> Mall</Link>
        <Link className={styles.cart} to="/cart"> Cart</Link>
    </nav>

);

export default Nav;