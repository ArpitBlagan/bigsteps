import { Routes, Route,useLocation } from 'react-router-dom'
import './App.css'
import Home from './component/Home';
import Detail from './component/Detail';
import { AnimatePresence } from 'framer-motion';
import Navbar from './component/Navbar';
import Hire from './component/Hire';
function App() {
  const location=useLocation();
  return (
    <>
      <Navbar/>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={Home}/>
          <Route path="/detail" element={Detail}/>
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App
