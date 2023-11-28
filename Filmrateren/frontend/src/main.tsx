import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';

import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './apolloClient';

import './index.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

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
    <RecoilRoot>
      <ApolloProvider client={apolloClient}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </RecoilRoot>
  </StrictMode>,
);

export default router;
