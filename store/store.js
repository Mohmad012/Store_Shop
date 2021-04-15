import {createStore, combineReducers} from 'redux'
import cartReducer from './reducers'

		 	// {
		 	// 	product:{
				// 	FinalPrice: 0,
				// 	LastImage: '',
				// 	LastTitle: '',
				// 	quantity: 0,
		 	// 	},
		 	// 	quantity:0
		 	// }

function loadState(){
	try{
		const state = localStorage.getItem('cart')

		if (state) {
			return JSON.parse(state);
		}

	} catch(e){
		// Ignore Errors
	}

	// return {
	// 	 cart:[]
	// }

}

function saveState(state){
	console.log('saveState...')
	localStorage.setItem('cart' , JSON.stringify(state))
}

const appReducer = combineReducers({
	cart:cartReducer
})

const store = createStore(appReducer , loadState())

store.subscribe(() => {
	saveState(store.getState())
})

export default store;