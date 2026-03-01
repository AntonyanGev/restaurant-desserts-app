const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Images {
    thumbnail: String
    mobile: String
    tablet: String
    desktop: String
  }

  type Dessert {
    id: ID
    name: String
    price: String
    type: String
    action: String
    count: Int
    images: Images
  }

  type CartItem {
    id: ID
    name: String
    price: String
    count: Int
    totalPrice: Float
    image: String
  }

  input CartInput {
    id: ID
    name: String
    price: String
    count: Int
    totalPrice: Float
    image: String
  }

  type Query {
    getAllDesserts: [Dessert]
    getDessert(id: ID!): Dessert
    getCart: [CartItem]
  }

  type Mutation {
    createCartItem(input: CartInput): CartItem
    updateCartItem(id: ID, input: CartInput): CartItem
    deleteCartItem(id: ID!): CartItem
    deleteCartData: Boolean
  }
`);

module.exports = schema;
