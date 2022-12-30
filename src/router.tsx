import { lazy,ReactNode,Suspense } from 'react';
import { createHashRouter,useRoutes } from 'react-router-dom';
import type {RouteObject} from 'react-router-dom'
import Layout from './components/core/Layout'
// import MonitorLayout from './components/core/module/MonitorLayout';
const Home = lazy(() => import('./components/core/Home'))
// import Index from './components/core/Index';
const Reliability = lazy(() => import('./components/core/module/Reliability'))
const ReliabilityTrends  = lazy(() => import('./components/core/module/ReliabilityTrends'))
const Applicability = lazy(() => import('./components/core/module/Applicability'))
const ApplicabilityTrends = lazy(() => import('./components/core/module/ApplicabilityTrends'))
const Maintainability = lazy(() => import('./components/core/module/Maintainability'))
const MaintainabilityTrends = lazy(() => import('./components/core/module/MaintainabilityTrends'))
const Security = lazy(() => import('./components/core/module/Security'))
const SecurityTrends = lazy(() => import('./components/core/module/SecurityTrends'))
const AlarmStatistic = lazy(() => import('./components/core/module/AlarmStatistic'))
const RealTimeAlarm = lazy(() => import('./components/core/module/RealTimeAlarm'))
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
    path:"/monitor",
    element: <Layout />,
    children:[
      {
        path: "/monitor/reliability",
        // element:<MonitorLayout />,
        children:[
          {
            path: "/monitor/reliability/data",
            element: lazyLoad(<Reliability />)
          }, 
          {
            path:"/monitor/reliability/trend",
            element: lazyLoad(<ReliabilityTrends />)
          }
        ]
      },
      {
        path: "/monitor/applicability",
        // element:<MonitorLayout />,
        children:[
          {
            path: "/monitor/applicability/data",
            element: lazyLoad(<Applicability />)
          }, 
          {
            path:"/monitor/applicability/trend",
            element: lazyLoad(<ApplicabilityTrends />)
          }
        ]
      }, 
      {
        path: "/monitor/maintainability",
        // element:<MonitorLayout />,
        children:[
          {
            path: "/monitor/maintainability/data",
            element: lazyLoad(<Maintainability />)
          }, 
          {
            path:"/monitor/maintainability/trend",
            element: lazyLoad(<MaintainabilityTrends />)
          }
        ]
      }, 
      {
        path: "/monitor/security",
        // element:<MonitorLayout />,
        children:[
          {
            path: "/monitor/security/data",
            element: lazyLoad(<Security />)
          }, 
          {
            path:"/monitor/security/trend",
            element: lazyLoad(<SecurityTrends />)
          }
        ]
      }, 
    ]
  },
  {
    path:"/alarm",
    element: <Layout />,
    children:[
      {
        path: "/alarm/statistic",
        element:lazyLoad(<AlarmStatistic />),
      },
      {
        path: "/alarm/actualtime",
        element:lazyLoad(<RealTimeAlarm />),
      },
    ]
  }
];


export default router;