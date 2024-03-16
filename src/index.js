import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Home from './pages/Home';
import Error from './pages/Error';
import Saved from './pages/Saved';
import Search from './pages/Search';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ContextProvider } from './context';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/search',
        element: <Search />,
      },
      {
        path: '/saved',
        element: <Saved />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>
);
