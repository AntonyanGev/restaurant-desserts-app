import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import InactiveCard from "../index";

describe("InactiveCard", () => {
  it("should render 'Your Cart (0)' text", () => {
    render(<InactiveCard />);

    expect(screen.getByText("Your Cart (0)")).toBeInTheDocument();
  });

  it("should render the empty cart illustration", () => {
    render(<InactiveCard />);

    const image = screen.getByAltText("empty cart");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "images/illustration-empty-cart.svg"
    );
  });

  it("should render the empty message", () => {
    render(<InactiveCard />);

    expect(
      screen.getByText("Your added items will appear here")
    ).toBeInTheDocument();
  });
});
