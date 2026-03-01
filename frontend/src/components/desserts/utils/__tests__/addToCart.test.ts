import { addToCart } from "../addToCart";
import type { Dessert, CartItem } from "@/types";

// --- Test Data ---

const mockDessert: Dessert = {
  id: "1",
  name: "Waffle with Berries",
  price: "6.50",
  type: "Waffle",
  action: "",
  count: 0,
  images: {
    thumbnail: "",
    mobile: "",
    tablet: "",
    desktop: "/images/waffle.jpg",
  },
};

const mockExistingCartItem: CartItem = {
  id: "1",
  name: "Waffle with Berries",
  price: "6.50",
  count: 1,
  totalPrice: 6.5,
  image: "/images/waffle.jpg",
};

describe("addToCart", () => {
  let addCartItemMutation: jest.Mock;
  let updateCartItemMutation: jest.Mock;

  beforeEach(() => {
    addCartItemMutation = jest.fn().mockResolvedValue({ data: {} });
    updateCartItemMutation = jest.fn().mockResolvedValue({ data: {} });
  });

  // --- Adding a new item ---

  describe("when adding a new item (not in cart)", () => {
    it("should call addCartItemMutation with the correct variables", async () => {
      const cartItems: CartItem[] = [];

      await addToCart(
        mockDessert,
        1,
        cartItems,
        addCartItemMutation,
        updateCartItemMutation
      );

      expect(addCartItemMutation).toHaveBeenCalledWith({
        variables: {
          input: {
            id: "1",
            name: "Waffle with Berries",
            price: "6.50",
            count: 1,
            totalPrice: 6.5,
            image: "/images/waffle.jpg",
          },
        },
      });
    });

    it("should NOT call updateCartItemMutation", async () => {
      const cartItems: CartItem[] = [];

      await addToCart(
        mockDessert,
        1,
        cartItems,
        addCartItemMutation,
        updateCartItemMutation
      );

      expect(updateCartItemMutation).not.toHaveBeenCalled();
    });

    it("should calculate totalPrice correctly", async () => {
      const cartItems: CartItem[] = [];

      await addToCart(
        mockDessert,
        3,
        cartItems,
        addCartItemMutation,
        updateCartItemMutation
      );

      const callArgs = addCartItemMutation.mock.calls[0][0];
      expect(callArgs.variables.input.totalPrice).toBe(19.5); // 3 * 6.50
      expect(callArgs.variables.input.count).toBe(3);
    });
  });

  // --- Updating an existing item ---

  describe("when updating an existing item (already in cart)", () => {
    it("should call updateCartItemMutation with the correct variables", async () => {
      const cartItems: CartItem[] = [mockExistingCartItem];

      await addToCart(
        mockDessert,
        2,
        cartItems,
        addCartItemMutation,
        updateCartItemMutation
      );

      expect(updateCartItemMutation).toHaveBeenCalledWith({
        variables: {
          id: "1",
          input: {
            count: 2,
            totalPrice: 13.0, // 2 * 6.50
          },
        },
      });
    });

    it("should NOT call addCartItemMutation", async () => {
      const cartItems: CartItem[] = [mockExistingCartItem];

      await addToCart(
        mockDessert,
        2,
        cartItems,
        addCartItemMutation,
        updateCartItemMutation
      );

      expect(addCartItemMutation).not.toHaveBeenCalled();
    });
  });

  // --- Edge cases ---

  describe("edge cases", () => {
    it("should handle price as a string and parse it correctly", async () => {
      const dessertWithStringPrice: Dessert = {
        ...mockDessert,
        price: "12.99",
      };

      await addToCart(
        dessertWithStringPrice,
        2,
        [],
        addCartItemMutation,
        updateCartItemMutation
      );

      const callArgs = addCartItemMutation.mock.calls[0][0];
      expect(callArgs.variables.input.totalPrice).toBeCloseTo(25.98);
    });

    it("should handle count of 1", async () => {
      await addToCart(
        mockDessert,
        1,
        [],
        addCartItemMutation,
        updateCartItemMutation
      );

      const callArgs = addCartItemMutation.mock.calls[0][0];
      expect(callArgs.variables.input.totalPrice).toBe(6.5);
      expect(callArgs.variables.input.count).toBe(1);
    });
  });
});
