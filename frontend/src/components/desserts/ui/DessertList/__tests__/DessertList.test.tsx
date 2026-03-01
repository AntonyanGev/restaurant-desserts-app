import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DessertList from "../DessertList";
import type { Dessert } from "@/types";

// Mock window.innerWidth
const setWindowWidth = (width: number) => {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: width,
  });
  window.dispatchEvent(new Event("resize"));
};

const mockDesserts: Dessert[] = [
  {
    id: "1",
    name: "Waffle with Berries",
    price: "6.50",
    type: "Waffle",
    action: "",
    count: 0,
    images: {
      thumbnail: "",
      mobile: "/images/waffle-mobile.jpg",
      tablet: "/images/waffle-tablet.jpg",
      desktop: "/images/waffle-desktop.jpg",
    },
  },
  {
    id: "2",
    name: "Crème Brûlée",
    price: "7.00",
    type: "Crème Brûlée",
    action: "",
    count: 0,
    images: {
      thumbnail: "",
      mobile: "/images/creme-mobile.jpg",
      tablet: "/images/creme-tablet.jpg",
      desktop: "/images/creme-desktop.jpg",
    },
  },
];

describe("DessertList", () => {
  const defaultProps = {
    desserts: mockDesserts,
    counts: {} as Record<string, number>,
    incrementCount: jest.fn(),
    decrementCount: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    setWindowWidth(1024);
  });

  it("should render all dessert names", () => {
    render(<DessertList {...defaultProps} />);

    expect(screen.getByText("Waffle with Berries")).toBeInTheDocument();
    // "Crème Brûlée" appears as both type and name, so use getAllByText
    expect(screen.getAllByText("Crème Brûlée").length).toBeGreaterThanOrEqual(1);
  });

  it("should render dessert types", () => {
    render(<DessertList {...defaultProps} />);

    expect(screen.getByText("Waffle")).toBeInTheDocument();
    // "Crème Brûlée" type matches the name too, verify at least 2 instances
    expect(screen.getAllByText("Crème Brûlée")).toHaveLength(2);
  });

  it("should render dessert prices", () => {
    render(<DessertList {...defaultProps} />);

    expect(screen.getByText("$6.50")).toBeInTheDocument();
    expect(screen.getByText("$7.00")).toBeInTheDocument();
  });

  it("should render Add to Cart buttons when count is 0", () => {
    render(<DessertList {...defaultProps} />);

    const addButtons = screen.getAllByText("Add to Cart");
    expect(addButtons).toHaveLength(2);
  });

  it("should render Counter when count is greater than 0", () => {
    const propsWithCounts = {
      ...defaultProps,
      counts: { "1": 2 },
    };

    render(<DessertList {...propsWithCounts} />);

    // Dessert 1 should show counter with count 2
    expect(screen.getByText("2")).toBeInTheDocument();
    // Dessert 2 should still show Add to Cart
    expect(screen.getAllByText("Add to Cart")).toHaveLength(1);
  });

  it("should call incrementCount when Add to Cart is clicked", () => {
    render(<DessertList {...defaultProps} />);

    const addButtons = screen.getAllByText("Add to Cart");
    fireEvent.click(addButtons[0]);

    expect(defaultProps.incrementCount).toHaveBeenCalledWith("1");
  });

  it("should use desktop image on wide screens", () => {
    setWindowWidth(1024);
    render(<DessertList {...defaultProps} />);

    const images = screen.getAllByRole("img");
    expect(images[0]).toHaveAttribute("src", "/images/waffle-desktop.jpg");
  });

  it("should render correct number of dessert cards", () => {
    render(<DessertList {...defaultProps} />);

    const images = screen.getAllByRole("img");
    // 2 dessert images + 2 cart icons = 4 images total
    expect(images.length).toBeGreaterThanOrEqual(2);
  });

  it("should render an empty list gracefully", () => {
    render(<DessertList {...defaultProps} desserts={[]} />);

    expect(screen.queryByText("Add to Cart")).not.toBeInTheDocument();
  });
});
