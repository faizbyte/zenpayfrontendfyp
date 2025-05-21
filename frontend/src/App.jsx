import React from 'react'
import Welcome from './Pages/Welcome'
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import TransactionHistory from './Pages/TransactionHistory';
import { ThemeProvider } from './context/ThemeContext';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<TransactionHistory />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App;