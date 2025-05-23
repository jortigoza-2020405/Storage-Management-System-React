import { useState, useEffect } from 'react'
import { registerProductMovementRequest, getAllProductsRequest } from '../services/api'
import toast from 'react-hot-toast'

const MovementForm = ({ onRegister }) => {
	const [products, setProducts] = useState([])
	const [form, setForm] = useState({
		product: '',
		type: 'entry',
		quantity: 1,
		description: ''
	})

	useEffect(() => {
		const fetchProducts = async () => {
			const res = await getAllProductsRequest()
			if (!res.error) setProducts(res.data.products || res.data)
		}
		fetchProducts()
	}, [])

	const handleChange = (e) => {
		const { name, value } = e.target
		setForm({ ...form, [name]: value })
	}

	const handleSubmit = async (e) => {
	e.preventDefault()

	if (!form.product) return toast.error('Selecciona un producto')
	if (!form.type || !['entry', 'exit'].includes(form.type)) return toast.error('Selecciona tipo válido')
	if (!form.quantity || parseInt(form.quantity) < 1) return toast.error('Cantidad inválida')
	if (!form.description.trim()) return toast.error('Descripción requerida')

	const movementData = {
		...form,
		quantity: parseInt(form.quantity) // ✅ Conversión aquí
	}

	console.log('📦 Enviando movimiento:', movementData)

	const res = await registerProductMovementRequest(movementData)

	if (res.error) {
		toast.error(res.err?.response?.data?.message || 'Error al registrar movimiento')
		return
	}

	toast.success('Movimiento registrado')
	setForm({ product: '', type: 'entry', quantity: 1, description: '' })
	onRegister?.()
}


	return (
		<form onSubmit={handleSubmit} className="movement-form">
			<h3>Registrar Movimiento</h3>
			<select name="product" value={form.product} onChange={handleChange}>
				<option value="">Selecciona un producto</option>
				{products.map(p => (
					<option key={p._id} value={p._id}>
						{p.productName}
					</option>
				))}
			</select>

			<select name="type" value={form.type} onChange={handleChange}>
				<option value="entry">Entrada</option>
				<option value="exit">Salida</option>
			</select>

			<input
				type="number"
				name="quantity"
				placeholder="Cantidad"
				min="1"
				value={form.quantity}
				onChange={handleChange}
			/>

			<textarea
				name="description"
				placeholder="Descripción"
				value={form.description}
				onChange={handleChange}
			/>

			<button type="submit">Registrar</button>
		</form>
	)
}

export default MovementForm
