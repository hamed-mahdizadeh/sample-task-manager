import styled from "styled-components";
import { UserInfoSummary } from "../types/user";

const StyledLi = styled.li`
    padding: .5rem;
`


export const SearchResultItem = ({user, onItemSelect} : {user: UserInfoSummary, onItemSelect: (user: UserInfoSummary) => any}) => {
    const handleItemSelect = () => {
        onItemSelect(user);
    } 
    
    return (
        <StyledLi onClick={handleItemSelect}>
            { user.firstName }
        </StyledLi>
    );
};
