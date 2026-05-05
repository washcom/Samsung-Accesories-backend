import { FilterQuery } from "mongoose";
import { User } from "./user.model";
import { IUser, PublicUser } from "./user.types";

export const toPublicUser = (user: IUser): PublicUser => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
  role: user.role,
  isActive: user.isActive
});

export const createUser = async (payload: Partial<IUser>): Promise<PublicUser> => {
  const user = await User.create(payload);
  return toPublicUser(user);
};

export const findUsers = async (filter: FilterQuery<IUser> = {}) => {
  const users = await User.find(filter).sort({ createdAt: -1 });
  return users.map(toPublicUser);
};

export const findUserById = async (id: string): Promise<PublicUser | null> => {
  const user = await User.findById(id);
  return user ? toPublicUser(user) : null;
};

export const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<PublicUser | null> => {
  const user = await User.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
  return user ? toPublicUser(user) : null;
};

export const deleteUser = async (id: string): Promise<boolean> => {
  const result = await User.findByIdAndDelete(id);
  return Boolean(result);
};
