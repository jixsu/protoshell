import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import App from './routes/_app.tsx'
import Error from './routes/_error.tsx'
import './index.css'

const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  errorElement: <Error />,
}])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
