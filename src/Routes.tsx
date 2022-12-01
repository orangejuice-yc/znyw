import { RouterProvider, RouteObject,useRoutes } from 'react-router-dom';
import router from './router'

// const RouterView = () => useRoutes(router)

const Routes = () => {
  return (
    // <RouterProvider router={router} />
    useRoutes(router)
  )
}

export default Routes



