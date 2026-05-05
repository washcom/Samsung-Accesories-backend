import request from "supertest";
import { createApp } from "../../src/app";

describe("auth routes", () => {
  it("validates registration payloads", async () => {
    const response = await request(createApp())
      .post("/api/v1/auth/register")
      .send({ email: "bad-email", password: "123" });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });
});
