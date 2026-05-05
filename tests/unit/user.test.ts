import { toPublicUser } from "../../src/modules/users/user.service";
import { USER_ROLES } from "../../src/config/constants";

describe("user service", () => {
  it("maps a user document to a public user", () => {
    const user = {
      _id: { toString: () => "user-id" },
      name: "Ada",
      email: "ada@example.com",
      role: USER_ROLES.CUSTOMER,
      isActive: true
    };

    expect(toPublicUser(user as never)).toEqual({
      id: "user-id",
      name: "Ada",
      email: "ada@example.com",
      role: USER_ROLES.CUSTOMER,
      isActive: true
    });
  });
});
