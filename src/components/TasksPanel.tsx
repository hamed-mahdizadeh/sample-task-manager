import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Task } from "../types/task";

import { ButtonContainer, StyledHeaderTitleDiv, StyledSubContainerDiv, StyledTaskCardRow, StyledTaskContainerDiv } from "./ui/Containers";
import { InputField, TextAreaField } from "./ui/InfoField";

import Button from '@mui/material/Button';
import { StyledTableHeaderRowDiv } from "./ui/Table";

const initialTaskData = (): Task => ({
    description: '',
    id: '',
    state: '',
    title: '',
    assignee: '',
    reporter: ''
});


export const TaskCard = ({
    task,
    onEditClick,
    onDeleteClick }:
    {
        task: Task,
        onEditClick: (task: Task) => any,
        onDeleteClick: (id: string) => any
    }) => {
    return (
        <StyledTaskContainerDiv>
            <StyledTableHeaderRowDiv>
                {task.title}
            </StyledTableHeaderRowDiv>
            <div>Description:</div>
            <StyledTaskCardRow>{task.description}</StyledTaskCardRow>
            <div>Reporter:</div>
            <StyledTaskCardRow>{task.reporter}</StyledTaskCardRow>
            <div>Assignee:</div>
            <StyledTaskCardRow>{task.assignee}</StyledTaskCardRow>
            <ButtonContainer>
                <Button variant="contained" color="warning" onClick={() => onDeleteClick(task.id)}>
                    Delete
                </Button>
                <Button variant="contained" color="info" onClick={() => onEditClick(task)}>
                    Edit
                </Button>
            </ButtonContainer>
        </StyledTaskContainerDiv>
    )
}

export const TaskPanel = (
    {
        onAddUpdateTask,
        onCancelEdit,
        task
    }:
        {
            onAddUpdateTask: (tasks: Task) => Promise<boolean>,
            onCancelEdit: () => void,
            task?: Task
        }) => {

    const [taskData, setTaskData] = useState<Task>(initialTaskData());

    useEffect(() => {
        if (task) {
            setTaskData({
                ...task
            });
        } else {
            setTaskData(initialTaskData());
        }
    }, [task]);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const isDone = await onAddUpdateTask(taskData);
        if (isDone) {
            setTaskData(initialTaskData());
        }
    }

    const handleFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTaskData(current => {
            return {
                ...current,
                [event.target.name]: event.target.value
            }
        });
    }

    const handleCancelEdit = () => {
        setTaskData(initialTaskData());
        onCancelEdit();
    }

    return (
        <form onSubmit={handleSubmit}>
            <StyledSubContainerDiv>
                <StyledHeaderTitleDiv grow={1}>
                    <span>New Task:</span>
                </StyledHeaderTitleDiv>
                <InputField
                    title="Title" name="title"
                    value={taskData.title}
                    onChange={handleFieldChange}
                    basis={'80%'}
                    required
                />
                <TextAreaField
                    title="Description"
                    name="description"
                    value={taskData.description}
                    onChange={handleFieldChange}
                    basis={'80%'}
                />
                <InputField
                    title="State"
                    name="state"
                    value={taskData.state}
                    onChange={handleFieldChange} />
                <InputField
                    title="Reporter"
                    name="reporter"
                    value={taskData.reporter}
                    onChange={handleFieldChange} />
                <InputField
                    title="Assignee"
                    name="assignee"
                    value={taskData.assignee}
                    onChange={handleFieldChange} />
                <ButtonContainer>
                    <Button
                        variant="contained"
                        type="submit"
                        onClick={handleCancelEdit}>Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        type="submit">{task ? 'Update' : 'Add'}
                    </Button>
                </ButtonContainer>

            </StyledSubContainerDiv>

        </form>

    )
}