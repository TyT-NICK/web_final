import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import './App.scss'

import Header from './components/header/header'
import Footer from './components/footer/footer'
import { useAuth } from './hooks/auth.hook'
import AuthContext from './context/AuthContext'
import { useRoutes } from './routes'

function App() {
  const { token, login, logout, adminId } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
  return (
    <AuthContext.Provider value={{
      token, login, logout, adminId, isAuthenticated,
    }}>
      <Router>
        <Header />
        <main id="page-wrap">
          {routes}
        </main>
        <Footer />
      </Router>
    </AuthContext.Provider>
  )
}

export default App
