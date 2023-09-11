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

const StyledSearchPlaceHolderDiv = styled.div`
    display: flex;
    vertical-align: middle;
    align-items: center;
    flex-grow: 1;
    justify-content: center;
`

const StyledHeaderContainerDiv = styled.div`
    display: flex;

    @media (max-width: 767px) {
        display: block;
    }
`

const Layout = () => {

    return (
        <ThemeProvider theme={dark}>
            <StyledLayoutContainer>
                <StyledHeaderContainerDiv>
                    <Navbar/>
                    <StyledSearchPlaceHolderDiv id="headerPlaceHolder"></StyledSearchPlaceHolderDiv>
                </StyledHeaderContainerDiv>
                <Outlet />
            </StyledLayoutContainer>
        </ThemeProvider>

    );
};

export default Layout;
