"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/Auth.css"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleEmailLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("http://localhost:5500/v1/employer/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userLoggin: email,
          password: password
        })
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.message || "Credenciales incorrectas")

      // Guardar token en localStorage
      localStorage.setItem("token", data.token)

      console.log("Login exitoso")
      navigate("/home")
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <h1>ALMACENADORA</h1>
          <h2>Acceso Seguro</h2>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleEmailLogin} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            ¿No tienes una cuenta? <a href="/register">Regístrate</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
