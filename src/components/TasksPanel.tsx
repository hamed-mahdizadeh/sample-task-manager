import { ChangeEvent, useEffect, useState } from "react";

import { ButtonContainer, StyledHeaderTitleDiv, StyledSubContainerDiv} from "./ui/Containers";
import { InputField, TextAreaField } from "./ui/InfoField";

import Button from '@mui/material/Button';

import { useAppDispatch, useAppSelector } from "../hooks/useStore";
import { tasksActions } from "../store/tasks-slice";


export const TaskPanel = () => {

    const dispatch = useAppDispatch();

    const target = useAppSelector(state => state.tasks.selectedTask);
   
    useEffect(() => {
        setTaskData({...target});
    }, [target]);

    const [taskData, setTaskData] = useState({ ...target });

    const handleCancelUpdate = () => {
        dispatch(tasksActions.resetTargetTask());
    }

    const handleSubmit = () => {
        dispatch(tasksActions.addUpdateAndSyncTask(taskData))
    }

    const handleFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTaskData(current => {
            return {
                ...current,
                [event.target.name]: event.target.value
            }
        });
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
                        onClick={handleCancelUpdate}>Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        type="submit">{taskData.id ? 'Update' : 'Add'}
                    </Button>
                </ButtonContainer>

            </StyledSubContainerDiv>

        </form>

    )
}