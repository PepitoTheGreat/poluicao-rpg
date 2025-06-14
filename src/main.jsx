import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom' // 1. ADICIONE ESTA LINHA

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 2. ENVOLVA O <App /> COM O <BrowserRouter> ASSIM: */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)