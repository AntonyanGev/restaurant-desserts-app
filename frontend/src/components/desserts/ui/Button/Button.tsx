"use client";

import React from "react";
import { AddToCartButton, CartIcon } from "./styles";

interface AddToCartProps {
  onAddToCart: () => void;
}

const AddToCart: React.FC<AddToCartProps> = ({ onAddToCart }) => {
  return (
    <AddToCartButton onClick={onAddToCart}>
      <CartIcon src="images/icon-add-to-cart.svg" alt="Add to cart" />
      Add to Cart
    </AddToCartButton>
  );
};

export default AddToCart;
