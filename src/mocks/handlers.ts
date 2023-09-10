import { RestRequest, rest } from 'msw';
import dummyUsersInfoSummaries from './dummy-users-summary.json';
import dummyUsersInfoDetails from './dummy-users-details.json';

const pageSize = 10;

type RequestType = RestRequest<never, any> & {
  query: {
    order?: 'asc' | 'desc',
    searchTerm?: string,
    sortBy?: 'age' | 'firstName'
  }
};

export const UsersHandler = rest.get('/users/page/:pageNumber', async (req, res, ctx) => {
    const { order, searchTerm, sortBy } = (req as RequestType)?.query ?? {};

    const  { pageNumber } = req.params;
    
  
    let users = [...dummyUsersInfoSummaries];
  
    if (searchTerm && (searchTerm as string).trim() !== '') {
      users = users.filter(user => user.firstName.toLowerCase().includes((searchTerm as string).toLowerCase()))
  
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

  

  const user = dummyUsersInfoDetails.find(user => user.id === userId);

  console.log({userId, dummyUsersInfoDetails});

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




export const handlers = [
  UsersHandler,
  userDetailsHandler
]