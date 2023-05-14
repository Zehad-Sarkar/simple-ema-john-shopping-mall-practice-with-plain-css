import { getShoppingCart } from "../../utilities/localStorage";

const cartLoader = async () => {
  const productLoader = await fetch("http://localhost:5000/products");
  const product = await productLoader.json();
  // console.log(product);
  const storedCart = getShoppingCart();
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
