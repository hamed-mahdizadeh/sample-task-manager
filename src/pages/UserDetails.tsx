import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { UserInfoDetails } from '../types/user';

import { UserInfoPanel } from '../components/UserInfoPanel';

import { 
    StyledBody, 
    StyledHeaderDiv, 
    StyledProfileContainerDiv, 
    StyledProfileHeaderDiv 
} from '../components/ui/Containers';
import { StyledAvatarImg } from '../components/ui/StyledElements/Images';

export const UserDetails = () => {
    const [user, setUser] = useState<UserInfoDetails>();
    const { userId } = useParams();

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetch(`/users/details/${userId}`);
            if (response.ok) {
                const data: { user: UserInfoDetails } = await response.json();
                const user = data.user;
                setUser(user);
            } else {
                //handle exception
            }
        }

        if (userId) {
            fetchUserData();
        }

    }, [userId]);




    return (
       <StyledProfileContainerDiv>
            <StyledProfileHeaderDiv>
                <StyledHeaderDiv grow={3}>
                    <span>{`${user?.firstName} ${user?.lastName}` }</span>
                </StyledHeaderDiv>
                <StyledHeaderDiv grow={0}>
                    <StyledAvatarImg  src={user?.profilePicture} alt='user' />
                </StyledHeaderDiv>
            </StyledProfileHeaderDiv>
            <StyledBody style={{display: 'flex'}}>

                {user && <UserInfoPanel user={user} />}
            </StyledBody>
       </StyledProfileContainerDiv>
    );
};