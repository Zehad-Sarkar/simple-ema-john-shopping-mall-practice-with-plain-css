import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import CartProduct from '../CartProduct/CartProduct';
import ReviewItems from '../ReviewItems/ReviewItems';
import { deleteCart, removeFromCart } from '../../utilities/localStorage';

const Order = () => {
  const savedCart = useLoaderData();

  const [cart, setCart] = useState(savedCart);

  //remove single item from cart
  const handleDeleteBtn = (id) => {
    console.log(id);
    const remaining = cart.filter(pd => pd.id !== id)
    setCart(remaining)
    removeFromCart(id)
}

  //remove all cart item from cart
  const handleClearBtn = () => {
    setCart([])
    deleteCart()
  }

// console.log(cart);
  return (
    <div className="order-container">
      <div className="order-left">
        <div className="">
          {cart.map((product) => (
            <ReviewItems
              product={product}
              handleDeleteBtn={handleDeleteBtn}
              key={product.id}
            ></ReviewItems>
          ))}
        </div>
      </div>
      <div className="order-right">
        <CartProduct cart={cart} handleClearBtn={handleClearBtn}>
          <Link to="/checkout">CheckOut</Link>
        </CartProduct>
       
      </div>
    </div>
  );
};

export default Order;