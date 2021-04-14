import {ADD_TO_CART , REMOVE_FROM_CART , CLEAR_CART} from './types'

export const addToCart = (productsInfo , quantity) => {
	return{
		type:ADD_TO_CART,
		productsInfo,
		quantity
	}
}

export const removeFromCart = (index) => {
	return{
		type:REMOVE_FROM_CART,
		index
	}
}

export const clearCart = () => {
	return{
		type:CLEAR_CART
	}
}