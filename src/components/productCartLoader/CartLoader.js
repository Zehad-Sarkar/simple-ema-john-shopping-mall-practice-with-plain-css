import { getShoppingCart } from "../../utilities/localStorage";

const cartLoader = async () => {
  const productLoader = await fetch("products.json");
  const product = await productLoader.json();
  // console.log(product);
  const storedCart = getShoppingCart();
  let savedCart = [];
  for (const id in storedCart) {
    const addedProduct = product.find((pd) => pd.id === id);
    if (addedProduct) {
      const quantity = storedCart[id];
      addedProduct.quantity = quantity;
      savedCart.push(addedProduct);
    }
  }
  return savedCart;
};

export default cartLoader;
