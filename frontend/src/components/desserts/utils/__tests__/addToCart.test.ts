import { buildCartItems } from "../addToCart";
import type { Dessert } from "@/types";

// --- Test Data ---

const mockDesserts: Dessert[] = [
  {
    id: "1",
    name: "Waffle with Berries",
    price: "6.50",
    type: "Waffle",
    action: "",
    count: 0,
    images: {
      thumbnail: "/images/waffle-thumb.jpg",
      mobile: "/images/waffle-mobile.jpg",
      tablet: "/images/waffle-tablet.jpg",
      desktop: "/images/waffle.jpg",
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
      thumbnail: "/images/creme-thumb.jpg",
      mobile: "/images/creme-mobile.jpg",
      tablet: "/images/creme-tablet.jpg",
      desktop: "/images/creme.jpg",
    },
  },
  {
    id: "3",
    name: "Macaron Mix of Five",
    price: "8.00",
    type: "Macaron",
    action: "",
    count: 0,
    images: {
      thumbnail: "/images/macaron-thumb.jpg",
      mobile: "/images/macaron-mobile.jpg",
      tablet: "/images/macaron-tablet.jpg",
      desktop: "/images/macaron.jpg",
    },
  },
];

describe("buildCartItems", () => {
  it("should return an empty array when no counts are set", () => {
    const result = buildCartItems(mockDesserts, {});

    expect(result).toEqual([]);
  });

  it("should return only desserts with count > 0", () => {
    const counts = { "1": 2, "3": 1 };

    const result = buildCartItems(mockDesserts, counts);

    expect(result).toHaveLength(2);
    expect(result[0].name).toBe("Waffle with Berries");
    expect(result[1].name).toBe("Macaron Mix of Five");
  });

  it("should exclude items with count of 0", () => {
    const counts = { "1": 0, "2": 1 };

    const result = buildCartItems(mockDesserts, counts);

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Crème Brûlée");
  });

  it("should calculate totalPrice correctly", () => {
    const counts = { "1": 3 };

    const result = buildCartItems(mockDesserts, counts);

    expect(result[0].totalPrice).toBe(19.5); // 3 * 6.50
    expect(result[0].count).toBe(3);
  });

  it("should use the thumbnail image for cart items", () => {
    const counts = { "1": 1 };

    const result = buildCartItems(mockDesserts, counts);

    expect(result[0].image).toBe("/images/waffle-thumb.jpg");
  });

  it("should handle multiple items with correct totals", () => {
    const counts = { "1": 2, "2": 1, "3": 4 };

    const result = buildCartItems(mockDesserts, counts);

    expect(result).toHaveLength(3);
    expect(result[0].totalPrice).toBe(13.0); // 2 * 6.50
    expect(result[1].totalPrice).toBe(7.0); // 1 * 7.00
    expect(result[2].totalPrice).toBe(32.0); // 4 * 8.00
  });

  it("should return correct cart item shape", () => {
    const counts = { "1": 1 };

    const result = buildCartItems(mockDesserts, counts);

    expect(result[0]).toEqual({
      id: "1",
      name: "Waffle with Berries",
      price: "6.50",
      count: 1,
      totalPrice: 6.5,
      image: "/images/waffle-thumb.jpg",
    });
  });

  it("should handle price as a string and parse it correctly", () => {
    const desserts: Dessert[] = [
      {
        ...mockDesserts[0],
        price: "12.99",
      },
    ];
    const counts = { "1": 2 };

    const result = buildCartItems(desserts, counts);

    expect(result[0].totalPrice).toBeCloseTo(25.98);
  });

  it("should return an empty array when desserts list is empty", () => {
    const counts = { "1": 1 };

    const result = buildCartItems([], counts);

    expect(result).toEqual([]);
  });
});
