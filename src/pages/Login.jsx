"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import "../styles/Auth.css";

const Login = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful");
      window.location.href = "/dashboard";
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      await signInWithPopup(auth, googleProvider);
      console.log("Google login successful");
      window.location.href = "/dashboard";
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

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

        <div className="auth-divider">
          <span>O</span>
        </div>

        <button onClick={handleGoogleLogin} className="google-button" disabled={loading}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M21.35,11.1H12v3.2h5.59c-0.56,2.68-2.96,4.7-5.59,4.7c-3.35,0-6.07-2.72-6.07-6.07 
              s2.72-6.07,6.07-6.07c1.53,0,2.92,0.57,3.98,1.51l2.24-2.24C16.54,4.58,14.39,3.7,12,3.7
              c-4.97,0-9,4.03-9,9s4.03,9,9,9c5.14,0,8.63-3.67,8.63-8.82c0-0.58-0.07-1.16-0.19-1.73L21.35,11.1z"
              fill="#FFF"
            ></path>
          </svg>
          Continuar con Google
        </button>

        <div className="auth-footer">
          <p>
            ¿No tienes una cuenta? <a href="/register">Regístrate</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
