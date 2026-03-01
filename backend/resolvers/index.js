const axios = require("axios");
const { JSON_SERVER_URL } = require("../config");

// --- Data Access Functions ---

const getDesserts = async () => {
  try {
    const { data } = await axios.get(`${JSON_SERVER_URL}/desserts`);
    return data;
  } catch (error) {
    console.error("Error fetching desserts:", error.message);
    return [];
  }
};

const getCart = async () => {
  try {
    const { data } = await axios.get(`${JSON_SERVER_URL}/cart`);
    return data;
  } catch (error) {
    console.error("Error fetching cart:", error.message);
    return [];
  }
};

const createCartItem = async (input) => {
  try {
    const { data } = await axios.post(`${JSON_SERVER_URL}/cart`, input);
    return data;
  } catch (error) {
    console.error("Error creating cart item:", error.message);
    return null;
  }
};

const updateCartItem = async (id, input) => {
  try {
    const { data } = await axios.patch(`${JSON_SERVER_URL}/cart/${id}`, input);
    return data;
  } catch (error) {
    console.error("Error updating cart item:", error.message);
    return null;
  }
};

const deleteCartItem = async (id) => {
  try {
    const { data } = await axios.delete(`${JSON_SERVER_URL}/cart/${id}`);
    return data;
  } catch (error) {
    console.error("Error deleting cart item:", error.message);
    return null;
  }
};

const deleteAllCartItems = async () => {
  try {
    const cartItems = await getCart();
    await Promise.all(
      cartItems.map((item) => axios.delete(`${JSON_SERVER_URL}/cart/${item.id}`))
    );
    return true;
  } catch (error) {
    console.error("Error deleting all cart items:", error.message);
    return false;
  }
};

// --- GraphQL Root Resolvers ---

const root = {
  getAllDesserts: async () => getDesserts(),

  getDessert: async ({ id }) => {
    const desserts = await getDesserts();
    return desserts.find((d) => d.id === id);
  },

  getCart: async () => getCart(),

  createCartItem: async ({ input }) => createCartItem(input),

  updateCartItem: async ({ id, input }) => updateCartItem(id, input),

  deleteCartItem: async ({ id }) => deleteCartItem(id),

  deleteCartData: async () => deleteAllCartItems(),
};

module.exports = root;
