"use client";

import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

const Register = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  // ---------------------- REGISTRO CON EMAIL -----------------------
  const handleEmailRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    try {
      // 1️⃣ Crear usuario en Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: name });

      // 2️⃣ Enviar datos a MongoDB
      const newUser = {
        name,
        surname,
        username,
        email,
        password,
        phone,
        role: "client",
      };

      const response = await fetch(
        "http://localhost:5500/v1/employer/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Error al registrar");

      console.log("Registro exitoso");
      nav("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------------- REGISTRO CON GOOGLE -----------------------
  const handleGoogle = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const displayName = user.displayName || "";
      let firstName = "";
      let lastName = "";

      if (displayName) {
        const nameParts = displayName
          .split(" ")
          .filter((part) => part.length > 0);
        if (nameParts.length > 0) firstName = nameParts[0];
        if (nameParts.length > 1)
          lastName = nameParts.slice(1).join(" ");
      }

      const newUser = {
        name: firstName || "GoogleUser",
        surname: lastName || "Google",
        username: user.email.split("@")[0],
        email: user.email,
        password: "google-oauth-" + user.uid,
        phone: "00000000",
        role: "client",
      };

      const response = await fetch(
        "http://localhost:5500/v1/employer/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        }
      );

      const resData = await response.json();
      if (!response.ok) {
        console.error("Error al guardar en Mongo:", resData);
        setError(resData.message || "Error al registrar en base de datos.");
        return;
      }

      console.log("Registro con Google exitoso");
      nav("/dashboard");
    } catch (err) {
      console.error("Error en registro con Google:", err);
      if (err.code === "auth/popup-closed-by-user") {
        setError("Cancelaste el registro con Google.");
      } else {
        setError("Error al registrar con Google.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ---------------------- FORMULARIO -----------------------
  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <h1>ALMACENADORA</h1>
          <h2>Crear Cuenta</h2>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleEmailRegister} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="surname">Apellido</label>
            <input
              type="text"
              id="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Nombre de Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Teléfono</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="form-input"
            />
          </div>

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
              minLength="6"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="form-input"
              minLength="6"
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        <div className="auth-divider">
          <span>O</span>
        </div>

        <button
          onClick={handleGoogle}
          className="google-button"
          disabled={loading}
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path
              d="M21.35,11.1H12v3.2h5.59c-0.56,2.68-2.96,4.7-5.59,4.7c-3.35,0-6.07-2.72-6.07-6.07 
                s2.72-6.07,6.07-6.07c1.53,0,2.92,0.57,3.98,1.51l2.24-2.24C16.54,4.58,14.39,3.7,12,3.7
                c-4.97,0-9,4.03-9,9s4.03,9,9,9c5.14,0,8.63-3.67,8.63-8.82c0-0.58-0.07-1.16-0.19-1.73L21.35,11.1z"
              fill="#FFF"
            ></path>
          </svg>
          Continuar con Google
        </button>

        <div className="auth-footer">
          <p>
            ¿Ya tienes una cuenta? <a href="/login">Iniciar Sesión</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
