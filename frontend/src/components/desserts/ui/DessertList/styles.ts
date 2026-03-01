import styled from "styled-components";

export const Card = styled.section`
  width: 15.625rem;
  position: relative;
`;

export const TextWrapper = styled.div`
  margin-top: 0.9375rem;
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 0.625rem;
`;

export const Type = styled.p`
  font-size: 0.8rem;
  color: var(--Rose500);
  margin: 0;
  white-space: nowrap;
`;

export const Name = styled.p`
  font-weight: 600;
  font-size: 0.9rem;
  white-space: nowrap;
`;

export const Price = styled.p`
  color: var(--Red);
  font-weight: 600;
  margin: 0;
  white-space: nowrap;
`;
