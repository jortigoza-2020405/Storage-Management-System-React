import { useNavigate } from 'react-router-dom'
import HomeCard from '../components/HomeCard'
import '../styles/Home.css'

const Home = () => {
	const nav = useNavigate()

	const sections = [
		{ title: 'Inventario de Productos', path: '/inventory' },
		{ title: 'Entradas y Salidas', path: '/movements' },
		{ title: 'Gestión de Proveedores', path: '/providers' },
		{ title: 'Gestión de Clientes', path: '/clients' },
		{ title: 'Informes y Estadísticas', path: '/reports' },
		{ title: 'Alertas y Notificaciones', path: '/alerts' },
		{ title: 'Gestión de Usuarios', path: '/users' }
	]

	return (
		<div className="home-container">
			<h1>Sistema de Almacenadora</h1>
			<p>Selecciona una opción para continuar</p>

			<div className="home-grid">
				{sections.map((item, index) => (
					<HomeCard key={index} title={item.title} onClick={() => nav(item.path)} />
				))}
			</div>
		</div>
	)
}

export default Home
