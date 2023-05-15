import { getShoppingCart } from "../../utilities/localStorage";

const cartLoader = async () => {
  const storedCart = getShoppingCart();
  const ids = Object.keys(storedCart);
console.log(ids);
  const productLoader = await fetch('http://localhost:5000/productsByIds', {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(ids),
  });

  const product = await productLoader.json();
  console.log(product);
  // const storedCart = getShoppingCart();
  let savedCart = [];
  for (const id in storedCart) {
    const addedProduct = product.find((pd) => pd._id === id);
    if (addedProduct) {
      const quantity = storedCart[id];
      addedProduct.quantity = quantity;
      savedCart.push(addedProduct);
    }
  }
  return savedCart;
};

export default cartLoader;
