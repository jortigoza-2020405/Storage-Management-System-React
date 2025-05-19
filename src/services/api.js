import axios from 'axios'
import { data } from 'react-router-dom'

// Configuración del cliente axios
const apiClient = axios.create({
	baseURL: import.meta.env.VITE_API_URL, // Usa variable de entorno
	timeout: 3000
})

// Función para obtener el token desde localStorage (si se necesita)
const getToken = () => {
	return localStorage.getItem('token')
}

apiClient.interceptors.request.use((config) => {
	const token = getToken()
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

//  EndPoints de Products

// get all
export const getAllProductsRequest = async() => {
	try {
		return await apiClient.get('/products/products')
	} catch (err) {
		return {
			error: true,
			err
		}
	}
}

// Add 

export const addProductRequest = async (productData) =>{
	try {
		return await apiClient.post('/products/addProduct', productData)
	} catch (err) {
		return{
			error: true,
			err
		}
		
	}
}
// Get by name

export const getProductByNameRequest = async(name) => {
	try {
		return await apiClient.get(`/products/category/${name}`)
	} catch (err) {
		return{
			error: true,
			err
		}
	}
}
// get by name category

export const getProductByCategoryRequest = async(name) =>{
	try {
		return await apiClient.get(`/products/category/${name}`)
	} catch (err) {
		return{
			error: true,
			err
		}
	}
}
// get by date and category

export const getByCategoryAndDateRequest = async(filterData)=>{
	try {
		return await apiClient.get('/products/byCategoryAndDate', {data: filterData})
	} catch (err) {
		return{
			error: true,
			err
		}
	}
}
// Update product 
export const updateProductRequest = async (id, productData)=>{
	try {
		return await apiClient.put(`/products/productUpdate/${id}`, productData)
	} catch (err) {
		return{
			error: true,
			err
		}
	}
}
//Delete product
export const deleteProductRequest = async(id, body) => {
	try {
		return await apiClient.delete(`/products/delete/${id}`, {data: body})
	} catch (err) {
		return{
			error: true,
			err
		}
	}
}
// add product offer
export const addProductOfferRequest = async (id, offerData) => {
	try {
		return await apiClient.put(`/products/addProductOffer/${id}`, offerData)
	} catch (err) {
		return { error: true, err }
	}
}

// Obtener productos sin stock
export const getOutOfStockProductsRequest = async () => {
	try {
		return await apiClient.get('/products/OutOfStockProducts')
	} catch (err) {
		return { error: true, err }
	}
}

// Obtener productos más vendidos
export const getTopSellingProductsRequest = async () => {
	try {
		return await apiClient.get('/products/getTopSellingProducts')
	} catch (err) {
		return { error: true, err }
	}
}

// Obtener control de inventario
export const getInventoryControlRequest = async () => {
	try {
		return await apiClient.get('/products/InventoryControl')
	} catch (err) {
		return { error: true, err }
	}
}

export const getProductsByCategoryRequest = async (name) => {
	try {
		return await apiClient.get(`/products/category/${name}`)
	} catch (err) {
		return { error: true, err }
	}
}


//  POST para registrar usuario
export const registerUserRequest = async (newUser) => {
	try {
		return await apiClient.post('/employer/register', newUser)
	} catch (err) {
		return { error: true, err }
	}
}

export default apiClient
