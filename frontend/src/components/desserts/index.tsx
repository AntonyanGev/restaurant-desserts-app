"use client";

import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import { GET_ALL_DESSERTS } from "@/app/Service/query/desserts";

import DessertList from "./ui/DessertList/DessertList";
import { Main, H1, Section, Wrapper, Loader } from "./styles";
import InactiveCard from "../card/InactiveCard/index";
import ActiveCard from "../card/activeCard";
import { buildCartItems } from "./utils/addToCart";
import type { Dessert } from "@/types";

export default function Desserts() {
  const { data, loading } = useQuery(GET_ALL_DESSERTS);
  const [counts, setCounts] = useState<Record<string, number>>({});

  const desserts = data?.getAllDesserts ?? [];
  const cartItems = buildCartItems(desserts, counts);

  const incrementCount = (id: string) => {
    setCounts((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const decrementCount = (id: string) => {
    setCounts((prev) => {
      const newCount = Math.max((prev[id] || 0) - 1, 0);
      if (newCount === 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: newCount };
    });
  };

  const removeItem = (id: string) => {
    setCounts((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };

  const handleNewOrder = () => {
    setCounts({});
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
      {cartItems.length > 0 ? (
        <ActiveCard
          cartList={cartItems}
          onRemoveItem={removeItem}
          onNewOrder={handleNewOrder}
        />
      ) : (
        <InactiveCard />
      )}
    </Section>
  );
}
