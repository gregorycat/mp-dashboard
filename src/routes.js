import React, { useContext, createContext, useState } from "react";
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import { Partner } from './pages/Partner';
import { Extension } from './pages/Extension';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import { DashoardExtension } from './pages/DashboardExtension';
import { DashboardPartner } from './pages/DashboardPartner';


// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'extensions', element: <DashoardExtension /> },
        { path: 'partners', element: <DashboardPartner /> },
        { path: 'partner/:id', element: <Partner /> },
        { path: 'extension/:id', element: <Extension /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: '*', element: <DashoardExtension /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        
        { path: '/', element: <Login /> },
        { path: 'login', element: <Login /> },
        { path: 'logout', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
