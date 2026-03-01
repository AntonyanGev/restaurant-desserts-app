import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Counter from "../Counter";

describe("Counter", () => {
  const defaultProps = {
    count: 1,
    incrementCount: jest.fn(),
    decrementCount: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the count value", () => {
    render(<Counter {...defaultProps} />);

    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("should render increment and decrement buttons", () => {
    render(<Counter {...defaultProps} />);

    expect(screen.getByLabelText("Decrease quantity")).toBeInTheDocument();
    expect(screen.getByLabelText("Increase quantity")).toBeInTheDocument();
  });

  it("should call incrementCount when the + button is clicked", () => {
    render(<Counter {...defaultProps} />);

    fireEvent.click(screen.getByLabelText("Increase quantity"));

    expect(defaultProps.incrementCount).toHaveBeenCalledTimes(1);
  });

  it("should call decrementCount when the - button is clicked", () => {
    render(<Counter {...defaultProps} />);

    fireEvent.click(screen.getByLabelText("Decrease quantity"));

    expect(defaultProps.decrementCount).toHaveBeenCalledTimes(1);
  });

  it("should display updated count when prop changes", () => {
    const { rerender } = render(<Counter {...defaultProps} count={1} />);
    expect(screen.getByText("1")).toBeInTheDocument();

    rerender(<Counter {...defaultProps} count={5} />);
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("should render SVG icons inside the buttons", () => {
    render(<Counter {...defaultProps} />);

    const svgs = document.querySelectorAll("svg");
    expect(svgs).toHaveLength(2);
  });
});
