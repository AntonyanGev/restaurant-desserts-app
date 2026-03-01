describe("Config", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("should use default PORT when env is not set", () => {
    delete process.env.PORT;
    const config = require("../config");

    expect(config.PORT).toBe("5000");
  });

  it("should use PORT from environment variable", () => {
    process.env.PORT = "8080";
    const config = require("../config");

    expect(config.PORT).toBe("8080");
  });

  it("should use default JSON_SERVER_URL when env is not set", () => {
    delete process.env.JSON_SERVER_URL;
    const config = require("../config");

    expect(config.JSON_SERVER_URL).toBe("http://localhost:5001");
  });

  it("should use JSON_SERVER_URL from environment variable", () => {
    process.env.JSON_SERVER_URL = "http://production:3000";
    const config = require("../config");

    expect(config.JSON_SERVER_URL).toBe("http://production:3000");
  });
});
