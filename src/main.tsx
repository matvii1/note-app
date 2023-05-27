import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import RouterProvider from './RouterProvider.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider>
    <App />
  </RouterProvider>
)
