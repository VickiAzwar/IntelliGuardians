
import React from "react";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "../views/errorPage/ErrorPage";
import Home from "../views/home/Home";
import BaseLayout from "./BaseLayout";
import Login from "../views/auth/Login";
import Detection from "../views/detection/Detection";
import Category from "../views/category/Category";
import Subscribe from "../views/subscribe/Subscribe";
import ProtectedRoute from "./routes/protectedRoute";
import MyComponent from "../views/testlogin/test";


function Routes() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Navigate to="/home" replace />, // Redirect to /home
            errorElement: <ErrorPage />,
        },

        {
            path: '/login',
            element: <Login/> ,
            errorElement: <ErrorPage />,
        },
        {
            path: '/haha',
            element: <p> Berhasil Login</p> ,
            errorElement: <ErrorPage />,
        },
        {
            path: '/home',
            element: <BaseLayout />,
            children: [
                {
                    path: '',
                    element: <ProtectedRoute />, // Use ProtectedRoute
                    children: [
                        {
                            path: '',
                            element: <Home />,
                        },
                    ],
                },
            ],
        },

        {
            path: '/detection',
            element: <BaseLayout />,
            children: [
                {
                    path: '',
                    element: <ProtectedRoute />, // Use ProtectedRoute
                    children: [
                        {
                            path: '',
                            element: <Detection />,
                        },
                    ],
                },
            ],
        },
        {
            path: '/category',
            element: <BaseLayout />,
            children: [
                {
                    path: '',
                    element: <ProtectedRoute />, // Use ProtectedRoute
                    children: [
                        {
                            path: '',
                            element: <Category />,
                        },
                    ],
                },
            ],
        },
        {
            path: '/subscribe',
            element: <BaseLayout />,
            children: [
                {
                    path: '',
                    element: <ProtectedRoute />, // Use ProtectedRoute
                    children: [
                        {
                            path: '',
                            element: <Subscribe />,
                        },
                    ],
                },
            ],
        }
    ]);

    return (
        <RouterProvider router={router} />
    );
    
}
export default Routes;