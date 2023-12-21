import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
import './index.css'
import Root from './routes/root.jsx'
import LandingPage from './routes/landingPage.jsx'
import GameInterface from './routes/gameInterface.jsx'
import NotFound from './routes/notFound.jsx'
import Signup from './routes/signup.jsx'
import Login from './routes/login.jsx'

export const url = "http://localhost:5000"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/play',
        element: <GameInterface />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
          path: '*', // Catch-all route
          element: <NotFound /> // Render the NotFound component for unmatched routes
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)