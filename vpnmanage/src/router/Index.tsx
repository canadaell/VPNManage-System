
import Home from "@/views/Home"
// import About from "@/views/About"
import  {Navigate}  from "react-router-dom"
import React, { Children, lazy } from "react";
import { Layout } from "antd";
const Wallet = lazy(() => import('@/views/Wallet'))
const Nodes = lazy(() => import('@/views/Nodes'))
const Store = lazy(() => import('@/views/Store'))
const Account = lazy(() => import('@/views/Account'))
const Invite = lazy(() => import('@/views/Invite'))
const Layouts = lazy(() => import('@/views/Layouts'))

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
      path: '/',
      element: <Layouts />
    },
    {
      path: '/',
      element: <Layouts />,
      children: [
        {
          path: 'home',
          element: withLoadingComponent(<Home />)
        },
        {
          path: 'wallet',
          element: withLoadingComponent(<Wallet />)
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
        {
          path: 'invite', 
          element: withLoadingComponent(<Invite />)
        },
      ]
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