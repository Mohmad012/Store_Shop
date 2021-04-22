// Page Components
import ProductsList from '../components/ProductsList'

const Home = ({products}) => {

  return (
    <>
  	  <ProductsList products={products} />
    </>
  )
}

export default Home

// Get Products And Add it in Props In This page
export const getStaticProps = async () => {
  const res = await fetch("https://fakestoreapi.com/products?limit=20")
  const products = await res.json()

  return {
    props: {
      products,
    },
  }
}