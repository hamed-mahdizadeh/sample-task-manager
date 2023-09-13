import { Task } from "../types/task";
import { StyledTableHeaderRowDiv } from "./ui/Table";
import { ButtonContainer, StyledTaskCardRow, StyledTaskContainerDiv } from "./ui/Containers";
import Button from "@mui/material/Button";

export const TaskCard = ({
    task,
    onEditClick,
    onDeleteClick }:
    {
        task: Task,
        onEditClick: (id: string) => any,
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
                <Button variant="contained" color="info" onClick={() => onEditClick(task.id)}>
                    Edit
                </Button>
            </ButtonContainer>
        </StyledTaskContainerDiv>
    )
}
