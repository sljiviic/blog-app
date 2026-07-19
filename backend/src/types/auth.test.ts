import { describe, expect, it } from "vitest";
import { registerUserSchema } from "./auth";

const validPayload = {
  firstName: "Stefan",
  lastName: "Sljivic",
  email: "stefan@example.com",
  password: "Password1",
  confirmPassword: "Password1",
};

describe("registerUserSchema", () => {
  it("accepts a valid payload", () => {
    expect(registerUserSchema.safeParse(validPayload).success).toBe(true);
  });

  it("rejects a password without a number", () => {
    const result = registerUserSchema.safeParse({
      ...validPayload,
      password: "Password",
      confirmPassword: "Password",
    });

    expect(result.success).toBe(false);
  });

  it("rejects a password shorter than 6 characters", () => {
    const result = registerUserSchema.safeParse({
      ...validPayload,
      password: "Pas1",
      confirmPassword: "Pas1",
    });

    expect(result.success).toBe(false);
  });

  it("rejects when confirmPassword does not match", () => {
    const result = registerUserSchema.safeParse({
      ...validPayload,
      confirmPassword: "Password2",
    });

    expect(result.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const result = registerUserSchema.safeParse({
      ...validPayload,
      email: "not-an-email",
    });

    expect(result.success).toBe(false);
  });
});
