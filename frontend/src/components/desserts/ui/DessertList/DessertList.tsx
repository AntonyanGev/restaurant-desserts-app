"use client";

import React, { useEffect, useState } from "react";
import Counter from "../Counter/Counter";
import AddToCart from "../Button/Button";
import { Card, Image, TextWrapper, Type, Name, Price } from "./styles";
import type { Dessert, Images } from "@/types";

interface DessertListProps {
  desserts: Dessert[];
  counts: Record<string, number>;
  incrementCount: (id: string, dessert: Dessert) => void;
  decrementCount: (id: string, dessert: Dessert) => void;
}

const DessertList: React.FC<DessertListProps> = ({
  desserts,
  counts,
  incrementCount,
  decrementCount,
}) => {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const updateWindowWidth = () => setWindowWidth(window.innerWidth);
    updateWindowWidth();
    window.addEventListener("resize", updateWindowWidth);

    return () => window.removeEventListener("resize", updateWindowWidth);
  }, []);

  const getImageSource = (images: Images): string => {
    if (windowWidth < 480) return images.mobile;
    if (windowWidth < 768) return images.tablet;
    return images.desktop;
  };

  return (
    <>
      {desserts.map((dessert) => (
        <Card key={dessert.id}>
          <Image src={getImageSource(dessert.images)} alt={dessert.name} />
          <TextWrapper>
            <Type>{dessert.type}</Type>
            <Name>{dessert.name}</Name>
            <Price>${dessert.price}</Price>
          </TextWrapper>
          {counts[dessert.id] > 0 ? (
            <Counter
              count={counts[dessert.id]}
              incrementCount={() => incrementCount(dessert.id, dessert)}
              decrementCount={() => decrementCount(dessert.id, dessert)}
            />
          ) : (
            <AddToCart
              onAddToCart={() => incrementCount(dessert.id, dessert)}
            />
          )}
        </Card>
      ))}
    </>
  );
};

export default DessertList;
