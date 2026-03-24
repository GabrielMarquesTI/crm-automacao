import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // Importação da rota
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* O App agora "escuta" a URL do navegador */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)