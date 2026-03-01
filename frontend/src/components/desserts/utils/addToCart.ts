import type { Dessert, CartItem } from "@/types";
import type { MutationFunction } from "@apollo/client";

export const addToCart = async (
  dessert: Dessert,
  count: number,
  cartItems: CartItem[],
  addCartItemMutation: MutationFunction,
  updateCartItemMutation: MutationFunction
): Promise<void> => {
  const existingItemIndex = cartItems.findIndex(
    (item) => item.id === dessert.id
  );

  if (existingItemIndex > -1) {
    const updatedItem = {
      ...cartItems[existingItemIndex],
      count,
      totalPrice: count * parseFloat(dessert.price),
    };

    await updateCartItemMutation({
      variables: {
        id: updatedItem.id,
        input: {
          count: updatedItem.count,
          totalPrice: updatedItem.totalPrice,
        },
      },
    });
  } else {
    const newItem = {
      id: dessert.id,
      name: dessert.name,
      price: dessert.price,
      count,
      totalPrice: count * parseFloat(dessert.price),
      image: dessert.images.desktop,
    };

    await addCartItemMutation({
      variables: { input: newItem },
    });
  }
};
