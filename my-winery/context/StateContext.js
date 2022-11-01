import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  //hide cart
  const [showCart, setShowCart] = useState(false);
  //items we have on our cart
  const [cartItems, setCartItems] = useState([]);
  //calculate tthe price of the cart
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  //quantity for each individual item
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;


  const onAdd = (product, quantity) => {
    //is the product already in the cart
    const checkProductInCart = cartItems.find((item) => item._id === product._id);
    
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    //we just need to increase the quantity
    if(checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if(cartProduct._id === product._id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
      })

      setCartItems(updatedCartItems);
    } 
    // add the product with the updated quantity
    else {
      product.quantity = quantity;
      
      setCartItems([...cartItems, { ...product }]);
    }
//Success Message
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
    foundProduct = cartItems.find((item) => item._id === id)
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id)

    if(value === 'inc') {
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

  // functions to add or decrease cuantity to the previous one
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
    //We pass our children so we can manage them on our entire application
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

//export to allow us to use our state like a hook

export const useStateContext = () => useContext(Context);