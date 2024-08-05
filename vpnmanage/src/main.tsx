import React from 'react'
import ReactDOM from 'react-dom/client'
//import reset-css
import "reset-css"
//import UI framework css

//import global css
import '@/assets/styles/global.scss'
// import component css
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
// import Router from './router/Index.tsx'

//manage state

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
)
