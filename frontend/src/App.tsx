
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';


import Header from './component/Navbar';
import { AuthWrapper } from './auth/authWrapper';


function App() {
  return (
    <Router>
      <Header />
      <AuthWrapper></AuthWrapper>
    </Router>
  )
}

export default App
