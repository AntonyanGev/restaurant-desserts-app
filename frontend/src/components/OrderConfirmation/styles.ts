import styled from "styled-components";
import { media } from "../breakpoint/mediaQuery";

export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fefefe;
  padding: 2rem;
  border: 0.0625rem solid #888;
  border-radius: 0.9375rem;
  margin-inline: auto;
  max-width: 90%;

  ${media("md", "max-width: 100%;")}
`;

export const CartListSummary = styled.div`
  display: block;
`;

export const Confirmed = styled.p`
  font-size: 2rem;
  font-weight: 700;
  margin: 1rem 0 0 0;
`;

export const Enjoy = styled.p`
  font-size: 0.9rem;
  color: var(--Rose500);
  margin: 0 0 2rem 0;
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
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  justify-content: space-around;
  padding: 0.8rem;
`;

export const Thumbnail = styled.img`
  width: 3rem;
  border-radius: 0.625rem;
`;

export const FinalDetail = styled.div`
  display: block;
`;

export const FinalPrice = styled.p`
  font-weight: 600;
  color: var(--Rose500);
`;

export const Total = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  align-items: center;
  padding: 0.8rem;
`;

export const TotalCost = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
`;

export const NewOrder = styled.button`
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
    background-color: var(--Rose500);
  }
`;

export const OrderTotalLabel = styled.p``;

export const ConfirmedIcon = styled.img``;

export const ProductName = styled.p`
  font-weight: 600;
  font-size: 0.9rem;
`;

export const Units = styled.p`
  color: var(--Red);
  font-weight: 600;
  margin-right: 0.5rem;
`;

export const Price = styled.p`
  color: var(--Rose400);
  margin-right: 0.5rem;
`;

export const Items = styled.div`
  display: flex;
`;

export const Close = styled.button`
  width: 1rem;
  align-self: end;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export const CloseIcon = styled.img``;
