import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../../config/env";
import { User } from "../users/user.model";
import { PublicUser } from "../users/user.types";
import { toPublicUser } from "../users/user.service";

interface AuthResult {
  user: PublicUser;
  token: string;
}

const signToken = (userId: string): string => {
  const options: SignOptions = {
    expiresIn: env.jwtExpiresIn as SignOptions["expiresIn"]
  };

  return jwt.sign({ sub: userId }, env.jwtSecret, options);
};

export const register = async (
  name: string,
  email: string,
  password: string
): Promise<AuthResult> => {
  const user = await User.create({ name, email, password });

  return {
    user: toPublicUser(user),
    token: signToken(user._id.toString())
  };
};

export const login = async (email: string, password: string): Promise<AuthResult | null> => {
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    return null;
  }

  return {
    user: toPublicUser(user),
    token: signToken(user._id.toString())
  };
};
