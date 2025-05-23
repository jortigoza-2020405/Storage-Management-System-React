import { useState, useEffect } from 'react'
import { useInventoryApi } from '../shared/hooks/useInventoryApi'
import AddProductForm from '../components/AddProductForm'
import UpdateProductForm from '../components/UpdateProductForm'
import '../styles/Inventory.css'
import toast from 'react-hot-toast'

const Inventory = () => {
	const {
		products,
		topSelling,
		outOfStock,
		inventoryControl,
		filteredProducts,
		getProducts,
		addProduct,
		updateProduct,
		deleteProduct,
		applyOffer,
		getTopSellingProducts,
		getOutOfStockProducts,
		getInventoryControl,
		getByCategory,
		getByCategoryAndDate,
		getProductByName
	} = useInventoryApi()

	const [activeView, setActiveView] = useState('all')
	const [selectedProduct, setSelectedProduct] = useState(null)
	const [showUpdateForm, setShowUpdateForm] = useState(false)
	const [categoryInput, setCategoryInput] = useState('')
	const [dateInput, setDateInput] = useState('')
	const [nameInput, setNameInput] = useState('')
	const [categoryOption, setCategoryOption] = useState(null)

	useEffect(() => {
		if (activeView === 'all') getProducts()
		if (activeView === 'topSelling') getTopSellingProducts()
		if (activeView === 'outOfStock') getOutOfStockProducts()
		if (activeView === 'inventoryControl') getInventoryControl()
	}, [activeView])

	const handleUpdate = (product) => {
		setSelectedProduct(product)
		setShowUpdateForm(true)
	}

	const handleDelete = (id) => {
		if (confirm('¿Deseas eliminar este producto?')) {
			deleteProduct(id, { confirm: true })
		}
	}

	const handleOffer = (id) => {
		const descuento = prompt('Porcentaje de descuento:')
		if (descuento) {
			applyOffer(id, { discount: descuento })
		}
	}

	const handleSearchByName = async () => {
		if (!nameInput) return toast.error('Ingresa un nombre')
		const result = await getProductByName(nameInput)
		if (result) {
			setActiveView('filtered')
		}
	}

	const handleSearchCategory = () => {
		if (!categoryInput) return toast.error('Ingresa una categoría')
		switch (categoryOption) {
			case 'categoryAndDate':
				if (!dateInput) return toast.error('Selecciona una fecha')
				getByCategoryAndDate({ category: categoryInput, date: dateInput })
				break
			case 'category':
				getByCategory(categoryInput)
				break
			case 'getProductsByCategory':
				getProductsByCategory(categoryInput)
				break
			default:
				toast.error('Selecciona una opción de búsqueda por categoría')
		}
		setActiveView('filtered')
	}

	const renderProducts = (list) => (
		<div className="inventory-grid">
			{list?.map(p => (
				<div key={p._id} className="product-card">
					<h3>{p.productName}</h3>
					<p><strong>Categoría:</strong> {p.category}</p>
					<p><strong>Stock:</strong> {p.stock}</p>
					<p><strong>Marca:</strong> {p.brand}</p>
					<p><strong>Precio:</strong> Q{p.price}</p>
					<p><strong>Ventas:</strong> {p.salesCount || 0}</p>
					<div className="product-actions">
						<button onClick={() => handleUpdate(p)}>Actualizar</button>
						<button onClick={() => handleDelete(p._id)}>Eliminar</button>
						<button onClick={() => handleOffer(p._id)}>Oferta</button>
					</div>
				</div>
			))}
		</div>
	)

	const renderView = () => {
		if (showUpdateForm && selectedProduct) {
			return (
				<UpdateProductForm
					product={selectedProduct}
					onClose={() => {
						setShowUpdateForm(false)
						setSelectedProduct(null)
						setActiveView('all') // ✅ vuelve a la vista principal
					}}
				/>
			)
		}

		switch (activeView) {
			case 'add':
				return <AddProductForm />
			case 'topSelling':
				return renderProducts(topSelling)
			case 'outOfStock':
				return renderProducts(outOfStock)
			case 'inventoryControl':
				return renderProducts(inventoryControl)
			case 'filtered':
				return renderProducts(filteredProducts)
			default:
				return renderProducts(products)
		}
	}

	return (
		<div className="inventory-container">
			<h1>Inventario de Productos</h1>

			<div className="inventory-nav">
				<button onClick={() => setActiveView('all')}>Ver Todos</button>
				<button onClick={() => setActiveView('add')}>Agregar Producto</button>
				<button onClick={() => setActiveView('topSelling')}>Más Vendidos</button>
				<button onClick={() => setActiveView('outOfStock')}>Sin Stock</button>
				<button onClick={() => setActiveView('inventoryControl')}>Inventario</button>
			</div>

			<div className="filters">
				<div className="filter-group">
					<h3>Buscar por Nombre</h3>
					<input
						type="text"
						placeholder="Nombre"
						value={nameInput}
						onChange={(e) => setNameInput(e.target.value)}
					/>
					<button onClick={handleSearchByName}>Buscar</button>
				</div>

				<div className="filter-group">
					<h3>Buscar por Categoría</h3>
					<input
						type="text"
						placeholder="Categoría"
						value={categoryInput}
						onChange={(e) => setCategoryInput(e.target.value)}
					/>
					<select value={categoryOption} onChange={(e) => setCategoryOption(e.target.value)}>
						<option value="">Selecciona una opción</option>
						<option value="category">getProductByCategoryRequest</option>
						<option value="getProductsByCategory">getProductsByCategoryRequest</option>
						<option value="categoryAndDate">getByCategoryAndDateRequest</option>
					</select>
					{categoryOption === 'categoryAndDate' && (
						<input
							type="date"
							value={dateInput}
							onChange={(e) => setDateInput(e.target.value)}
						/>
					)}
					<button onClick={handleSearchCategory}>Buscar</button>
				</div>
			</div>

			<div className="inventory-section">
				{renderView()}
			</div>
		</div>
	)
}

export default Inventory
