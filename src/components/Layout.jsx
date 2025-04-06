import { Outlet, Link } from 'react-router-dom'
import { useState } from 'react'
import './Layout.css'

const Layout = () => {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <header className="app-header">
        <nav className="nav-container">
          <Link to="/" className="logo-link">
            <h1>PixelMagic</h1>
          </Link>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/history">History</Link>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="theme-toggle"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </nav>
      </header>
      
      <main className="app-main">
        <Outlet />
      </main>
      
      <footer className="app-footer">
        <p>© {new Date().getFullYear()} PixelMagic - AI Image Processing</p>
      </footer>
    </div>
  )
}

export default Layout