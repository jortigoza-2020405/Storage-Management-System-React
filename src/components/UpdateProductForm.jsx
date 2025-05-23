import { useState } from 'react'
import { useInventoryApi } from '../shared/hooks/useInventoryApi'
import '../styles/Inventory.css'

const UpdateProductForm = ({ product, onClose }) => {
	const { updateProduct } = useInventoryApi()

	const [formData, setFormData] = useState({
		productName: product.productName || '',
		description: product.description || '',
		price: product.price || 0,
		stock: product.stock || 0,
		brand: product.brand || '',
		category: product.category || ''
	})

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		await updateProduct(product._id, formData) //  LLAMAMOS updateProduct
		onClose() //  CERRAMOS el formulario
	}

	return (
		<div className="update-form">
			<h2>Actualizar Producto</h2>
			<form onSubmit={handleSubmit} className="product-form">
				<input type="text" name="productName" value={formData.productName} onChange={handleChange} placeholder="Nombre del producto" />
				<textarea name="description" value={formData.description} onChange={handleChange} placeholder="Descripción" />
				<input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Precio" />
				<input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock" />
				<input type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="Marca" />
				<input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Categoría" />
				<div className="form-actions">
					<button type="submit">Guardar cambios</button>
					<button type="button" onClick={onClose}>Cancelar</button>
				</div>
			</form>
		</div>
	)
}

export default UpdateProductForm
