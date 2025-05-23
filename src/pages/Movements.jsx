import { useState } from 'react'
import MovementForm from '../components/MovementForm'
import MovementHistory from '../components/MovementHistory'
import '../styles/Movements.css'

const Movements = () => {
	const [selectedProductId, setSelectedProductId] = useState('')

	const handleProductChange = (e) => {
		setSelectedProductId(e.target.value)
	}

	return (
		<div className="movements-container">
			<h1>Entradas y Salidas de Productos</h1>

			<MovementForm onRegister={() => {
				if (selectedProductId) {
					document.getElementById('history-refresh')?.click()
				}
			}} />

			<div className="history-section">
				<h3>Ver historial por producto</h3>
				<input
					type="text"
					placeholder="ID del producto"
					value={selectedProductId}
					onChange={handleProductChange}
				/>
				{selectedProductId && (
					<MovementHistory productId={selectedProductId} />
				)}
			</div>
		</div>
	)
}

export default Movements
