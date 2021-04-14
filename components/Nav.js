import Link from 'next/link'
import navStyles from '../styles/Nav.module.scss'
import {connect} from 'react-redux'

const Nav = ({totalQuant}) => {

  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <Link href='/Products/Products'>Products</Link>
        </li>
        <li>
          <Link href='/Cards/Cards'>Cards</Link>
        </li>
      </ul>
      <Link href='/Cards/Cards'>
        <div className="BoxCart">
          <div className="BoxIcon">
            <i className="fa fa-shopping-cart fa-2x"></i>
            <span className='badge badge-warning' id='lblCartCount'> {totalQuant} </span>
          </div>
        </div>
      </Link>
    </nav>
  )

}

const mapStatToProps = (state) => {
  return{
    totalQuant: state.cart.reduce((total,item) => total + parseInt(item.quantity) , 0)
  }
}

export default connect(mapStatToProps)(Nav)