import styled from "styled-components";
import { media } from "@/components/breakpoint/mediaQuery";

export const Order = styled.section`
  background-color: white;
  border-radius: 0.9375rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  max-width: 23.25rem;
  width: 100%;
  height: fit-content;
  margin-top: 2rem;

  ${media(
    "md",
    `
    margin-top: 0;
  `
  )};
`;

export const YourCard = styled.p`
  color: var(--Red);
  font-size: 1.2rem;
  font-weight: 700;
`;

export const CartList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;
  border-bottom: solid 0.0625rem var(--Rose100);
`;

export const Details = styled.div`
  width: 100%;
  justify-content: space-around;
  padding: 1rem;
`;

export const ProductName = styled.p`
  font-weight: 600;
  font-size: 0.9rem;
  white-space: nowrap;
  margin-bottom: 0.5rem;
`;

export const Units = styled.span`
  color: var(--Red);
  font-weight: 600;
  margin-right: 1rem;
`;

export const UnitPrice = styled.span`
  color: var(--Rose400);
  margin-right: 1rem;
`;

export const FinalPrice = styled.span`
  font-weight: 600;
  color: var(--Rose500);
`;

export const Total = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  align-items: center;
`;

export const OrderTotal = styled.p``;

export const TotalCost = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  margin-top: 1rem;
`;

export const Neutral = styled.p`
  font-size: 0.9rem;
  background-color: var(--Rose100);
  padding: 1rem;
  border-radius: 0.625rem;
  text-align: center;
`;

export const Confirm = styled.button`
  font-weight: 600;
  background-color: var(--Red);
  border: solid 0.0625rem var(--Rose500);
  padding: 0.8rem;
  border-radius: 3.125rem;
  gap: 0.5rem;
  font-family: "Red Hat Text", sans-serif;
  color: white;
  margin-top: 1rem;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export const Box = styled.div`
  display: flex;
  align-items: center;
`;

export const Image = styled.img`
  display: inline-block;
  margin-left: auto;
`;

export const DetailWrapper = styled.div``;

export const CarbonNeutralText = styled.strong``;
