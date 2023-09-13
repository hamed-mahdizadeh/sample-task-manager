import { UserInfoDetails } from "../types/user"

import { StyledHeaderTitleDiv, StyledSubContainerDiv } from "./ui/Containers"
import { InfoField } from "./ui/InfoField"

export const AddressPanel = ({ user }: { user: UserInfoDetails }) => {
        
    return (
        <StyledSubContainerDiv>
            <StyledHeaderTitleDiv grow={1}>
                <span>Address:</span>
            </StyledHeaderTitleDiv>
            <InfoField name='Country' value={user.address.Country} />
            <InfoField name='State' value={user.address.State} />
            <InfoField name='City' value={user.address.City} />
            <InfoField name='Line 1' value={user.address.Line1} />
            <InfoField name='Line 2' value={user.address.Line2} />
            <InfoField name='PostalCode' value={user.address.PostalCode} />
        </StyledSubContainerDiv>
    )
}