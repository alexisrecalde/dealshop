export const addItemToCart = (cartItems, itemToAdd) => {
  const existingCartItem = cartItems.find((item) => item.id === itemToAdd.id);

  if (existingCartItem) {
    return cartItems.map((item) =>
      item.id === itemToAdd.id ? { ...item, quantity: item.quantity + itemToAdd.quantity } : item
    );
  }

  return [...cartItems, { ...itemToAdd }];
};

export const increaseItemQty = (cartItems, itemToIncrease) => {
  return cartItems.map((item) => (item.id === itemToIncrease.id ? { ...item, quantity: item.quantity + 1 } : item));
};

export const reduceItemFromCart = (cartItems, itemToRemove) => {
  const existingCartItem = cartItems.find((item) => item.id === itemToRemove.id);

  if (existingCartItem.quantity > 1) {
    return cartItems.map((item) => (item.id === itemToRemove.id ? { ...item, quantity: item.quantity - 1 } : item));
  } else {
    return cartItems;
  }
};

export const clearNoStockItems = (cartItems, itemsToRemove) => {
  return cartItems.filter(
    (item) =>
      itemsToRemove.find(function (itemToRemove) {
        return item.id == itemToRemove.product.id;
      }) == undefined
  );
};

export const setSellingPriceForItem = (cartItems, itemToUpdate) => {
  return cartItems.map((item) =>
    item.id === itemToUpdate.id ? { ...item, clientSellingPrice: itemToUpdate.clientSellingPrice } : item
  );
};
