
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';


import { AuthWrapper } from './auth/authWrapper';


function App() {
  return (
    <Router>
      <AuthWrapper></AuthWrapper>
    </Router>
  )
}

export default App
