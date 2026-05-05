import request from "supertest";
import { createApp } from "../../src/app";

describe("order routes", () => {
  it("requires authentication before creating orders", async () => {
    const response = await request(createApp()).post("/api/v1/orders").send({});

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });
});
