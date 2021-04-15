import Nav from './Nav'
import Meta from './Meta'
import Head from 'next/head'


const Layout = ({ children }) => {
  return (
    <>
      	<Meta />
		<head>
			<script src="https://www.paypal.com/sdk/js?client-id=AeXzTlKMFOL9DEESWatu4wGcRWcHwX-wc-rKiw2KaQ8ghKkfdweD6x_jEY9hC-JN5JEMQ2Pl18tGeTUD&currency=CAD"></script>
		</head>
      	<Nav />
		{children}
    </>
  )
}

export default Layout
