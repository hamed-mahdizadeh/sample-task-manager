import React from "react";
import { styled } from "styled-components";


export const StyledAvatarImg = styled.img`
    border-radius: 50%;
    width: 5rem;
    height: 5rem;

    @media (max-width: 767px) {
        width: 3rem;
        height: 3rem;
    }
`