"use client";

import React from "react";
import { Aside, AsideWrapper, EmptyImage, CartCount, EmptyMessage } from "./styles";

const InactiveCard: React.FC = () => {
  return (
    <AsideWrapper>
      <Aside>
        <CartCount>Your Cart (0)</CartCount>
        <EmptyImage src="images/illustration-empty-cart.svg" alt="empty cart" />
        <EmptyMessage>Your added items will appear here</EmptyMessage>
      </Aside>
    </AsideWrapper>
  );
};

export default InactiveCard;
