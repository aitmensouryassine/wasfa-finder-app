import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Home from './pages/Home';
import Error from './pages/Error';
import Saved from './pages/Saved';
import Search from './pages/Search';
import Recipe from './pages/Recipe';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import { RecipeProvider } from './context/recipe';
import { ThemeProvider } from './context/theme';

const router = createHashRouter([
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
      {
        path: '/recipe/:id',
        element: <Recipe />,
      },
      {
        path: '/terms',
        element: <Terms />,
      },
      {
        path: '/privacy',
        element: <Privacy />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <RecipeProvider>
        <RouterProvider router={router} />
      </RecipeProvider>
    </ThemeProvider>
  </React.StrictMode>
);
