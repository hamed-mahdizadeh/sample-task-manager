import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import Layout from './components/ui/Layout';
import { Provider } from 'react-redux';
import store from './store';




const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        loader: () => redirect('/home')
      },
      {
        path: '/home',
        lazy: async () => {
          const { Home } = await import('./pages/Home')
          return {
            element: <Home />
          }
        }
      },
      {
        path: '/users-summary',
        lazy: async () => {
          const  { UsersSummary } = await import('./pages/UsersSummary');
          return {
            element: <UsersSummary />
          }
        }
      },
      {
        path: '/user-details/:userId',
        lazy: async () => {
          const  { UserDetails } = await import('./pages/UserDetails');
          return {
            element: <UserDetails />
          }
        }
      }
    ]
  }
]);


//if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser');
  worker.start()
//}


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store} >   
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
