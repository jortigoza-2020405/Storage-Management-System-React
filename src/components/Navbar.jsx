import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import '../styles/Navbar.css'

const Navbar = () => {
	const navigate = useNavigate()

	const handleLogout = () => {
		localStorage.removeItem('token')
		toast.success('Sesión cerrada correctamente')
		navigate('/login')
	}

	return (
		<nav className="navbar">
			<div className="navbar-left">
				<Link to="/home" className="navbar-link">Home</Link>
			</div>

			<div className="navbar-right">
				<button onClick={handleLogout} className="logout-button">
					Cerrar Sesión
				</button>
			</div>
		</nav>
	)
}

export default Navbar
