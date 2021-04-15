import Layout from '../components/Layout'
import '../styles/fonts/font-awesome.min.css'
import '../styles/globals.scss'
import {Provider} from 'react-redux';
import store from '../store/store'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
  	<Provider store={store}>
	    <Layout>
	      <Component {...pageProps} />
	    </Layout>
    </Provider>
  )
}

export default MyApp
