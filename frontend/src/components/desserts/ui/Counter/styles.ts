import styled from "styled-components";

export const CounterWrapper = styled.div`
  font-weight: 600;
  background-color: var(--Red);
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 3.125rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--Rose900);
  font-family: "Red Hat Text", sans-serif;
  position: absolute;
  bottom: 3.8125rem;
  left: 2.5rem;
  height: 2.5rem;
  width: 10rem;
`;

export const CounterButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  margin: 0;
  padding: 0.2rem;
  border: solid 0.0938rem white;
  border-radius: 50%;
  background-color: transparent;
  cursor: pointer;

  svg path {
    fill: #fff;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const Quantity = styled.p`
  margin: 0;
  color: white;
`;
