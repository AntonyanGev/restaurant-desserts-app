import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MockedProvider } from "@apollo/client/testing";
import OrderConfirmationModal from "../index";
import { DELETE_CART_DATA } from "@/app/Service/mutation/cart";
import type { CartItem } from "@/types";

const mockCartList: CartItem[] = [
  {
    id: "1",
    name: "Waffle with Berries",
    price: "6.50",
    count: 2,
    totalPrice: 13.0,
    image: "/images/waffle.jpg",
  },
  {
    id: "2",
    name: "Crème Brûlée",
    price: "7.00",
    count: 1,
    totalPrice: 7.0,
    image: "/images/creme.jpg",
  },
];

const mocks = [
  {
    request: { query: DELETE_CART_DATA },
    result: { data: { deleteCartData: true } },
  },
];

const renderModal = (props = {}) => {
  const defaultProps = {
    cartList: mockCartList,
    totalPrice: 20.0,
    onNewOrder: jest.fn(),
    ...props,
  };

  return {
    ...render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <OrderConfirmationModal {...defaultProps} />
      </MockedProvider>
    ),
    props: defaultProps,
  };
};

describe("OrderConfirmationModal", () => {
  it("should render the 'Order Confirmed' heading", () => {
    renderModal();

    expect(screen.getByText("Order Confirmed")).toBeInTheDocument();
  });

  it("should render the enjoy message", () => {
    renderModal();

    expect(
      screen.getByText("We hope you enjoy your food!")
    ).toBeInTheDocument();
  });

  it("should render the confirmed icon", () => {
    renderModal();

    const icon = screen.getByAltText("Order Confirmed");
    expect(icon).toBeInTheDocument();
  });

  it("should render all cart items", () => {
    renderModal();

    expect(screen.getByText("Waffle with Berries")).toBeInTheDocument();
    expect(screen.getByText("Crème Brûlée")).toBeInTheDocument();
  });

  it("should render item counts", () => {
    renderModal();

    expect(screen.getByText("2x")).toBeInTheDocument();
    expect(screen.getByText("1x")).toBeInTheDocument();
  });

  it("should render item prices", () => {
    renderModal();

    expect(screen.getByText("@ $6.50")).toBeInTheDocument();
    expect(screen.getByText("@ $7.00")).toBeInTheDocument();
  });

  it("should render total price", () => {
    renderModal();

    expect(screen.getByText("$20")).toBeInTheDocument();
  });

  it("should render Order Total label", () => {
    renderModal();

    expect(screen.getByText("Order Total")).toBeInTheDocument();
  });

  it("should render the 'Start New Order' button", () => {
    renderModal();

    expect(screen.getByText("Start New Order")).toBeInTheDocument();
  });

  it("should render the close button", () => {
    renderModal();

    const closeButton = screen.getByLabelText("Close");
    expect(closeButton).toBeInTheDocument();
  });

  it("should call onNewOrder when close button is clicked", () => {
    const { props } = renderModal();

    fireEvent.click(screen.getByLabelText("Close"));

    expect(props.onNewOrder).toHaveBeenCalledTimes(1);
  });

  it("should call deleteCartData and onNewOrder when 'Start New Order' is clicked", async () => {
    const { props } = renderModal();

    fireEvent.click(screen.getByText("Start New Order"));

    await waitFor(() => {
      expect(props.onNewOrder).toHaveBeenCalled();
    });
  });

  it("should render dessert thumbnails", () => {
    renderModal();

    const waffleImg = screen.getByAltText("Waffle with Berries");
    expect(waffleImg).toHaveAttribute("src", "/images/waffle.jpg");

    const cremeImg = screen.getByAltText("Crème Brûlée");
    expect(cremeImg).toHaveAttribute("src", "/images/creme.jpg");
  });
});
