import React from 'react';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Home from './components/core/Home';
import Index from './components/core/Index';
import Reliability from './components/core/module/Reliability';
import ReliabilityTrends from './components/core/module/ReliabilityTrends';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/index",
    element: <Index />,
  },
  {
    path:"/reliability",
    element: <Reliability />
  },
  {
    path:"/reliabilitytrends",
    element: <ReliabilityTrends />
  }
]);

const Routes = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default Routes
