import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

 //this is going to be the product that we want to update
  let foundProduct;
  let index; 

    const onAdd = (product, quantity) => {
    /* Checking if the product is already in the cart. */
    const checkProductInCart = cartItems.find((item) => item._id === product._id);
    
    /* Setting the total price of the cart. */
     setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);

    /* Setting the total quantities of the cart. */
     setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    
   /* Checking if the product is already in the cart. If it is, it updates the quantity of the product.
   If it is not, it adds the product to the cart. */
    if(checkProductInCart) {

      const updatedCartItems = cartItems.map((cartProduct) => {
        if(cartProduct._id === product._id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
      })

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      
      setCartItems([...cartItems, { ...product }]);
    }

    /* A notification that appears when a product is added to the cart. */
    toast.success(`${qty} ${product.name} added to the cart.`); 
   
    
}
    
const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  }

const toggleCartItemQuanitity = (id, value) => {
    /* Finding the product in the cartItems array that has the same id as the product that we want to
    update. */
    foundProduct = cartItems.find((item) => item._id === id)
    /* Finding the index of the product that we want to update. */
    index = cartItems.findIndex((product) => product._id === id);
  /* Filtering out the product that we want to update from the cartItems array. 
    this is going to make sure to keep all of the other ones where the id is not equal to id but only filter out the one where it is and now with this we
    have new cartItems right here and here we're not mutating the original state*/
    const newCartItems = cartItems.filter((item) => item._id !== id)

    if(value === 'inc') {
     /* we are updating the cart items with the current card items
    and we're adding one new element to it we're spreading the properties of that
    product and we are increasing the quantity by one  */ 
      setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
    } else if(value === 'dec') {
      if (foundProduct.quantity > 1) {
        setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
      }
    }
  } 
    /* 

   */

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  }

  const decQty = () => {
    setQty((prevQty) => {
      if(prevQty - 1 < 1) return 1;
     
      return prevQty - 1;
    });
  }

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities 
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);
