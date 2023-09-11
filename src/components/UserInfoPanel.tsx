import { UserInfoDetails } from "../types/user";
import { AddressPanel } from "./AddressPanel";
import { StyledSubContainerDiv } from "./ui/Containers";
import { InfoField } from "./ui/InfoField";

export const UserInfoPanel = ({ user }: { user: UserInfoDetails }) => {
    return (
        <>
            <StyledSubContainerDiv>
                <InfoField name='Email' value={user.email} />
                <InfoField name='Age' value={`${user.age}`} />
            </StyledSubContainerDiv>
            <AddressPanel user={user} />
        </>
    );
}