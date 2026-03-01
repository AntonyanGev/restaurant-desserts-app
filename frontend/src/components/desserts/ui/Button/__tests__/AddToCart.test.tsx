import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddToCart from "../Button";

describe("AddToCart Button", () => {
  const onAddToCart = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the 'Add to Cart' text", () => {
    render(<AddToCart onAddToCart={onAddToCart} />);

    expect(screen.getByText("Add to Cart")).toBeInTheDocument();
  });

  it("should render the cart icon", () => {
    render(<AddToCart onAddToCart={onAddToCart} />);

    const icon = screen.getByAltText("Add to cart");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("src", "images/icon-add-to-cart.svg");
  });

  it("should call onAddToCart when clicked", () => {
    render(<AddToCart onAddToCart={onAddToCart} />);

    fireEvent.click(screen.getByText("Add to Cart"));

    expect(onAddToCart).toHaveBeenCalledTimes(1);
  });

  it("should call onAddToCart multiple times on multiple clicks", () => {
    render(<AddToCart onAddToCart={onAddToCart} />);

    const button = screen.getByText("Add to Cart");
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    expect(onAddToCart).toHaveBeenCalledTimes(3);
  });
});
