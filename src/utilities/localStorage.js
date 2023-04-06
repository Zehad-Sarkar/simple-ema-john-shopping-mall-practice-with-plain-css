//set shopping cart
const addToCart = (id) => {
  let shoppingCart = getShoppingCart()
  const quantity = shoppingCart[id]
  if (!quantity) {
    shoppingCart[id] = 1;
  }
  else {
    const newQuantity = quantity + 1;
    shoppingCart[id] = newQuantity;
  }
  localStorage.setItem('shoppingcart',JSON.stringify(shoppingCart))
}

// get shopping cart
const getShoppingCart = () => {
  let shoppingCart = {}
  const storedCart =localStorage.getItem('shoppingcart') 
  if (storedCart) {
     shoppingCart = JSON.parse(storedCart);
  }
  return shoppingCart;
}

//remove shopping cart
const removeFromCart = id => {
  let shoppingCart = getShoppingCart()
  if (id in shoppingCart) {
    delete shoppingCart[id]
     localStorage.setItem("shoppingcart", JSON.stringify(shoppingCart));
  }
}

//delete shopping cart
const deleteCart = () => {
  localStorage.removeItem('shoppingcart')
}

export { addToCart, getShoppingCart, removeFromCart, deleteCart };