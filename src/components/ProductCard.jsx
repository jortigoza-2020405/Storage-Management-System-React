import { useInventoryApi } from '../shared/hooks/useInventoryApi'

const ProductCard = ({ product }) => {
	const { updateProduct } = useInventoryApi()

	const handleFakeSale = () => {
		const nuevaVenta = (product.salesCount || 0) + 1
		updateProduct(product._id, { salesCount: nuevaVenta })
	}

	return (
		<div className="product-card">
			<h3>{product.productName}</h3>
			<p><strong>Categoría:</strong> {product.category}</p>
			<p><strong>Stock:</strong> {product.stock}</p>
			<p><strong>Marca:</strong> {product.brand}</p>
			<p><strong>Precio:</strong> Q{product.price}</p>
			<p><strong>Ventas:</strong> {product.salesCount || 0}</p>

			<button onClick={handleFakeSale} className="ventas-button">
				+1 venta (simular)
			</button>
		</div>
	)
}

export default ProductCard
