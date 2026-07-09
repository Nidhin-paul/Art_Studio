import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import AdminPage from './pages/AdminPage'

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#/')

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.hash || '#/')
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onLocationChange)
    return () => window.removeEventListener('hashchange', onLocationChange)
  }, [])

  const renderPage = () => {
    if (currentPath === '#/about') return <AboutPage />
    if (currentPath === '#/contact') return <ContactPage />
    if (currentPath === '#/admin') return <AdminPage />
    return <HomePage />
  }

  const isAdmin = currentPath === '#/admin'

  return (
    <>
      {!isAdmin && <Navbar />}
      {renderPage()}
      {!isAdmin && <Footer />}
    </>
  )
}

export default App
