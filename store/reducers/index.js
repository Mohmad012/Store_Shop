import {ADD_TO_CART,REMOVE_FROM_CART,CLEAR_CART} from '../actions/types'

const cartReducer = (state , action) => {

	switch(action.type){
		case ADD_TO_CART:{
			return[
				...state,
				{	
					product:action.productsInfo,
					quantity:action.quantity
				}
			]

		}

		case REMOVE_FROM_CART:{
			const item_index = action.index;
			const new_State = [...state];
			new_State.splice(item_index , 1)
			return new_State

		}

		case CLEAR_CART:{
			let new_State = {...state};
			new_State = []
			return new_State
		}


		default:{
			if (state === undefined)
				return [];
			return state
		}
	}

}

export default cartReducer;