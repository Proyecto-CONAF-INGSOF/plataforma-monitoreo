
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Login from './component/Login';
import Home from './pages/Home';
import Header from './component/Navbar';
import Sidebar from './component/Sidebar';


function App() {
  return (
    <Router>
      <Header/> 
      {
        window.location.pathname !== '/admin' ? <Sidebar/> : null
      }
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/admin" element={<Login/>} />
        {/* Agrega más rutas para otras páginas */}
      </Routes>
    </Router>
  )
}

export default App
