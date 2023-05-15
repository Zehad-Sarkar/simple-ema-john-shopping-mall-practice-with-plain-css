import React, { useEffect, useState } from "react";
import AllProducts from "../AllProducts/AllProducts";
import CartProduct from "../CartProduct/CartProduct";
import {
  addToCart,
  deleteCart,
  getShoppingCart,
} from "../../utilities/localStorage";
import { Link, useLoaderData } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const { totalProducts } = useLoaderData(); //for pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPages, setItemsPerPages] = useState(10);

  //for pagination *start*
  // const itemsperPages = 10;
  const totalPages = Math.ceil(totalProducts / itemsPerPages);
  const pagesNumber = [...Array(totalPages).keys()];
  const options = [5, 10, 15, 20];

  const handleSelectChange = (e) => {
    setItemsPerPages(parseInt(e.target.value));
    setCurrentPage(0);
  };
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPages}`
      );
      const data = await response.json();
      setProducts(data);
    }
    fetchData();
  }, [currentPage, itemsPerPages]);
  //pagination end here

  // useEffect(() => {
  //   fetch("http://localhost:5000/products")
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data));
  // }, []);

  useEffect(() => {
    let storedCart = getShoppingCart();
    const ids = Object.keys(storedCart);
    fetch("http://localhost:5000/productsByIds", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ids),
    })
      .then((res) => res.json())
      .then((cartProducts) => {
        let savedCart = [];
        for (const id in storedCart) {
          const addedProduct = cartProducts.find(
            (product) => product._id === id
          );
          if (addedProduct) {
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct);
          }
        }
        setCart(savedCart);
      });
   
  }, []);

  const handleAddToCart = (product) => {
    // const newCart = [...cart, product]
    let newCart = [];
    const exist = cart.find((pd) => pd._id === product._id);
    if (!exist) {
      product.quantity = 1;
      newCart = [...cart, product];
    } else {
      exist.quantity = exist.quantity + 1;
      const remaining = cart.filter((pd) => pd._id !== product._id);
      newCart = [...remaining, exist];
    }
    setCart(newCart);
    addToCart(product._id);
  };
  //remove all cart item from cart
  const handleClearBtn = () => {
    setCart([]);
    deleteCart();
  };

  return (
    <>
      <div className="shop-container">
        <div className="product-container">
          {products.map((product) => (
            <AllProducts
              product={product}
              key={product._id}
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
      {/* pagination button */}
      <div className="pagination">
        <p>
          currentPage: {currentPage} And Items Per Pages: {itemsPerPages}
        </p>
        {pagesNumber.map((number) => (
          <button
            onClick={() => setCurrentPage(number)}
            className={currentPage === number ? "selected" : ""}
            key={number}
          >
            {number}
          </button>
        ))}
        <select value={itemsPerPages} onChange={handleSelectChange}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Shop;
