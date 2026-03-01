"use client";

import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import {
  Details,
  Order,
  ProductName,
  UnitPrice,
  Units,
  YourCard,
  FinalPrice,
  Total,
  TotalCost,
  Neutral,
  Confirm,
  CartList,
  Image,
  OrderTotal,
  DetailWrapper,
  Box,
  CarbonNeutralText,
} from "./styles";

import OrderConfirmationModal from "../../OrderConfirmation/index";
import { DELETE_CART_ITEM } from "@/app/Service/mutation/cart";
import { GET_CART } from "@/app/Service/query/cart";
import type { CartItem } from "@/types";

interface ActiveCardProps {
  cartList: CartItem[];
  onNewOrder: () => void;
}

const ActiveCard: React.FC<ActiveCardProps> = ({ cartList, onNewOrder }) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [deleteDessert] = useMutation(DELETE_CART_ITEM, {
    refetchQueries: [{ query: GET_CART }],
  });

  const handleDelete = async (id: string) => {
    try {
      await deleteDessert({ variables: { id } });
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  const totalPrice = cartList.reduce(
    (acc, item) => acc + item.totalPrice,
    0
  );

  const handleNewOrder = () => {
    setModalOpen(false);
    onNewOrder();
  };

  return (
    <Order>
      <YourCard>Your Cart ({cartList.length})</YourCard>

      {cartList.map((item) => (
        <CartList key={item.id}>
          <Details>
            <DetailWrapper>
              <ProductName>{item.name}</ProductName>
              <Box>
                <Units>{item.count}x</Units>
                <UnitPrice>@${item.price}</UnitPrice>
                <FinalPrice>${item.totalPrice}</FinalPrice>
                <Image
                  src="/images/icon-remove-item.svg"
                  alt="Remove item"
                  onClick={() => handleDelete(item.id)}
                  style={{ cursor: "pointer" }}
                />
              </Box>
            </DetailWrapper>
          </Details>
        </CartList>
      ))}

      <Total>
        <OrderTotal>Order Total</OrderTotal>
        <TotalCost>${totalPrice}</TotalCost>
      </Total>

      <Neutral>
        <Image
          src="images/icon-carbon-neutral.svg"
          alt="Carbon neutral delivery"
        />
        This is a <CarbonNeutralText>carbon neutral</CarbonNeutralText> delivery
      </Neutral>

      <Confirm onClick={() => setModalOpen(true)}>Confirm Order</Confirm>

      {isModalOpen && (
        <OrderConfirmationModal
          cartList={cartList}
          totalPrice={totalPrice}
          onNewOrder={handleNewOrder}
        />
      )}
    </Order>
  );
};

export default ActiveCard;
