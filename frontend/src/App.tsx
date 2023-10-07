
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Login from './component/Login';
import Home from './pages/Home';
import Header from './component/Navbar';
import RequireAuth from './component/RequireAuth';
import Protected from './component/Protected';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Login />} />
        {/* Agrega más rutas para otras páginas */}
        <Route
          path="/protected"
          element={
            <RequireAuth>
              <Protected></Protected>
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
