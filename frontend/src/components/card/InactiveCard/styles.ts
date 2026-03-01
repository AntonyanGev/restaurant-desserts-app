"use client";

import styled from "styled-components";
import { media } from "@/components/breakpoint/mediaQuery";

export const Aside = styled.aside`
  margin: auto;
  background-color: white;
  border-radius: 0.9375rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin-top: 2rem;
  width: auto;

  ${media(
    "md",
    `
      width: 23.75rem;
      margin: auto;
      align-self: center;
    `
  )}
`;

export const AsideWrapper = styled.div`
  align-self: center;

  ${media(
    "md",
    `
    align-self: flex-start;
  `
  )}
`;

export const CartCount = styled.p`
  color: var(--Red);
  font-size: 1.2rem;
  font-weight: 700;
`;

export const EmptyImage = styled.img`
  width: auto;
  align-self: center;
`;

export const EmptyMessage = styled.p`
  font-weight: 600;
  color: var(--Rose500);
  text-align: center;
  font-size: 0.9rem;
`;
