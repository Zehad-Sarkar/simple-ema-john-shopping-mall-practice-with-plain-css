import React, { useEffect, useState } from "react";
import AllProducts from "../AllProducts/AllProducts";
import CartProduct from "../CartProduct/CartProduct";
import {
  addToCart,
  deleteCart,
  getShoppingCart,
} from "../../utilities/localStorage";
import { Link } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  // console.log(cart);

  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    let storedCart = getShoppingCart();
    let savedCart = [];
    for (const id in storedCart) {
      const addedProduct = products.find((product) => product.id === id);
      if (addedProduct) {
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        savedCart.push(addedProduct);
      }
    }
    setCart(savedCart);
  }, [products]);

  const handleAddToCart = (product) => {
    // const newCart = [...cart, product]
    let newCart = [];
    const exist = cart.find((pd) => pd.id === product.id);
    if (!exist) {
      product.quantity = 1;
      newCart = [...cart, product];
    } else {
      exist.quantity = exist.quantity + 1;
      const remaining = cart.filter((pd) => pd.id !== product.id);
      newCart = [...remaining, exist];
    }
    setCart(newCart);
    addToCart(product.id);
  };
  //remove all cart item from cart
  const handleClearBtn = () => {
    setCart([]);
    deleteCart();
  };

  return (
    <div className="shop-container">
      <div className="product-container">
        {products.map((product) => (
          <AllProducts
            product={product}
            key={product.id}
            handleAddToCart={handleAddToCart}
          ></AllProducts>
        ))}
      </div>

      <div className="cart-container">
        <CartProduct cart={cart} handleClearBtn={handleClearBtn}>
          <Link to="/order">Review Order</Link>
        </CartProduct>
      </div>
    </div>
  );
};

export default Shop;
