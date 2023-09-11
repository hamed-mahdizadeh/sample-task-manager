import styled from "styled-components";
import { Theme } from "../../types/ui";

export const StyledSubContainerDiv = styled.div`
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            flex-basis: 100%;
            gap: 1rem;
            padding: 1rem 2rem;`

export const StyledProfileContainerDiv = styled.div<{ theme: Theme }>`
    border-radius: .5rem;
    padding-bottom: 5rem;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.main};
    border: 1px solid ${props => props.theme.border};
    box-shadow: -.1rem .1rem .2rem ${props => props.theme.boxShadow};
`;


export const StyledProfileHeaderDiv = styled.div<{ theme: Theme }>`
    background-color: ${props => props.theme.tertiaryBackground};
    display: flex;
    min-height: 3rem;
    padding: 1rem;
    align-items: center;
    border-bottom: 1px solid ${props => props.theme.border};
`

export const StyledHeaderDiv = styled.div<{ grow?: number }>`
    flex-grow: ${props => props.grow};
    display: flex;`

export const StyledHeaderTitleDiv = styled.div<{ grow?: number }>`
    flex-grow: ${props => props.grow};
    display: flex;
    flex-basis: 100%;
    font-weight: bolder;
`

export const StyledBody = styled.div`
    min-height: 5rem;
    flex-wrap: wrap;
`