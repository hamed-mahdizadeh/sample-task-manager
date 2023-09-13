import styled, { css } from "styled-components"
import { InputHTMLAttributes } from "react";
import { Theme } from "../../types/ui";

export const infoFieldCss = css<{theme: Theme}>`
    padding: .5rem;
    margin:  .5rem;
    display: flex;
    background-color: ${props => props.theme.secondaryBackground};
    border-radius: 5px;
    border: 1px solid ${props => props.theme.border};
    color: ${props => props.theme.main};
    width: 100%;
    box-sizing: border-box;
    `;

export const StyledFieldContainer = styled.div<{ theme: Theme, basis?: string }>`
    flex: 1;
    flex-basis: ${props => props.basis ? props.basis : '40%' };
    box-sizing: border-box;
    text-align: justify;
    @media (max-width: 767px) {
        flex-basis: 80%;
        text-align: center;
    }
    `;

export const StyledReadonlyField = styled.span<{ theme: Theme }>`
    ${infoFieldCss}`;

export const StyledInputField = styled.input<{ theme: Theme }>`
${infoFieldCss}`;

export const StyledTextAreaField = styled.textarea<{ theme: Theme }>`
${infoFieldCss}`;


export const InfoField = ({ name, value }: { name: string, value: string }) => {
    return (
        <StyledFieldContainer>
            <span>{name}:</span>
            <StyledReadonlyField>{value}</StyledReadonlyField>
        </StyledFieldContainer>
    );
}

export const TextAreaField = (props: InputHTMLAttributes<HTMLTextAreaElement> & {basis?: string}) => {
    return (
        <StyledFieldContainer basis={props.basis}> 
            <label htmlFor={props.name}>{props.title}:</label>
            <StyledTextAreaField id={props.name}  {...props}/>
        </StyledFieldContainer>
    );
}


export const InputField = (props: InputHTMLAttributes<HTMLInputElement> & {basis?: string}) => {
    return (
        <StyledFieldContainer basis={props.basis}> 
            <label htmlFor={props.name}>{props.title}:</label>
            <StyledInputField id={props.name} {...props}/>
        </StyledFieldContainer>
    );
}