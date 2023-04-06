import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const AllProducts = ({ product, handleAddToCart }) => {
  const { id, name, price, shipping, img, ratings, seller } = product;

  return (
    <div className="all-products">
      <img className="image" src={img} alt="" />

      <div className="details">
        <h4>Name: {name}</h4>
        <h3>Brand: {seller}</h3>
        <h3>Price: $ {price}</h3>
        <h4>Shipping Charge: $ {shipping}</h4>
        <p>Ratings: {ratings}</p>
      </div>

      <button onClick={() => handleAddToCart(product)} className="btn">
        Add to Cart <FontAwesomeIcon icon={faShoppingCart} />
      </button>
    </div>
  );
};

export default AllProducts;
