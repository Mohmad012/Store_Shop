import React , {useState , useEffect} from 'react'
import {connect} from 'react-redux'

// Page Style
import styles from '../../styles/Cards.module.scss'

// Page Components
import Meta from '../../components/Meta'
import dynamic from 'next/dynamic';

// Pages
import {removeFromCart , clearCart} from '../../store/actions/actions'

const PayPal = dynamic(
  () => {
    return import('../../components/PayPal');
  },
  { ssr: false }
);

function Cards({total , cartItem , removeFromCart , clearCart}) {

	console.log('total' ,total)

	console.log('cartItem' ,cartItem)

	const [AddClass , setAddClass] = useState(false);

	const [checkout, setCheckOut] = useState(false);
	const price = total;

	const [GetItem, setGetItem] = useState(false);
	const [GetCart, setGetCart] = useState([]);

	useEffect(() => {
		if (localStorage.getItem('cart')) {
			setGetItem(true)
			console.log(JSON.parse(localStorage.getItem('cart')))
			setGetCart(JSON.parse(localStorage.getItem('cart')))
		}
	},[])

	useEffect(() => {

		// if (cartItem) {
		//   if (product.title.length >= 50) {
		//       document.querySelector('h1 span').innerHTML = product.title.slice(0 , 50) + '...'
		//       document.querySelector('h1 span').classList.add("BoxTitle")
		//   }
		//   if (product.description.length >= 120) {
		//       document.querySelector('p').innerHTML = 'Description :' + product.description.slice(0 , 90) + '...'
		//   }
		// }
		// else{
		//   console.log('product title Or Description Not Found')
		// }
	},[])


	const addClass = () => {
		setAddClass(true)
	}

	const removeClass = () => {
		setAddClass(false)
		setCheckOut(false)
	}

	const AddCards = cartItem.map((item , index) => {
		if (item.product.FinalPrice != 0) {
			
			return (
				<div className={styles.contcard} key={index}>
					<div className={styles.card}>
						<div className={styles.box}>
							<div className={styles.content}>
								<img className={styles.img + AddClass ? 'active' : ' '} src={item.product.LastImage} alt={item.product.LastTitle}/>
								<span className={styles.price}>Price  : <span className={styles.priceNum}>{item.product.FinalPrice} $</span> </span>
								<span className={styles.quantity}>Quantity: {item.product.quantity}</span>
								<a onClick={() => removeFromCart(index)} className={styles.a}>
									Delete
								</a>
							</div>
						</div>
					</div>
				</div>
			)
		}

	})

	// 

	const showLastInfo = cartItem.map((item , index) => {
		if (item.product.FinalPrice != 0) {			
			
			return (
				<>
					<div className={styles.boxTotal} key={index}>
						<div className={styles.boxResImg}>
							<img className={styles.img + AddClass ? 'active' : ' '} src={item.product.LastImage} alt={item.product.LastTitle}/>
						</div>
						<h1 className={styles.h1}>Title : <span className={styles.BoxTitle}>{item.product.LastTitle.length > 40 ? item.product.LastTitle.slice(0 , 40) + '...' : item.product.LastTitle}</span></h1>
						<span className={styles.span}>Quantity: {item.product.quantity}</span>
						<span className={styles.span}>Price: {item.product.FinalPrice}$</span>
					</div>
					<hr />
				</>
			)
		}

	})

	const clearItems = () => {
		// Send the request to the server
		// clear cart
		clearCart()
	}

	const modalStyle = {
		pointerEvents: AddClass ? 'auto' : 'none',
		opacity: AddClass ? 1 : 0,
		transition: AddClass ? 'all 300ms ease-in-out' : ' ',
	}

	const modalStyleIco = {
		opacity: AddClass ?  '1': '0',
		pointerEvents: AddClass ?  'auto': 'none',
		transition: AddClass ? 'opacity 300ms 300ms ease, transform 300ms 300ms ease, background-color 250ms linear, color 250ms linear' : ' ',
		transform:  AddClass ? 'translateY(0)' : ' ',
		cursor: AddClass ? 'pointer' : 'normal',
	}

	const modalWrapStyle = {
		opacity: AddClass ? 1 : 0,
		transform: AddClass ? 'scale(1)' : ' ',
		transition: AddClass ?  'opacity 250ms 500ms ease, transform 350ms 500ms ease' : ' ',
	}

	const checkoutPayStyle = {
		opacity: checkout ?  '1': '0',display: checkout ?  'flex': 'none'
	}

	return (
		<>
			<Meta title={"Cards"} />
			<div className={styles.BoxCont}>
				<div className={styles.contdark}>

					{AddCards}

				</div>

				<div className={styles.wrap} style={{ display: GetItem && total ? 'flex' : 'none'}}>
				  <button className={styles.button} onClick={addClass}>Pay Now</button>
				  <button className={styles.Clear} onClick={clearItems}>Clear</button>
				</div>

			  	<div className={styles.modal} style={modalStyle}>
			  		<i className={"fa fa-times"} aria-hidden={true} style={modalStyleIco}
			  			onClick={removeClass}
			  		>
			  		</i>
			      	<div className={styles.modalWrap} style={modalWrapStyle}>

                    	<div>{showLastInfo}</div>
                    	<span className={styles.TotalAll}>Total: {total.toFixed(2)}$</span>

						<div className={styles.wrapSure}>
				          <button className={styles.buttonSure} onClick={() => {setCheckOut(true)}}>
				            Click To Sure
				          </button>
						</div>
			      	</div>          		
			  	</div>
			  	<div className={styles.checkoutPay} style={checkoutPayStyle}>
			  		<div className={styles.BoxPayPal}>{checkout ? (<PayPal price={total.toFixed(2)} />) : null}</div>
			  	</div>
			</div>
		</>
	)
}

const mapStatToProps = (state) => {
  return{
  	cartItem:state.cart,
    total:state.cart.reduce((total,item) => (total + parseFloat(item.product.FinalPrice)) , 0)
  }	
}

const mapDispatchToProps = (dispatch) => {
  return{
    removeFromCart:(index) => dispatch(removeFromCart(index)),
    clearCart:() => dispatch(clearCart())
  }
}

export default connect(mapStatToProps, mapDispatchToProps)(Cards)
