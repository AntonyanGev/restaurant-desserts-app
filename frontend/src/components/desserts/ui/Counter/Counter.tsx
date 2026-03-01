"use client";

import React from "react";
import { CounterWrapper, CounterButton, Quantity } from "./styles";

interface CounterProps {
  count: number;
  incrementCount: () => void;
  decrementCount: () => void;
}

const Counter: React.FC<CounterProps> = ({ count, incrementCount, decrementCount }) => {
  return (
    <CounterWrapper>
      <CounterButton onClick={decrementCount} aria-label="Decrease quantity">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="2"
          viewBox="0 0 10 2"
        >
          <path fill="#fff" d="M0 .375h10v1.25H0V.375Z" />
        </svg>
      </CounterButton>
      <Quantity>{count}</Quantity>
      <CounterButton onClick={incrementCount} aria-label="Increase quantity">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 10 10"
        >
          <path
            fill="#fff"
            d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
          />
        </svg>
      </CounterButton>
    </CounterWrapper>
  );
};

export default Counter;
