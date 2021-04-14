// Page Components
import ProductsList from '../components/ProductsList'
import Loading from '../components/Loading'
import Head from 'next/head'
export default function Home({products}) {
  return (
  	<>
      <head>
        <script defer src="https://www.paypal.com/sdk/js?client-id=CAD"></script>
      </head>
		  {products ? (<ProductsList products={products} />) : (<Loading />)}
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