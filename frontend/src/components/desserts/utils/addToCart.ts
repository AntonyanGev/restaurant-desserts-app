import type { Dessert, CartItem } from "@/types";
import type { MutationFunction } from "@apollo/client";
import type { Dispatch, SetStateAction } from "react";

export const addToCart = async (
  dessert: Dessert,
  count: number,
  cartItems: CartItem[],
  setCartItems: Dispatch<SetStateAction<CartItem[]>>,
  addCartItemMutation: MutationFunction,
  updateCartItemMutation: MutationFunction
): Promise<void> => {
  const existingItemIndex = cartItems.findIndex(
    (item) => item.id === dessert.id
  );

  if (existingItemIndex > -1) {
    const updatedItem: CartItem = {
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

    setCartItems((prevCart) => {
      const newCart = [...prevCart];
      newCart[existingItemIndex] = updatedItem;
      return newCart;
    });
  } else {
    const newItem: CartItem = {
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

    setCartItems((prevCart) => [...prevCart, newItem]);
  }
};
