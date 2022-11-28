import React from 'react';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Home from './components/core/Home';
import Index from './components/core/Index';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/index",
    element: <Index />,
  },
]);

const Routes = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default Routes
