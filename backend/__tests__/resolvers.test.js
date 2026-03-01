const axios = require("axios");

// Mock axios before requiring the module under test
jest.mock("axios");

// Mock config to avoid dotenv dependency in tests
jest.mock("../config", () => ({
  JSON_SERVER_URL: "http://localhost:5001",
}));

const root = require("../resolvers");

// --- Test Data ---

const mockDesserts = [
  {
    id: "1",
    name: "Waffle with Berries",
    price: "6.50",
    type: "Waffle",
    images: { desktop: "/images/waffle.jpg" },
  },
  {
    id: "2",
    name: "Crème Brûlée",
    price: "7.00",
    type: "Crème Brûlée",
    images: { desktop: "/images/creme.jpg" },
  },
];

const mockCartItems = [
  { id: "1", name: "Waffle with Berries", price: "6.50", count: 2, totalPrice: 13.0 },
  { id: "2", name: "Crème Brûlée", price: "7.00", count: 1, totalPrice: 7.0 },
];

beforeEach(() => {
  jest.clearAllMocks();
});

// --- getAllDesserts ---

describe("getAllDesserts", () => {
  it("should return all desserts from the JSON server", async () => {
    axios.get.mockResolvedValue({ data: mockDesserts });

    const result = await root.getAllDesserts();

    expect(axios.get).toHaveBeenCalledWith("http://localhost:5001/desserts");
    expect(result).toEqual(mockDesserts);
    expect(result).toHaveLength(2);
  });

  it("should return an empty array when the API call fails", async () => {
    axios.get.mockRejectedValue(new Error("Network error"));

    const result = await root.getAllDesserts();

    expect(result).toEqual([]);
  });
});

// --- getDessert ---

describe("getDessert", () => {
  it("should return a specific dessert by ID", async () => {
    axios.get.mockResolvedValue({ data: mockDesserts });

    const result = await root.getDessert({ id: "1" });

    expect(result).toEqual(mockDesserts[0]);
    expect(result.name).toBe("Waffle with Berries");
  });

  it("should return undefined for a non-existent ID", async () => {
    axios.get.mockResolvedValue({ data: mockDesserts });

    const result = await root.getDessert({ id: "999" });

    expect(result).toBeUndefined();
  });

  it("should return undefined when the API fails", async () => {
    axios.get.mockRejectedValue(new Error("Network error"));

    const result = await root.getDessert({ id: "1" });

    // getDesserts returns [] on error, find on [] returns undefined
    expect(result).toBeUndefined();
  });
});

// --- getCart ---

describe("getCart", () => {
  it("should return all cart items", async () => {
    axios.get.mockResolvedValue({ data: mockCartItems });

    const result = await root.getCart();

    expect(axios.get).toHaveBeenCalledWith("http://localhost:5001/cart");
    expect(result).toEqual(mockCartItems);
    expect(result).toHaveLength(2);
  });

  it("should return an empty array when the API call fails", async () => {
    axios.get.mockRejectedValue(new Error("Network error"));

    const result = await root.getCart();

    expect(result).toEqual([]);
  });
});

// --- createCartItem ---

describe("createCartItem", () => {
  const newItem = {
    id: "3",
    name: "Macaron",
    price: "8.00",
    count: 1,
    totalPrice: 8.0,
  };

  it("should create a new cart item and return it", async () => {
    axios.post.mockResolvedValue({ data: newItem });

    const result = await root.createCartItem({ input: newItem });

    expect(axios.post).toHaveBeenCalledWith("http://localhost:5001/cart", newItem);
    expect(result).toEqual(newItem);
  });

  it("should return null when creation fails", async () => {
    axios.post.mockRejectedValue(new Error("Server error"));

    const result = await root.createCartItem({ input: newItem });

    expect(result).toBeNull();
  });
});

// --- updateCartItem ---

describe("updateCartItem", () => {
  const updateData = { count: 3, totalPrice: 19.5 };

  it("should update a cart item and return the updated data", async () => {
    const updatedItem = { ...mockCartItems[0], ...updateData };
    axios.patch.mockResolvedValue({ data: updatedItem });

    const result = await root.updateCartItem({ id: "1", input: updateData });

    expect(axios.patch).toHaveBeenCalledWith(
      "http://localhost:5001/cart/1",
      updateData
    );
    expect(result.count).toBe(3);
    expect(result.totalPrice).toBe(19.5);
  });

  it("should return null when the update fails", async () => {
    axios.patch.mockRejectedValue(new Error("Not found"));

    const result = await root.updateCartItem({ id: "999", input: updateData });

    expect(result).toBeNull();
  });
});

// --- deleteCartItem ---

describe("deleteCartItem", () => {
  it("should delete a cart item and return the response", async () => {
    axios.delete.mockResolvedValue({ data: mockCartItems[0] });

    const result = await root.deleteCartItem({ id: "1" });

    expect(axios.delete).toHaveBeenCalledWith("http://localhost:5001/cart/1");
    expect(result).toEqual(mockCartItems[0]);
  });

  it("should return null when deletion fails", async () => {
    axios.delete.mockRejectedValue(new Error("Not found"));

    const result = await root.deleteCartItem({ id: "999" });

    expect(result).toBeNull();
  });
});

// --- deleteCartData (delete all) ---

describe("deleteCartData", () => {
  it("should delete all cart items and return true", async () => {
    axios.get.mockResolvedValue({ data: mockCartItems });
    axios.delete.mockResolvedValue({ data: {} });

    const result = await root.deleteCartData();

    expect(axios.get).toHaveBeenCalledWith("http://localhost:5001/cart");
    expect(axios.delete).toHaveBeenCalledTimes(2);
    expect(axios.delete).toHaveBeenCalledWith("http://localhost:5001/cart/1");
    expect(axios.delete).toHaveBeenCalledWith("http://localhost:5001/cart/2");
    expect(result).toBe(true);
  });

  it("should return true when cart is already empty", async () => {
    axios.get.mockResolvedValue({ data: [] });

    const result = await root.deleteCartData();

    expect(axios.delete).not.toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it("should return false when a delete request fails", async () => {
    axios.get.mockResolvedValue({ data: mockCartItems });
    axios.delete.mockRejectedValue(new Error("Delete failed"));

    const result = await root.deleteCartData();

    expect(result).toBe(false);
  });

  it("should return empty array (from getCart) when fetching cart fails during delete", async () => {
    axios.get.mockRejectedValue(new Error("Network error"));

    // getCart returns [] on error, so Promise.all([]) resolves and returns true
    const result = await root.deleteCartData();

    expect(result).toBe(true);
  });
});
