import React from 'react';

const CartProduct = ({ cart, handleClearBtn, children }) => {
  //calculation for cart summery
  let totalPrice = 0;
  let shippingCharge = 0;
  let quantity = 0;

  for (const product of cart) {
    if (quantity.quantity === 0) {
      quantity.quantity = 1;
    }
    totalPrice = totalPrice + product.price * product.quantity;
    shippingCharge = shippingCharge + product.shipping;
    quantity = quantity + product.quantity;
  }

  const tax = (totalPrice * 7) / 100;
  const grandTotal = totalPrice + tax;

  return (
    <div className="cart">
      <h3>Cart Summery</h3>

      <h3>Selected Item: {quantity}</h3>
      <h3>Total Price: {totalPrice}</h3>
      <h3>Total Shipping Charge: {shippingCharge} </h3>
      <h3>Tax: {tax.toFixed(2)}</h3>
      <h3>Grand Total: {grandTotal.toFixed(2)}</h3>
      <button onClick={handleClearBtn}>Clear Cart</button>
      {children}
    </div>
  );
};

export default CartProduct;

