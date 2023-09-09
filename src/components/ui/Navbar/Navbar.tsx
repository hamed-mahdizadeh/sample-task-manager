import React from 'react';

import classes from './Navbar.module.css';
import { NavLink } from 'react-router-dom';


export const Navbar = () => {
    
    return (
        <div className={classes.navHeader}>
        <nav>
            <ul>
                <li>
                    <NavLink to="/home" title='Home' className={({isActive}) => isActive ? classes.active : ''} >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/users-summary" title='Users Summary' className={({isActive}) => isActive ? classes.active : ''}>
                        Users Summary
                    </NavLink>
                </li>
            </ul>
        </nav>
    </div>
    );
};
