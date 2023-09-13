import React from 'react';

import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import styled, { ThemeProvider } from 'styled-components';
import { Theme } from '../../types/ui';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import { uiActions } from '../../store/ui-slice';

const StyledLayoutContainer = styled.div<{ theme: Theme }>`
    background-color: ${props => props.theme.tertiaryBackground};
    color: ${props => props.theme.main};
    min-height: 100vh;
    min-width: 350px;
    margin: 0;
`

const StyledSearchPlaceHolderDiv = styled.div`
    display: flex;
    vertical-align: middle;
    align-items: center;
    flex-grow: 1;
    justify-content: center;
    @media (max-width: 767px) {
        width: fill-available;
        width: -moz-available;
        width: -webkit-fill-available;
        order: 3;
    }
`

const StyledHeaderContainerDiv = styled.div`
    display: flex;

    @media (max-width: 767px) {
        flex-wrap: wrap;
        justify-content: space-evenly;
    }
`;

const StyledDarkModeIcon = styled(DarkModeIcon)<{theme: Theme}>`
    color: ${props => props.theme.main};
    margin: 1.5rem;
    font-size: 36;
    cursor: pointer;
    &.dark {
        color: #ada610 !important;
    }
    @media (max-width: 767px) {
        order: 2;
    }
`

const Layout = () => {

    const theme = useAppSelector(state => state.ui.theme);
    const dispatch = useAppDispatch();

    const handleDarkModeClick = () => {
        dispatch(uiActions.switchTheme());
    }



    return (
        <ThemeProvider theme={theme}>
            <StyledLayoutContainer>
                <StyledHeaderContainerDiv>
                    <Navbar />
                    <StyledSearchPlaceHolderDiv id="headerPlaceHolder"></StyledSearchPlaceHolderDiv>
                    <StyledDarkModeIcon
                     className={theme.name} role='button'
                     onClick={handleDarkModeClick}
                    />
                </StyledHeaderContainerDiv>
                <Outlet />
            </StyledLayoutContainer>
        </ThemeProvider>

    );
};

export default Layout;
