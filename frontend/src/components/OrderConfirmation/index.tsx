"use client";

import React from "react";
import { DELETE_CART_DATA } from "@/app/Service/mutation/cart";
import {
  Modal,
  ModalContent,
  CartListSummary,
  Confirmed,
  Enjoy,
  CartList,
  Details,
  Thumbnail,
  FinalDetail,
  FinalPrice,
  Total,
  TotalCost,
  NewOrder,
  OrderTotalLabel,
  ConfirmedIcon,
  ProductName,
  Units,
  Price,
  Items,
  Close,
  CloseIcon,
} from "./styles";
import { useMutation } from "@apollo/client";
import type { CartItem } from "@/types";

interface OrderConfirmationModalProps {
  cartList: CartItem[];
  totalPrice: number;
  onNewOrder: () => void;
}

const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  cartList,
  totalPrice,
  onNewOrder,
}) => {
  const [deleteCartData] = useMutation(DELETE_CART_DATA);

  const handleDeleteAll = async () => {
    try {
      const response = await deleteCartData();
      if (response.data.deleteCartData) {
        onNewOrder();
      }
    } catch (err) {
      console.error("Error deleting cart data:", err);
    }
  };

  return (
    <Modal>
      <ModalContent>
        <Close onClick={onNewOrder} aria-label="Close">
          <CloseIcon src="/images/icon-remove-item.svg" alt="Close" />
        </Close>
        <CartListSummary>
          <ConfirmedIcon
            src="images/icon-order-confirmed.svg"
            alt="Order Confirmed"
          />
          <Confirmed>Order Confirmed</Confirmed>
          <Enjoy>We hope you enjoy your food!</Enjoy>
        </CartListSummary>

        {cartList.map(({ id, name, price, count, totalPrice: itemTotal, image }) => (
          <CartList key={id}>
            <Details>
              <Thumbnail src={image} alt={name} />
              <FinalDetail>
                <ProductName>{name}</ProductName>
                <Items>
                  <Units>{count}x</Units>
                  <Price>@ ${price}</Price>
                </Items>
              </FinalDetail>
              <FinalPrice>${itemTotal}</FinalPrice>
            </Details>
          </CartList>
        ))}

        <Total>
          <OrderTotalLabel>Order Total</OrderTotalLabel>
          <TotalCost>${totalPrice}</TotalCost>
        </Total>

        <NewOrder onClick={handleDeleteAll}>Start New Order</NewOrder>
      </ModalContent>
    </Modal>
  );
};

export default OrderConfirmationModal;
