import { lazy,ReactNode,Suspense } from 'react';
import { createHashRouter,useRoutes } from 'react-router-dom';
import type {RouteObject} from 'react-router-dom'
import Layout from './components/core/Layout'
const Home = lazy(() => import('./components/core/Home'))
// import Index from './components/core/Index';
const Reliability = lazy(() => import('./components/core/module/Reliability'))
const ReliabilityTrends  = lazy(() => import('./components/core/module/ReliabilityTrends'))

const lazyLoad = (children:ReactNode): ReactNode => {
  return <Suspense>{children}</Suspense>
}
// const router = createHashRouter([
//     {
//       path: "/",
//       element: lazyLoad(<Home />),
//     },
//     // {
//     //   path: "/index",
//     //   element: <Index />,
//     // },
//     {
//       path:"/reliability",
//       element: lazyLoad(<Reliability />)
//     },
//     {
//       path:"/reliability/trend",
//       element: lazyLoad(<ReliabilityTrends />)
//     }
//   ]);
// const router : RouteObject[] = [
//     {
//       path: "/",
//       element: <Layout />,
//       children:[
//         {
//           index:true,
//           element: lazyLoad(<Home />),
//         },
//         {
//           path: "/reliability/data",
//           element: lazyLoad(<Reliability />)
//         }, 
//         {
//           path:"/reliability/trend",
//           element: lazyLoad(<ReliabilityTrends />)
//         }
//       ]
//     },
//   ];
const router : RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children:[
      {
        index:true,
        element: lazyLoad(<Home />),
      },
    ]
  },
  {
    path:"/watch",
    element: <Layout />,
    children:[
      {
        path: "/watch/reliability",
        children:[
          {
            path: "/watch/reliability/data",
            element: lazyLoad(<Reliability />)
          }, 
          {
            path:"/watch/reliability/trend",
            element: lazyLoad(<ReliabilityTrends />)
          }
        ]
      }, 
    ]
  }
];


export default router;