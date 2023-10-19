import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';

import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './apolloClient'; 

import './index.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: 'project2/',
    element: <HomePage />,
  },
  {
    path: 'project2/moviePage/:movieID',
    element: <MoviePage />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>  {/* <-- Wrap your app with ApolloProvider */}
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>,
);

export default router;
