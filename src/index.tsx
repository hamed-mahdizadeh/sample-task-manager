import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import { Layout } from './components/ui/Layout/Layout';



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
          const { Home } = await import('./components/Home/Home')
          return {
            element: <Home />
          }
        }
      },
      {
        path: '/users-summary',
        lazy: async () => {
          const  { UsersSummary } = await import('./components/UsersSummary/UsersSummary');
          return {
            element: <UsersSummary />
          }
        }
      },
      {
        path: '/user-details',
        lazy: async () => {
          const  { UserDetails } = await import('./components/UserDetails/UserDetails');
          return {
            element: <UserDetails />
          }
        }
      }
    ]
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
