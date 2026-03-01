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

const confirmOrder = async (items) => {
  try {
    const results = await Promise.all(
      items.map((item) => axios.post(`${JSON_SERVER_URL}/cart`, item))
    );
    return results.map((res) => res.data);
  } catch (error) {
    console.error("Error confirming order:", error.message);
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

  confirmOrder: async ({ items }) => confirmOrder(items),

  deleteCartData: async () => deleteAllCartItems(),
};

module.exports = root;
