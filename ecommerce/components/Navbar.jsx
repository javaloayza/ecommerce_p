import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping, AiFillHome } from 'react-icons/ai'

import { Cart } from './';
import { useStateContext} from '../context/StateContext';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className="navbar-container" >
      <Link href="/"> 
      <button className="logo" type="button" > <AiFillHome /> </button>
      </Link>
      <button type="button" className="cart-icon" onClick={() => setShowCart(true)}> 
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>
    
       { /* A conditional rendering. If showCart is true, it will render the Cart component. */ }
       {showCart && <Cart />} 
    </div>
  )
}

export default Navbar