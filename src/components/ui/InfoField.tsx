import styled from "styled-components"
import { Theme } from "../../types/ui"

export const InfoField = ({ name, value }: { name: string, value: string }) => {
    const StyledReadonlyField = styled.span<{ theme: Theme }>`
    padding: .5rem;
    margin:  .5rem;
    display: flex;
    border: ${props => props.theme.border};
    background-color: ${props => props.theme.secondaryBackground};
    border-radius: 5px;
    border: 1px solid ${props => props.theme.border}`;

    const StyledFieldContainer = styled.div<{ theme: Theme }>`
    flex: 1;
    flex-basis: 40%;
    box-sizing: border-box;
    
    @media (max-width: 767px) {
        flex-basis: 100%;
    }`


    return (
        <StyledFieldContainer>
            <span>{name}:</span>
            <StyledReadonlyField>{value}</StyledReadonlyField>
        </StyledFieldContainer>
    )
}