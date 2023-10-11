import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import HomePage from './pages/HomePage.tsx';

import './index.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MoviePage from './pages/MoviePage.tsx';

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
    <RouterProvider router={router} />
  </StrictMode>,
);

export default router;
