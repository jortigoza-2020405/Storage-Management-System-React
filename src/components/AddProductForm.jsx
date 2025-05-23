import { useForm } from 'react-hook-form'
import { useInventoryApi } from '../shared/hooks/useInventoryApi'
import '../styles/ProductForm.css'

const AddProductForm = () => {
	const { addProduct } = useInventoryApi()

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm()

	const onSubmit = async (data) => {
		await addProduct(data)
		reset()
	}

	return (
		<div className="product-form-container">
			<h2>Agregar Producto</h2>

			<form onSubmit={handleSubmit(onSubmit)} className="product-form">
				<div className="form-group">
					<label>Nombre del producto</label>
					<input type="text" {...register("productName", { required: true })} />
					{errors.productName && <p className="error">Este campo es requerido</p>}
				</div>

				<div className="form-group">
					<label>Descripción</label>
					<textarea {...register("description", { required: true })} />
					{errors.description && <p className="error">Este campo es requerido</p>}
				</div>

				<div className="form-group">
					<label>Precio</label>
					<input type="number" step="0.01" {...register("price", { required: true })} />
					{errors.price && <p className="error">Este campo es requerido</p>}
				</div>

				<div className="form-group">
					<label>Stock</label>
					<input type="number" {...register("stock", { required: true })} />
					{errors.stock && <p className="error">Este campo es requerido</p>}
				</div>

				<div className="form-group">
					<label>Categoría (ID)</label>
					<input type="text" {...register("category", { required: true })} />
					{errors.category && <p className="error">Este campo es requerido</p>}
				</div>

				<div className="form-group">
					<label>Marca</label>
					<input type="text" {...register("brand", { required: true })} />
					{errors.brand && <p className="error">Este campo es requerido</p>}
				</div>

				<div className="form-group">
					<label>Fecha de ingreso</label>
					<input type="date" {...register("dateEntry", { required: true })} />
					{errors.dateEntry && <p className="error">Este campo es requerido</p>}
				</div>

				<button type="submit">Agregar</button>
			</form>
		</div>
	)
}

export default AddProductForm
