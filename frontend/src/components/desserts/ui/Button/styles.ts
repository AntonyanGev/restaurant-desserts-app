import styled from "styled-components";

export const CartIcon = styled.img``;

export const AddToCartButton = styled.button`
  font-weight: 600;
  background-color: white;
  border: solid 0.0625rem var(--Rose500);
  padding: 0.5rem 1.5rem;
  border-radius: 3.125rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--Rose900);
  font-family: "Red Hat Text", sans-serif;
  position: absolute;
  bottom: 3.8125rem;
  left: 2.5rem;
  height: 2.5rem;
  width: 10rem;
  cursor: pointer;

  &:hover {
    color: var(--Red);
    border: solid 0.0625rem var(--Red);
  }
`;
