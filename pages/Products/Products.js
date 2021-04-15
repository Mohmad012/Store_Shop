// Page Components
import Link from 'next/link'
import Meta from '../../components/Meta'

// Page Style
import style from '../../styles/ProductsPage.module.scss'

function Products({products}) {

	const AddProducts = products ?  (products.map((product) => (
			<div className={style.contcard} key={product.id}>
				<div className={style.card}>
					<div className={style.box}>
						<div className={style.content}>
							<img className={style.img} src={product.image} alt=""/>
							<h2 className={style.h2}>{product.price}$</h2>
							<Link href={`/Details/${product.id}`} className={style.a}>
								Details
							</Link>
						</div>
					</div>
				</div>
			</div>
		))) : (<p>Loading...</p>)

	return (
		<>
			<Meta title={"Products"} />
			<div className={style.contdark}>
				{AddProducts}
			</div>
		</>
	)
}

export default Products

// Get Products And Add it in Props In This page
export const getStaticProps = async () => {
  const res = await fetch("https://fakestoreapi.com/products?limit=50")
  const products = await res.json()

  return {
    props: {
      products,
    },
  }
}