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
import { CONFIRM_ORDER } from "@/app/Service/mutation/cart";
import type { CartItem } from "@/types";

interface ActiveCardProps {
  cartList: CartItem[];
  onRemoveItem: (id: string) => void;
  onNewOrder: () => void;
}

const ActiveCard: React.FC<ActiveCardProps> = ({ cartList, onRemoveItem, onNewOrder }) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [confirmOrder] = useMutation(CONFIRM_ORDER);

  const totalPrice = cartList.reduce(
    (acc, item) => acc + item.totalPrice,
    0
  );

  const handleConfirmOrder = async () => {
    try {
      const items = cartList.map(({ id, name, price, count, totalPrice, image }) => ({
        id,
        name,
        price,
        count,
        totalPrice,
        image,
      }));

      await confirmOrder({ variables: { items } });
      setModalOpen(true);
    } catch (error) {
      console.error("Error confirming order:", error);
    }
  };

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
                  onClick={() => onRemoveItem(item.id)}
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

      <Confirm onClick={handleConfirmOrder}>Confirm Order</Confirm>

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
