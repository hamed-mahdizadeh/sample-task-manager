import React from 'react';

import { Outlet } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import { ThemeProvider } from 'styled-components';
import dark from '../../../theme/dark';
import light from '../../../theme/light';

export const Layout = () => {
    return (
        <ThemeProvider theme={light}>
            <div>
                <Navbar />
                <Outlet />
            </div>
        </ThemeProvider>
        
    );
};
