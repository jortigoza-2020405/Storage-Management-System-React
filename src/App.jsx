import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Inventory from "./pages/Inventory"
import Navbar from "./components/Navbar"
import Movements from './pages/Movements'


function App() {
  const location = useLocation()
  const token = localStorage.getItem("token")

  // Oculta el navbar en rutas públicas
  const hideNavbarOnPaths = ["/login", "/register"]
  const shouldShowNavbar = token && !hideNavbarOnPaths.includes(location.pathname)

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/movements" element={<Movements />} />
      </Routes>
    </>
  )
}

export default App
