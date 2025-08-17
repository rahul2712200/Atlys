
import './App.css'
import Feedlist from './Components/Feedlist'
import './index.css'
import Login from './Components/Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Feedlist />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
