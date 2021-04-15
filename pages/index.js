// Page Components
import ProductsList from '../components/ProductsList'

export default function Home({products}) {
  return (
  	<>
      <Meta title={"Home"} />
		  <ProductsList products={products} />
  	</>
  )
}

// Get Products And Add it in Props In This page
export const getStaticProps = async () => {
  const res = await fetch("https://fakestoreapi.com/products?limit=5")
  const products = await res.json()

  return {
    props: {
      products,
    },
  }
}