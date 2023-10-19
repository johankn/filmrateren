import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import HomePage from './pages/HomePage.tsx';

import './index.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MoviePage from './pages/MoviePage.tsx';
import {
  RecoilRoot,
} from 'recoil';

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
      <RouterProvider router={router} />
    </RecoilRoot>
  </StrictMode>,
);

export default router;
