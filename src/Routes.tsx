import React, { lazy,ReactNode } from 'react';
import { createBrowserRouter,RouterProvider,createHashRouter } from 'react-router-dom';
const Home = lazy(() => import('./components/core/Home'))
// import Index from './components/core/Index';
const Reliability = lazy(() => import('./components/core/module/Reliability'))
const ReliabilityTrends  = lazy(() => import('./components/core/module/ReliabilityTrends'))

const lazyLoad = (children:ReactNode): ReactNode => {
  return <div>{children}</div>
}
const router = createHashRouter([
  {
    path: "/",
    element: lazyLoad(<Home />),
  },
  // {
  //   path: "/index",
  //   element: <Index />,
  // },
  {
    path:"/reliability",
    element: lazyLoad(<Reliability />)
  },
  {
    path:"/reliability/trend",
    element: lazyLoad(<ReliabilityTrends />)
  }
]);

const Routes = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default Routes



