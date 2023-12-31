import React from 'react';

import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Theme } from '../../types/ui';
import { useAppSelector } from '../../hooks/useStore';
import { useCreateUserSummaryUrl } from '../../hooks/useCreateUserSummaryUrl';

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

  const StyledNav = styled.nav`
    @media (max-width: 767px) {
        min-width: 80%;
        flex-grow: 1;
        order: 1;
    }
  `


export const Navbar = () => {

    const searchParams = useCreateUserSummaryUrl();

    const userSummaryUrl = `/users-summary/${searchParams}`; 
    

    return (
        <StyledNav>
            <StyledNavbarUl>
                <li>
                    <StyledNavLink to="/home" title='Home' >
                        Home
                    </StyledNavLink>
                </li>
                <li>
                    <StyledNavLink to={userSummaryUrl} title='Users Summary'>
                        Users Summary
                    </StyledNavLink>
                </li>
            </StyledNavbarUl>
        </StyledNav>
    );
};
