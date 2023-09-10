import React from 'react';

import classes from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import { Navbar }  from './Navbar/Navbar';
import { ThemeProvider } from 'styled-components';
import dark from '../../theme/dark';
import light from '../../theme/light';

const Layout = () => {

    return (
        <ThemeProvider theme={dark}>
            <div className={classes.Layout}>
                <Navbar />
                <Outlet />
            </div>
        </ThemeProvider>

    );
};

export default Layout;
