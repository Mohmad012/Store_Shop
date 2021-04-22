// Page Components
import Meta from '../../../components/Meta'
import {connect} from 'react-redux'

// Page Style
import styles from '../../../styles/Details.module.scss'

// React Hooks
import {useEffect , useState} from 'react'

// Pages
import {addToCart} from '../../../store/actions/actions'


const Details = ({ product , addToCart}) => {

  const [quantity, setQuantity]      = useState(1);
  const [initPrice , setInitPrice]   = useState(product.price);
  const [FinalPrice , setFinalPrice] = useState(0);
  const [Disocunt , setDisocunt]     = useState(0);
  const [prodInfo , setProdInfo]     = useState({});

  useEffect(() => {

    if (product.title) {
      if (product.title.length >= 50) {
          document.querySelector('h1 span').innerHTML = product.title.slice(0 , 50) + '...'
          document.querySelector('h1 span').classList.add("BoxTitle")
      }
      if (product.description.length >= 120) {
          document.querySelector('p span').innerHTML = product.description.slice(0 , 90) + '...'
          document.querySelector('p span').classList.add("BoxDesc")

        
      }
    }
    else{
      console.log('product title Or Description Not Found')
    }
  },[])

  const handelQuantity = (e) => {
      const VAL = e.target.value;

      if (VAL < 0)
          return ;
    
      if (VAL > 100)
          return ;

      if (VAL > 100)
          return ;


      setQuantity(e.target.value)
  }

  /* update values on change */
  useEffect(() => {

    if (quantity == 0){
      setFinalPrice(0)
      setDisocunt(0)
    }

    if (quantity == 1){
        setFinalPrice(quantity * initPrice)
    }

    if (quantity == 2) {
        let ResultB = initPrice * 0.2;
        setFinalPrice((Math.abs(initPrice - ResultB) * quantity).toFixed(2))
        setDisocunt(20)
    }
    if (quantity >= 3) {
        let ResultB = initPrice * 0.3;
        setFinalPrice((Math.abs(initPrice - ResultB) * quantity).toFixed(2))
        setDisocunt(30)
    }

  })

  useEffect(() => {
    setProdInfo({quantity:quantity,FinalPrice:FinalPrice,LastTitle:product.title , LastImage:product.image})
  },[FinalPrice])

  const addtocart = (prodInfo) => {
    addToCart(prodInfo, quantity)
  }

  return (
    <>
      <Meta title={product.title} description={product.description} />
      <div className={styles.BoxCont}>
        <div className={styles.contdark}>
          <div className={styles.contcard}>
            <div className={styles.card}>
              <div className={styles.box}>
                <div className={styles.content}>
                  <img className={styles.img} src={product.image} alt={product.title}/>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.contcard}>
            <div className={styles.card}>
              <div className={styles.box}>
                <div className={styles.content}>
                  <h1 className={styles.h1}>Title : <span className={styles.BoxTitle}>{product.title}</span></h1>
                  <p className={styles.p}>Description : <span className={styles.BoxDesc}>{product.description}</span></p>
                  <span className={styles.price}>Price  : <span className={styles.priceNum}>{FinalPrice} $</span> </span>
                  <div className={styles.QuantBox}>
                    <label className={styles.label}>Quantity : </label>
                    <input className={styles.input} value={quantity} onChange={handelQuantity} type="number" name="" placeholder="Enter Quantity" />
                  </div>
                  <span className={styles.discount}>Discount : {Disocunt}%</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        <div className={styles.wrap}>
          <button className={styles.button} onClick={() => addtocart(prodInfo)}>Add To Card</button>
        </div> 
      </div>
    </>
  )
}

export const getStaticProps = async (context) => {
  const res = await fetch(
    `https://fakestoreapi.com/products/${context.params.id}`
  )

  const product = await res.json()

  return {
    props: {
      product,
    },
  }
}

export const getStaticPaths = async () => {
  const res = await fetch(`https://fakestoreapi.com/products`)

  const products = await res.json()

  const ids = products.map((product) => product.id)
  const paths = ids.map((id) => ({ params: { id: id.toString() } }))

  return {
    paths,
    fallback: false,
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    addToCart:(productsInfo , quantity) => dispatch(addToCart(productsInfo , quantity))
  }
}

export default connect(null,mapDispatchToProps)(Details)
