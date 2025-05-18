import React from 'react'
import Welcome from './Pages/Welcome'
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import { ThemeProvider } from './context/ThemeContext';


const App = () => {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  )
}

export default App;