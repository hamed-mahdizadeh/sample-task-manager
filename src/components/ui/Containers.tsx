import styled from "styled-components";
import { Theme } from "../../types/ui";

export const StyledSubContainerDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    flex-basis: 100%;
    gap: 1rem;
    padding: 1rem 2rem;
`;

export const StyledProfileContainerDiv = styled.div<{ theme: Theme }>`
    border-radius: .5rem;
    padding-bottom: 5rem;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.main};
    border: 1px solid ${props => props.theme.border};
    box-shadow: -.1rem .1rem .2rem ${props => props.theme.boxShadow};
`;

export const StyledTaskContainerDiv = styled(StyledProfileContainerDiv)`
    height: fit-content;
    width: calc(50% - 2rem);
    min-width: 20rem;
    padding: 0%.5rem;
    background-color: ${props => props.theme.secondaryBackground};
`;


export const StyledProfileHeaderDiv = styled.div<{ theme: Theme }>`
    background-color: ${props => props.theme.tertiaryBackground};
    display: flex;
    min-height: 3rem;
    padding: 1rem;
    align-items: center;
    border-bottom: 1px solid ${props => props.theme.border};
`;

export const StyledHeaderDiv = styled.div<{ grow?: number }>`
    flex-grow: ${props => props.grow};
    display: flex;
    `;

export const StyledHeaderTitleDiv = styled.div<{ grow?: number }>`
    flex-grow: ${props => props.grow};
    display: flex;
    flex-basis: 100%;
    font-weight: bolder;
`;

export const StyledBody = styled.div`
    min-height: 5rem;
    flex-wrap: wrap;
`;

export const StyledHomeContainerDiv = styled.div`
   display: flex;
   padding: 1rem;
   @media (max-width: 767px) {
       display: block;
    }
`;

export const StyledColumnDiv = styled.div<{ theme: Theme, basis: string, maxwidth?: string }>`
    max-width: ${props => props.maxwidth};
    flex-basis: ${props => props.basis};
    justify-content: space-between;
    margin-bottom: 5rem;
    border: 1px solid ${props => props.theme.border};
    padding: 1rem;
    gap: .5rem;
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
    @media (max-width: 767px) {
       max-width: unset;
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-basis: 100%;
    gap: 1rem;
    width: 100%;
    padding: .5rem;
`;

export const StyledTaskCardRow = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: .2rem;
`;


export const StyledSelectContainer = styled.div`
    display: inline-flex;
    max-height: 5rem;
    padding: 20px;
`;

export const StyledArrowContainer = styled.div`
    display: inline-block;
    width: 2rem;
    height: 1rem;
    overflow: hidden;
    margin-right: -2rem;
`;
