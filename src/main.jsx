import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css'

import Regiester from './Component/Regiester/Regiester';
import Layout from './Component/Layout/Layout';
import Login from './Component/Login/Login';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'regiester',
        element: <Regiester></Regiester>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
