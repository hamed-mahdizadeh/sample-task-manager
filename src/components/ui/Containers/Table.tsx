import styled from "styled-components";
import { Theme } from "../../../types/ui";

export const StyledContainerDiv = styled.div<{ theme: Theme }>`
    text-align: center;
    justify-content: space-between;
    margin: 1rem;
    border: 1px solid ${props => props.theme.border};
    overflow: auto ;
    background-color: ${props => props.theme.background};
`

export const StyledTableRowDiv = styled.div<{ theme: Theme }>`
    background-color: ${props => props.theme.background};
    display: grid;
    grid-template-columns: 2fr 4fr 1fr 1fr;
    justify-content: space-between;
    align-content: center;
    padding: .5rem;
    color: ${props => props.theme.main};
    border-bottom: 1px solid ${props => props.theme.border};

    @media (max-width: 767px) {
        display: block;
        grid-template-columns: unset;
        justify-content: unset;
    }
`

export const StyledPaginationContainerDiv = styled(StyledTableRowDiv)<{ theme: Theme }>`
    display: flex;
    justify-content: center;
`

export const StyledTableHeaderRowDiv = styled(StyledTableRowDiv)<{ theme: Theme }>`
    background-color: ${props => props.theme.secondaryBackground}
`