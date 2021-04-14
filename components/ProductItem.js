// Page Components
import Link from 'next/link'
import Meta from './Meta'

// Page Style
import productStyles from '../styles/Products.module.scss'

const ProductItem = ({ product }) => {
	return (
		<>
			<Meta title={product.title} description={product.description} />
			<div className={productStyles.contcard}>
				<div className={productStyles.card}>
					<div className={productStyles.box}>
						<div className={productStyles.content}>
							<img className={productStyles.img} src={product.image} alt=""/>
							<h2 className={productStyles.h2}>{product.price}$</h2>
							<Link href={`/Details/${product.id}`} className={productStyles.a}>
								Details
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ProductItem
