import {createStore, combineReducers} from 'redux'
import cartReducer from './reducers'

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
