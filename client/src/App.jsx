import './App.css'
import { Routes, Route, json } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboad from './pages/Dashboard'
import Register from './pages/Register'
import { useNavigate } from 'react-router-dom'

export const Logout = () => {
    const navigate = useNavigate()
    const handleLogout = async () => {
      let res = await fetch("http://localhost:8000/api/logout/", {
        method: "POST",
        headers: {
          "Authorization": "token " + JSON.parse(localStorage.getItem('token')) 
        }
      })
      localStorage.clear()
      // localStorage.setItem('token', null)
      // localStorage.setItem('user', null)
      navigate("/")
    }

    return (
      <button onClick={handleLogout} type="button" className="btn btn-secondary">Logout</button>
    )
}

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login'element={<Login />} ></Route>
        <Route path='/dashboard' element={<Dashboad />}></Route>
      </Routes>
    </>
  )
}

export default App
