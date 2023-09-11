import React from 'react';

import { Outlet } from 'react-router-dom';
import { Navbar }  from './Navbar';
import styled, { ThemeProvider } from 'styled-components';
import dark from '../../theme/dark';
import light from '../../theme/light';
import { Theme } from '../../types/ui';

const StyledLayoutContainer = styled.div<{theme: Theme}>`
    background-color: ${props => props.theme.tertiaryBackground};
    color: ${props => props.theme.main};
    min-height: 100vh;
    margin: 0;
`

const Layout = () => {

    return (
        <ThemeProvider theme={dark}>
            <StyledLayoutContainer>
                <Navbar/>
                <Outlet />
            </StyledLayoutContainer>
        </ThemeProvider>

    );
};

export default Layout;
