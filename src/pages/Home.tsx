import React from 'react';
import {  TaskPanel } from '../components/TasksPanel';
import { StyledColumnDiv, StyledHomeContainerDiv } from '../components/ui/Containers';
import { TasksList } from '../components/TasksLists';



export const Home = () => {

    return (
        <StyledHomeContainerDiv>
            <StyledColumnDiv maxwidth='30rem' basis="30%">
                <TaskPanel  />
            </StyledColumnDiv>
            <StyledColumnDiv basis="70%">
                <h3 style={{width: '100%'}}>
                    Tasks:
                </h3>
               <TasksList />
            </StyledColumnDiv>
          
        </StyledHomeContainerDiv>
    );
};
