import React from 'react';

import classes from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';

export const Layout = () => {
    return (
        <div className={classes.Layout}>
            <Navbar />
            <Outlet />
        </div>
    );
};
