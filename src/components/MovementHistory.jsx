import { useEffect, useState } from 'react'
import { getProductMovementHistoryRequest } from '../services/api'
import toast from 'react-hot-toast'

const MovementHistory = ({ productId }) => {
	const [movements, setMovements] = useState([])
	const [loading, setLoading] = useState(false)

	const fetchHistory = async () => {
		setLoading(true)
		const res = await getProductMovementHistoryRequest(productId)

		if (res.error) {
			toast.error(res.err?.response?.data?.message || 'Error al obtener historial')
			setMovements([])
			setLoading(false)
			return
		}

		setMovements(res.data.movements || res.data)
		setLoading(false)
	}

	useEffect(() => {
		if (productId) fetchHistory()
	}, [productId])

	return (
		<div className="movement-history">
			<h3>Historial de Movimientos</h3>
			<button onClick={fetchHistory}>🔄 Recargar</button>

			{loading ? (
				<p>Cargando...</p>
			) : movements.length === 0 ? (
				<p>No hay movimientos registrados.</p>
			) : (
				<ul>
					{movements.map((m) => (
						<li key={m._id}>
							<strong>{m.type.toUpperCase()}</strong> — Cantidad: {m.quantity} — {m.description} <br />
							<small>{new Date(m.date).toLocaleString()}</small>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default MovementHistory
