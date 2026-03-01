import styled from "styled-components";
import { media } from "../breakpoint/mediaQuery";

export const Section = styled.section`
  display: flex;
  flex-direction: column;

  ${media("md", "flex-direction: row;")}
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Loader = styled.div`
  padding: 2rem;
  font-size: 1.2rem;
  color: var(--Rose500);
`;

export const Main = styled.section`
  display: block;
  gap: 1rem;
  margin: auto;

  ${media(
    "md",
    `
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
  `
  )}
`;

export const H1 = styled.h1`
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  font-weight: bold;
`;
