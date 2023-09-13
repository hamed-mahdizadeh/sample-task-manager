import React, { useCallback, useEffect, useState } from 'react';
import { TaskCard, TaskPanel } from '../components/TasksPanel';
import { Task } from '../types/task';
import { addUpdateTasks, deleteTask, getTasks } from '../api/tasksApi';
import { StyledColumnDiv, StyledHomeContainerDiv } from '../components/ui/Containers';


export const Home = () => {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskToEdit, setTaskToEdit] = useState<Task | undefined>();

    const loadTasks = useCallback(async () => {
        const tasks = await getTasks();
        if(tasks) {
            setTasks(tasks);
        }
    }, [])

    useEffect(() => {
        loadTasks();
    }, [loadTasks]);

    const handleAddUpdateTask = async (task: Task) => {
        const response = await addUpdateTasks(task);
        if(response.ok) {
            loadTasks();
            return true;
        }
        return false;
    }

    const handleCardEditClick = (task: Task) => {
        setTaskToEdit(task);
    }

    const handleCardDeleteClick = async (id: string) => {
        const response = await deleteTask(id);
        if(response.ok) {
            loadTasks();
        }
        //TODO handle not OK and exception  
    }

    const tasksList = tasks.map(
        (task) => <TaskCard 
        key={task.id} 
        task={task} 
        onDeleteClick={handleCardDeleteClick} 
        onEditClick={handleCardEditClick}/>);

    const handleCancelUpdate = () => {
        setTaskToEdit(undefined);
    }

    return (
        <StyledHomeContainerDiv>
            <StyledColumnDiv maxwidth='30rem' basis="30%">
                <TaskPanel 
                onAddUpdateTask={handleAddUpdateTask}
                onCancelEdit={handleCancelUpdate}
                task={taskToEdit} />
            </StyledColumnDiv>
            <StyledColumnDiv basis="70%" style={{gap: '.5rem', display: 'flex', flexWrap: 'wrap', overflowY: 'auto'}}>
                <h3 style={{width: '100%'}}>
                    Tasks:
                </h3>
                {tasksList}
            </StyledColumnDiv>
          
        </StyledHomeContainerDiv>
    );
};
