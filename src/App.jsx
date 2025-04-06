import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import History from './pages/History'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="history" element={<History />} />
        <Route path="*" element={<Home />} /> {/* Fallback */}
      </Route>
    </Routes>
  )
}

export default App