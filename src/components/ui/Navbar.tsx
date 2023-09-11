import React from 'react';

import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Theme } from '../../types/ui';

const StyledNavbarUl = styled.ul`
    display: flex;
    gap: 3rem;
    list-style: none;
    padding: 1.5rem 2rem;
`;

const StyledNavLink = styled(NavLink) <{ theme: Theme }>`
  display: flex;
  gap: 3rem;
  list-style: none;
  text-decoration: none;
  color: ${props => props.theme.secondary};
  &.active {
    color: ${props => props.theme.main};
    cursor: default;
  };
  &:visited{
    color: ${props => props.theme.secondary};
  };
  &:visited {
   &.active {
    color: ${props => props.theme.main};;
   };
  }`;


export const Navbar = () => {

    return (
        <nav>
            <StyledNavbarUl>
                <li>
                    <StyledNavLink to="/home" title='Home' >
                        Home
                    </StyledNavLink>
                </li>
                <li>
                    <StyledNavLink to="/users-summary" title='Users Summary'>
                        Users Summary
                    </StyledNavLink>
                </li>
            </StyledNavbarUl>
        </nav>
    );
};
