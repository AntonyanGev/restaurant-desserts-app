import { breakpoints } from "./index";

export { breakpoints };

export const media = (key: string, styles: string): string => `
  @media (min-width: ${breakpoints[key]}px) {
    ${styles}
  }
`;
