"use client";

import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { GET_ALL_DESSERTS } from "@/app/Service/query/desserts";
import { CREATE_CART_ITEM, UPDATE_CART_ITEM } from "@/app/Service/mutation/cart";
import { GET_CART } from "@/app/Service/query/cart";

import DessertList from "./ui/DessertList/DessertList";
import { Main, H1, Section, Wrapper, Loader } from "./styles";
import InactiveCard from "../card/InactiveCard/index";
import ActiveCard from "../card/activeCard";
import { addToCart } from "./utils/addToCart";
import type { Dessert } from "@/types";

export default function Desserts() {
  const { data, loading } = useQuery(GET_ALL_DESSERTS);
  const { data: cartData, loading: cartLoading } = useQuery(GET_CART);
  const [counts, setCounts] = useState<Record<string, number>>({});

  const [addCartItemMutation] = useMutation(CREATE_CART_ITEM, {
    refetchQueries: [{ query: GET_CART }],
  });
  const [updateCartItemMutation] = useMutation(UPDATE_CART_ITEM, {
    refetchQueries: [{ query: GET_CART }],
  });

  const desserts = data?.getAllDesserts ?? [];
  const cartItems = cartData?.getCart ?? [];

  const incrementCount = async (id: string, dessert: Dessert) => {
    const newCount = (counts[id] || 0) + 1;
    setCounts((prev) => ({ ...prev, [id]: newCount }));

    await addToCart(
      dessert,
      newCount,
      cartItems,
      addCartItemMutation,
      updateCartItemMutation
    );
  };

  const decrementCount = async (id: string, dessert: Dessert) => {
    const newCount = Math.max((counts[id] || 0) - 1, 0);
    setCounts((prev) => ({ ...prev, [id]: newCount }));

    if (newCount > 0) {
      await addToCart(
        dessert,
        newCount,
        cartItems,
        addCartItemMutation,
        updateCartItemMutation
      );
    }
  };

  const handleNewOrder = () => {
    setCounts({});
  };

  return (
    <Section>
      <Wrapper>
        <H1>Desserts</H1>
        {loading || cartLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          <Main>
            <DessertList
              desserts={desserts}
              counts={counts}
              incrementCount={incrementCount}
              decrementCount={decrementCount}
            />
          </Main>
        )}
      </Wrapper>
      {cartItems.length > 0 ? (
        <ActiveCard cartList={cartItems} onNewOrder={handleNewOrder} />
      ) : (
        <InactiveCard />
      )}
    </Section>
  );
}
