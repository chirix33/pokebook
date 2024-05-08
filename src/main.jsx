import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import HomeView from './components/HomeView'
import ListView from './components/ListView'
import { ThemeProvider } from './context/ThemeContext';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={<HomeView />}
        />
        <Route
          exact
          path="/list"
          element={<ListView />}
        />
      </Routes>
      </BrowserRouter>
      {/* <App /> */}
    </ThemeProvider>
  </React.StrictMode>,
)
