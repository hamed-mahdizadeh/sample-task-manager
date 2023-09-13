import { createSlice } from "@reduxjs/toolkit";
import { Task } from '../types/task';
import { AppDispatch, GetState } from "./index";
import { addUpdateTasks, deleteTask, getTasks } from "../api/tasksApi";

export interface TaskSlice {
    tasks: Task[];
    selectedTask: Task;
}

const initialState: TaskSlice = {
    tasks: [],
    selectedTask: {
        description: '',
        id: '',
        state: '',
        title: '',
        assignee: '',
        reporter: ''  
    }
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addUpdateTask(state, action: {payload: Task}) {
            if(action.payload.id) {
                const targetIndex = state.tasks.findIndex(tsk => tsk.id === action.payload.id);
                if(targetIndex > -1) {
                    state.tasks[targetIndex] = action.payload;
                }
            } else {
                state.tasks.push(action.payload);
            }
        },
        loadTasks(state, action: {payload: Task[]}) {
            state.tasks = action.payload;
        },
        resetTargetTask(state){
            state.selectedTask = {
                description: '',
                id: '',
                state: '',
                title: '',
                assignee: '',
                reporter: ''  
            }
        },
        setTargetTask(state, action: {payload: string}) {
            const target = state.tasks.find(task => task.id === action.payload);
            if(target) {
                state.selectedTask = target;
            }
        },
        removeTask(state, action: {payload: string}) {
            state.tasks = state.tasks.filter(task => task.id !==  action.payload);
        }
    }
});

const addUpdateAndSyncTask = (task: Task ) => async (dispatch: AppDispatch, getState: GetState) => {
        const response = await addUpdateTasks(task);
        if(response.ok) {
            dispatch(tasksSlice.actions.addUpdateTask(task));
            dispatch(tasksSlice.actions.resetTargetTask());
        }
}

const loadTasks = () => async (dispatch: AppDispatch, getState: GetState) => {
    const tasks = await getTasks();
    if(tasks) {
        dispatch(tasksSlice.actions.loadTasks(tasks));
    } 
}

const removeTaskAndSync = (taskId: string) => async (dispatch: AppDispatch, getSate: GetState) => {
    const response = await deleteTask(taskId);
    if(response.ok) {
        dispatch(tasksSlice.actions.removeTask(taskId));
    }
}


export const tasksActions = {
    ...tasksSlice.actions,
    addUpdateAndSyncTask,
    loadTasks,
    removeTaskAndSync
};

export default tasksSlice;