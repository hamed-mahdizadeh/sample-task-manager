import { Task } from "../types/task"

export const addUpdateTasks = async (taskData: Task) => {
    return await fetch('/tasks', {
        method: 'PUT',
        headers: {
           'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
   });
}


export const getTasks = async (): Promise<Task[] | undefined> => {
   const response = await fetch('/tasks');
   
   if(response.ok) {
      const data = await response.json();
      return data.tasks;
   }
   //TODO Handle response not OK
}

export const deleteTask = async (id: string) => {
   return await fetch(`/tasks/${id}`, { method: 'DELETE'});
   //TODO Handle response not OK
}