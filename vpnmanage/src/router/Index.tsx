
import Home from "@/views/Home"
// import About from "@/views/About"
import  {Navigate}  from "react-router-dom"
import React, { lazy } from "react";
const About = lazy(() => import('@/views/About'))


const lazyLoading = (comp:JSX.Element) => (
    <React.Suspense fallback={<div>Loading...</div>}>
        {comp}
    </React.Suspense>
)

const routes = [
    {
        path: '/',
        element:<Navigate to="/home" /> 
    },
    {
        path: '/home',
        element: <Home />
    },
    {
        path: '/about',
        element: lazyLoading(<About />)
    }
];

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