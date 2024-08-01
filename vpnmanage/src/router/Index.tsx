// routes.tsx
import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRouter";

const Home = lazy(() => import("@/views/Home"));
const Nodes = lazy(() => import('@/views/Node/Nodes'));
const Store = lazy(() => import('@/views/Store/Store'));
const Account = lazy(() => import('@/views/Account'));
const Layouts = lazy(() => import('@/views/Layouts'));
const Login = lazy(() => import('@/views/Login'));
const Register = lazy(() => import('@/views/Register'));

const withLoadingComponent = (comp: React.ReactElement) => (
    <React.Suspense fallback={<div>Loading...</div>}>
        {comp}
    </React.Suspense>
);

const routes = [
    {
        path: '/layout',
        element: <PrivateRoute>{withLoadingComponent(<Layouts />)}</PrivateRoute>,
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
        element: withLoadingComponent(<Login />)
    },
    {
        path: '/register',
        element: withLoadingComponent(<Register />)
    },
    {
        path: '/',
        element: <Navigate to="/layout/home" />
    },
    {
        path: '*',
        element: <Navigate to="/layout/home" />
    }
];

export default routes;