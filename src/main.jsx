import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
import './index.css'
import Root from './routes/root.jsx'
import LandingPage from './routes/landingPage.jsx'
import GameInterface from './routes/gameInterface.jsx'
import NotFound from './routes/notFound.jsx'

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