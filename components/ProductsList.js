import ProductItem from './ProductItem'
import ProductsStyles from '../styles/Products.module.scss'
import Loading from './Loading'

const ProductsList = ({ products }) => {
  return (
    <div className={ProductsStyles.contdark}>
      {products ? products.map((product) => (
        <ProductItem product={product} />
      )) : (<Loading />)}
    </div>
  )
}

export default ProductsList
