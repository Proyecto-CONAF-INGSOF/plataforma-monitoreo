
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Monitoring from './component/Monitoring';
import Login from './component/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Monitoring/>} />
        <Route path="/admin" element={<Login/>} />
        {/* Agrega más rutas para otras páginas */}
      </Routes>
    </Router>
  )
}

export default App
