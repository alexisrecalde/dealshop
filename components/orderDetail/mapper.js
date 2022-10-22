export const orderProductsMapper = (orderProducts, cliente) => {
  const cartItems = [];
  if (cliente) {
    for (const orderProduct of orderProducts) {
      const cartItem = {
        photos: orderProduct.Product.photos,
        name: orderProduct.Product.name,
        quantity: orderProduct.quantity,
        clientSellingPrice: orderProduct.price,
      };

      cartItems.push(cartItem);
    }
  } else {
    for (const orderProduct of orderProducts) {
      const cartItem = {
        photos: orderProduct.product.photos,
        name: orderProduct.product.name,
        quantity: orderProduct.quantity,
        sellingPrice: orderProduct.sellingPrice,
        clientSellingPrice: orderProduct.clientSellingPrice,
      };

      cartItems.push(cartItem);
    }
  }

  return cartItems;
};
