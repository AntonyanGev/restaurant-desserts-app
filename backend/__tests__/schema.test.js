const { graphql } = require("graphql");
const schema = require("../schema");

describe("GraphQL Schema", () => {
  it("should be a valid schema", () => {
    expect(schema).toBeDefined();
    expect(schema.getQueryType()).toBeDefined();
    expect(schema.getMutationType()).toBeDefined();
  });

  // --- Query type checks ---

  describe("Query types", () => {
    it("should have getAllDesserts query that returns [Dessert]", () => {
      const queryType = schema.getQueryType();
      const fields = queryType.getFields();

      expect(fields.getAllDesserts).toBeDefined();
      expect(fields.getAllDesserts.type.toString()).toBe("[Dessert]");
    });

    it("should have getDessert query that accepts ID! argument", () => {
      const queryType = schema.getQueryType();
      const fields = queryType.getFields();

      expect(fields.getDessert).toBeDefined();
      const args = fields.getDessert.args;
      const idArg = args.find((a) => a.name === "id");
      expect(idArg).toBeDefined();
      expect(idArg.type.toString()).toBe("ID!");
    });

    it("should have getCart query that returns [CartItem]", () => {
      const queryType = schema.getQueryType();
      const fields = queryType.getFields();

      expect(fields.getCart).toBeDefined();
      expect(fields.getCart.type.toString()).toBe("[CartItem]");
    });
  });

  // --- Mutation type checks ---

  describe("Mutation types", () => {
    it("should have createCartItem mutation", () => {
      const mutationType = schema.getMutationType();
      const fields = mutationType.getFields();

      expect(fields.createCartItem).toBeDefined();
      expect(fields.createCartItem.type.toString()).toBe("CartItem");
    });

    it("should have updateCartItem mutation", () => {
      const mutationType = schema.getMutationType();
      const fields = mutationType.getFields();

      expect(fields.updateCartItem).toBeDefined();
    });

    it("should have deleteCartItem mutation with ID! argument", () => {
      const mutationType = schema.getMutationType();
      const fields = mutationType.getFields();

      expect(fields.deleteCartItem).toBeDefined();
      const idArg = fields.deleteCartItem.args.find((a) => a.name === "id");
      expect(idArg.type.toString()).toBe("ID!");
    });

    it("should have deleteCartData mutation that returns Boolean", () => {
      const mutationType = schema.getMutationType();
      const fields = mutationType.getFields();

      expect(fields.deleteCartData).toBeDefined();
      expect(fields.deleteCartData.type.toString()).toBe("Boolean");
    });
  });

  // --- Dessert type field checks ---

  describe("Dessert type", () => {
    it("should have the expected fields", () => {
      const dessertType = schema.getType("Dessert");
      const fields = dessertType.getFields();

      expect(fields.id).toBeDefined();
      expect(fields.name).toBeDefined();
      expect(fields.price).toBeDefined();
      expect(fields.type).toBeDefined();
      expect(fields.images).toBeDefined();
      expect(fields.images.type.toString()).toBe("Images");
    });
  });

  // --- CartItem type field checks ---

  describe("CartItem type", () => {
    it("should have the expected fields", () => {
      const cartItemType = schema.getType("CartItem");
      const fields = cartItemType.getFields();

      expect(fields.id).toBeDefined();
      expect(fields.name).toBeDefined();
      expect(fields.price).toBeDefined();
      expect(fields.count).toBeDefined();
      expect(fields.totalPrice).toBeDefined();
      expect(fields.image).toBeDefined();
    });
  });

  // --- Introspection query ---

  describe("Introspection", () => {
    it("should respond to an introspection query", async () => {
      const query = `
        {
          __schema {
            queryType { name }
            mutationType { name }
          }
        }
      `;

      const result = await graphql({ schema, source: query });

      expect(result.errors).toBeUndefined();
      expect(result.data.__schema.queryType.name).toBe("Query");
      expect(result.data.__schema.mutationType.name).toBe("Mutation");
    });
  });
});
