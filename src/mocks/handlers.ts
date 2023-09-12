import {  rest } from 'msw';
import dummyUsersInfoSummaries from './dummy-users-summary.json';
import dummyUsersInfoDetails from './dummy-users-details.json';
import dummyTasks from './dummy-tasks.json';
import { Task } from '../types/task';
import { UserInfoSummary, UserInfoDetails } from '../types/user';
import { faker } from '@faker-js/faker';


const pageSize = 10;

const db: {usersSummary: UserInfoSummary[], usersDetails: UserInfoDetails[], tasks: Task[]}  = {
    usersSummary: [...(dummyUsersInfoSummaries as UserInfoSummary[])],
    usersDetails: [...(dummyUsersInfoDetails as UserInfoDetails[])],
    tasks: [...(dummyTasks as Task[])],
}

export const usersHandler = rest.get('/users/page/:pageNumber', async (req, res, ctx) => {

    const searchTerm = req.url.searchParams.get('searchTerm');
    const order = req.url.searchParams.get('order');
    const sortBy = req.url.searchParams.get('sortBy');

    const  { pageNumber } = req.params;
    
  
    let users = [...db.usersSummary];
  
    if (searchTerm && (searchTerm as string).trim() !== '') {
      users = users.filter(user => user.firstName.toLowerCase().includes((searchTerm as string).toLowerCase()));
    }
    if (sortBy) {
      const orderType = order ?? 'asc';
  
      if (sortBy === 'age') {
        users = users.sort((a, b) => (a.age - b.age));
      } else if (sortBy === 'firstName') {
        users = users.sort((a, b) => {
          if (a.firstName === b.firstName) {
            return 0;
          } else if (a.firstName > b.firstName) {
            return orderType === 'desc' ? -1 : 1;
          } else {
            return orderType === 'desc' ? 1 : -1;
          }
        });
      }
  
    }
  
    const totalPages = Math.ceil(users.length / pageSize);

    const startPage = +pageNumber > 0 ? +pageNumber -1 : 1;
  
    users = users.slice(startPage * 10, (startPage + 1) *10);
  
    return res(
      ctx.status(200),
      ctx.json({
        users,
        totalPages
      }),
    );
});


export const userDetailsHandler = rest.get('/users/details/:userId', async (req, res, ctx) => {

  const { userId } = req.params;

  

  const user = db.usersDetails.find(user => user.id === userId);

  if(user) {
    return res(
      ctx.status(200),
      ctx.json({
        user
      }),
    );
  } else {
    return res(
      ctx.status(404),
    );
  }
});

export const tasksListHandler = rest.get('/tasks', async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        tasks: db.tasks
      }),
    );
});

export const tasksAddHandler = rest.put('/tasks', async (req, res, ctx) => {
  const task = await req.json<Task>();
  if(task.id) {
    const currentTaskIndex = db.tasks.findIndex(current => current.id === task.id);
    if(currentTaskIndex > -1) {
      db.tasks[currentTaskIndex] = {
        ...task
      }
    } else {
      return res(
        ctx.status(404), 
      );
    }
  } else {
    db.tasks.push({
      ...task,
      id: faker.string.uuid()
    });
  };
  return res(
    ctx.status(200), 
  );
});


export const tasksDeleteHandler = rest.delete('/tasks/:taskId', async (req, res, ctx) => {
  const  { taskId } = req.params;
 
  db.tasks = db.tasks.filter(task => task.id !== taskId);
  return res(
    ctx.status(200), 
  );
});




export const handlers = [
  usersHandler,
  userDetailsHandler,
  tasksListHandler,
  tasksAddHandler,
  tasksDeleteHandler
]