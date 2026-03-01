"use client";

import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { GET_ALL_DESSERTS } from "@/app/Service/query/desserts";
import { CREATE_CART_ITEM, UPDATE_CART_ITEM } from "@/app/Service/mutation/cart";
import { GET_CART } from "@/app/Service/query/cart";

import DessertList from "./ui/DessertList/DessertList";
import { Main, H1, Section, Wrapper, Loader } from "./styles";
import InactiveCard from "../card/InactiveCard/index";
import ActiveCard from "../card/activeCard";
import { addToCart } from "./utils/addToCart";
import type { Dessert, CartItem } from "@/types";

export default function Desserts() {
  const { data, loading } = useQuery(GET_ALL_DESSERTS);
  const { data: cartData, loading: cartLoading, refetch } = useQuery(GET_CART);
  const [desserts, setDesserts] = useState<Dessert[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [addCartItemMutation] = useMutation(CREATE_CART_ITEM);
  const [updateCartItemMutation] = useMutation(UPDATE_CART_ITEM);

  useEffect(() => {
    if (!loading && data) {
      setDesserts(data.getAllDesserts);
    }
  }, [data, loading]);

  useEffect(() => {
    if (!cartLoading && cartData) {
      setCartItems(cartData.getCart);
    }
  }, [cartData, cartLoading]);

  const incrementCount = async (id: string, dessert: Dessert) => {
    const newCount = (counts[id] || 0) + 1;
    setCounts((prev) => ({ ...prev, [id]: newCount }));

    await addToCart(
      dessert,
      newCount,
      cartItems,
      setCartItems,
      addCartItemMutation,
      updateCartItemMutation
    );

    refetch();
  };

  const decrementCount = async (id: string, dessert: Dessert) => {
    const newCount = Math.max((counts[id] || 0) - 1, 0);
    setCounts((prev) => ({ ...prev, [id]: newCount }));

    if (newCount > 0) {
      await addToCart(
        dessert,
        newCount,
        cartItems,
        setCartItems,
        addCartItemMutation,
        updateCartItemMutation
      );
    }

    refetch();
  };

  return (
    <Section>
      <Wrapper>
        <H1>Desserts</H1>
        {loading ? (
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
      {cartItems.length > 0 ? <ActiveCard /> : <InactiveCard />}
    </Section>
  );
}
