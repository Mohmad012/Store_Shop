import ProductItem from './ProductItem'
import ProductsStyles from '../styles/Products.module.scss'

const ProductsList = ({ products }) => {
  return (
    <div className={ProductsStyles.contdark}>
      {products.map((product) => (
        <ProductItem product={product} />
      ))}
    </div>
  )
}

export default ProductsList
