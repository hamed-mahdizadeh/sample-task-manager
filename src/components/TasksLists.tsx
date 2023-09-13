import { useEffect, useMemo } from "react";
import { TaskCard } from "./TaskCard";
import { useAppDispatch, useAppSelector } from "../hooks/useStore";
import { tasksActions } from "../store/tasks-slice";
import { Task } from "../types/task";

export const TasksList = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(tasksActions.loadTasks());
    }, []);

    const tasks = useAppSelector(state => state.tasks.tasks);


    const handleCardDeleteClick = (id: string) => {
        dispatch(tasksActions.removeTaskAndSync(id));
    }

    const handleCardEditClick = (id: string) => {
        dispatch(tasksActions.setTargetTask(id));
    }

    const tasksList =  tasks.map(
        (task) => <TaskCard
            key={task.id}
            task={task}
            onDeleteClick={handleCardDeleteClick}
            onEditClick={handleCardEditClick} />);

    return (<>
        {tasksList}
    </>);
}