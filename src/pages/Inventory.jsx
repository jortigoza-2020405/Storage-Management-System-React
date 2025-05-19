import { useState, useEffect } from 'react'
import { useInventoryApi } from '../shared/hooks/useInventoryApi'
import ProductCard from '../components/ProductCard'
import AddProductForm from '../components/AddProductForm'
import '../styles/Inventory.css'

const Inventory = () => {
	const {
		products,
		topSelling,
		outOfStock,
		inventoryControl,
		getProducts,
		getTopSellingProducts,
		getOutOfStockProducts,
		getInventoryControl
	} = useInventoryApi()

	const [activeView, setActiveView] = useState('all')

	useEffect(() => {
		if (activeView === 'all') getProducts()
		if (activeView === 'topSelling') getTopSellingProducts()
		if (activeView === 'outOfStock') getOutOfStockProducts()
		if (activeView === 'inventoryControl') getInventoryControl()
	}, [activeView])

	const renderView = () => {
		switch (activeView) {
			case 'add':
				return <AddProductForm />
			case 'topSelling':
				return (
					<div className="inventory-grid">
						{topSelling?.map(p => <ProductCard key={p._id} product={p} />)}
					</div>
				)
			case 'outOfStock':
				return (
					<div className="inventory-grid">
						{outOfStock?.map(p => <ProductCard key={p._id} product={p} />)}
					</div>
				)
			case 'inventoryControl':
				return (
					<div className="inventory-grid">
						{inventoryControl?.map(p => <ProductCard key={p._id} product={p} />)}
					</div>
				)
			default:
				return (
					<div className="inventory-grid">
						{products?.length > 0 ? (
							products.map(p => <ProductCard key={p._id} product={p} />)
						) : (
							<p>No hay productos registrados.</p>
						)}
					</div>
				)
		}
	}

	return (
		<div className="inventory-container">
			<h1>Inventario de Productos</h1>

			<div className="inventory-nav">
				<button onClick={() => setActiveView('all')}> Ver Todos</button>
				<button onClick={() => setActiveView('add')}> Agregar</button>
				<button onClick={() => setActiveView('topSelling')}> Más Vendidos</button>
				<button onClick={() => setActiveView('outOfStock')}> Sin Stock</button>
				<button onClick={() => setActiveView('inventoryControl')}> Inventario</button>
			</div>
            

			<div className="inventory-section">
				{renderView()}
			</div>
		</div>
	)
}

export default Inventory
