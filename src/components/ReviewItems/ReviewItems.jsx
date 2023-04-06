import React from 'react';

const ReviewItems = ({ product, handleDeleteBtn }) => {
  const { name, price, quantity, img ,id} = product;

  return (
    <div className="review-container">
      <div className="review-product">
        <img className="review-image" src={img} alt="" />
        <div className="">
          <h3>name: {name}</h3>
          <h4>Price: {price}</h4>
          <h5>Quantity: {quantity}</h5>
        </div>
      </div>
      <button onClick={() => handleDeleteBtn(id)}>delete</button>
    </div>
  );
};

export default ReviewItems;