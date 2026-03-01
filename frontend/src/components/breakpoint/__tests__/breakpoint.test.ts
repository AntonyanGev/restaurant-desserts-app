import { breakpoints } from "../index";
import { media } from "../mediaQuery";

describe("breakpoints", () => {
  it("should define sm breakpoint as 600", () => {
    expect(breakpoints.sm).toBe(600);
  });

  it("should define md breakpoint as 768", () => {
    expect(breakpoints.md).toBe(768);
  });

  it("should define lg breakpoint as 1024", () => {
    expect(breakpoints.lg).toBe(1024);
  });

  it("should define xl breakpoint as 1280", () => {
    expect(breakpoints.xl).toBe(1280);
  });

  it("should have exactly 4 breakpoints", () => {
    expect(Object.keys(breakpoints)).toHaveLength(4);
  });
});

describe("media helper", () => {
  it("should generate a media query for 'md' breakpoint", () => {
    const result = media("md", "display: flex;");

    expect(result).toContain("@media (min-width: 768px)");
    expect(result).toContain("display: flex;");
  });

  it("should generate a media query for 'sm' breakpoint", () => {
    const result = media("sm", "padding: 1rem;");

    expect(result).toContain("@media (min-width: 600px)");
    expect(result).toContain("padding: 1rem;");
  });

  it("should generate a media query for 'lg' breakpoint", () => {
    const result = media("lg", "font-size: 2rem;");

    expect(result).toContain("@media (min-width: 1024px)");
    expect(result).toContain("font-size: 2rem;");
  });

  it("should generate a media query for 'xl' breakpoint", () => {
    const result = media("xl", "max-width: 1200px;");

    expect(result).toContain("@media (min-width: 1280px)");
    expect(result).toContain("max-width: 1200px;");
  });

  it("should handle multi-line CSS styles", () => {
    const styles = `
      display: flex;
      flex-direction: row;
      gap: 1rem;
    `;
    const result = media("md", styles);

    expect(result).toContain("display: flex;");
    expect(result).toContain("flex-direction: row;");
    expect(result).toContain("gap: 1rem;");
  });
});
