import { useState } from 'react'
import {
	getAllProductsRequest,
	addProductRequest,
	getProductByNameRequest,
	getProductsByCategoryRequest,
	getByCategoryAndDateRequest,
	updateProductRequest,
	deleteProductRequest,
	addProductOfferRequest,
	getOutOfStockProductsRequest,
	getTopSellingProductsRequest,
	getInventoryControlRequest
} from '../../services/api'
import toast from 'react-hot-toast'

export const useInventoryApi = () => {
	const [products, setProducts] = useState(null)
	const [topSelling, setTopSelling] = useState(null)
	const [outOfStock, setOutOfStock] = useState(null)
	const [inventoryControl, setInventoryControl] = useState(null)
	const [filteredProducts, setFilteredProducts] = useState(null)

	// Obtener todos los productos
	const getProducts = async () => {
		const response = await getAllProductsRequest()
		if (response.error) {
			toast.error(response?.err?.response?.data?.message || 'Error al obtener productos')
			return
		}
		setProducts(response.data.products || response.data)
	}

	// Agregar producto
	const addProduct = async (product) => {
		const response = await addProductRequest(product)
		if (response.error) {
			return toast.error(response?.err?.response?.data?.message || 'Error al guardar el producto')
		}
		toast.success('Producto agregado')
		getProducts()
	}

	// Buscar producto por nombre
	const getProductByName = async (name) => {
		const response = await getProductByNameRequest(name)
		if (response.error) {
			return toast.error(response?.err?.response?.data?.message || 'Producto no encontrado')
		}
		return response.data
	}

	// Buscar por nombre de categoría
	const getByCategory = async (categoryName) => {
		const response = await getProductsByCategoryRequest(categoryName)
		if (response.error) {
			return toast.error(response?.err?.response?.data?.message || 'Error al buscar categoría')
		}
		setFilteredProducts(response.data.products || response.data)
	}

	// Buscar por categoría y fecha
	const getByCategoryAndDate = async (filters) => {
		const response = await getByCategoryAndDateRequest(filters)
		if (response.error) {
			return toast.error(response?.err?.response?.data?.message || 'No se encontraron productos')
		}
		setFilteredProducts(response.data.products || response.data)
	}

	// Actualizar producto
	const updateProduct = async (id, data) => {
		const response = await updateProductRequest(id, data)
		if (response.error) {
			return toast.error(response?.err?.response?.data?.message || 'Error al actualizar producto')
		}
		toast.success('Producto actualizado')
		getProducts()
	}

	// Eliminar producto
	const deleteProduct = async (id, body) => {
		const response = await deleteProductRequest(id, body)
		if (response.error) {
			return toast.error(response?.err?.response?.data?.message || 'Error al eliminar producto')
		}
		toast.success('Producto eliminado')
		getProducts()
	}

	// Aplicar oferta
	const applyOffer = async (id, offer) => {
		const response = await addProductOfferRequest(id, offer)
		if (response.error) {
			return toast.error(response?.err?.response?.data?.message || 'Error al aplicar oferta')
		}
		toast.success('Oferta aplicada')
		getProducts()
	}

	// Productos sin stock
	const getOutOfStockProducts = async () => {
		const response = await getOutOfStockProductsRequest()
		if (response.error) {
			return toast.error(response?.err?.response?.data?.message || 'Error al obtener productos sin stock')
		}
		setOutOfStock(response.data.products || response.data)
	}

	// Productos más vendidos
	const getTopSellingProducts = async () => {
		const response = await getTopSellingProductsRequest()
		if (response.error) {
			return toast.error(response?.err?.response?.data?.message || 'Error al obtener productos más vendidos')
		}
		setTopSelling(response.data.products || response.data)
	}

	// Control de inventario
	const getInventoryControl = async () => {
		const response = await getInventoryControlRequest()
		if (response.error) {
			return toast.error(response?.err?.response?.data?.message || 'Error al obtener inventario')
		}
		setInventoryControl(response.data.products || response.data)
	}

	return {
		products,
		topSelling,
		outOfStock,
		inventoryControl,
		filteredProducts,

		// Funciones
		getProducts,
		addProduct,
		getProductByName,
		getByCategory,
		getByCategoryAndDate,
		updateProduct,
		deleteProduct,
		applyOffer,
		getOutOfStockProducts,
		getTopSellingProducts,
		getInventoryControl
	}
}
