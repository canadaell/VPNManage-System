
import Home from "@/views/Home"
// import About from "@/views/About"
import  {Navigate}  from "react-router-dom"
import React, { lazy } from "react";
const Nodes = lazy(() => import('@/views/Node/Nodes'))
const Store = lazy(() => import('@/views/Store/Store'))
const Account = lazy(() => import('@/views/Account'))
const Layouts = lazy(() => import('@/views/Layouts'))
const Login = lazy(() => import('@/views/Login'))
const Register = lazy(() => import('@/views/Register'))
import path from "path";

const lazyLoading = (comp:JSX.Element) => (
    <React.Suspense fallback={<div>Loading...</div>}>
        {comp}
    </React.Suspense>
)

const withLoadingComponent = (comp:JSX.Element) => (
    <React.Suspense fallback={<div>Loading...</div>}>
        {comp}
    </React.Suspense>
)

const routes = [
    {
      path: '/layout',
      element: <Layouts />,
      children: [
        {
          path: 'home',
          element: withLoadingComponent(<Home />)
        },
        {
          path: 'nodes',
          element: withLoadingComponent(<Nodes />)
        },
        {
          path: 'store',
          element: withLoadingComponent(<Store />)
        },
        {
          path: 'account',
          element: withLoadingComponent(<Account />)
        },
      ]
    },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: withLoadingComponent(<Register />)
      },
    //access other routes
    {
      path: '*',
      element: <Navigate to="/layout/home" />
    }
  ];

// const routes = [
//     {
//         path: '/',
//         element:<Navigate to="/home" /> 
//     },
//     {
//         path: '/home',
//         element: <Home />
//     },
//     {
//         path: '/about',
//         element: lazyLoading(<About />)
//     }
// ];

export default routes

// import App from '@/App'
// import Home from '@/views/Home'
// import About from '@/views/About'
// import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'


// const baseRouter = () => {
//     return(
//     <BrowserRouter>
//         <Routes>
//             <Route path="/" element={<App />}>
//             <Route path='/' element={<Navigate to="Home " />}></Route>
//                 <Route path= "/home" element={<Home />}></Route>
//                 <Route path= "/about" element={<About />}></Route>
//             </Route>
//         </Routes>
//     </BrowserRouter>
//     )
// }

// export default baseRouter