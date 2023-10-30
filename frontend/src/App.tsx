
import { BrowserRouter as Router } from 'react-router-dom';

import '@styles/App.css'
import { AuthWrapper } from './auth/authWrapper';

function App() {
  return (
    <Router>
      <AuthWrapper></AuthWrapper>
    </Router>
  )
}

export default App
