// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux';
import Store from './redux/store.js';
import UserDashboard from './pages/dashboard/UserDashboard.jsx';

import './index.css'
import {BrowserRouter} from 'react-router-dom'
createRoot(document.getElementById('root')).render(
  // <BrowserRouter Store>
  //   <App />
  //   {/* <UserDashboard /> */}
  // </BrowserRouter>
  <Provider store={Store}>
    <App />
    <UserDashboard />
  </Provider>
)

