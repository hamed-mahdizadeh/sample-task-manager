import styled from "styled-components";
import { Theme } from "../../../types/ui";

export const StyledPaginationButton = styled.button<{theme: Theme}>`
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.main};
    padding: .5rem;
    cursor: pointer;
    margin: .2rem;
    border: 1px solid ${props => props.theme.border};
`