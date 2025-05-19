const ProductCard = ({ product }) => {
	return (
		<div className="product-card">
			<h3>{product.productName}</h3>
			<p>Categoría: {product.category}</p>
			<p>Stock: {product.stock}</p>
			<p>Marca: {product.brand}</p>
			<p>Precio: Q{product.price}</p>
		</div>
	)
}

export default ProductCard
