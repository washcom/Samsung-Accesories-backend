import { Document, Types } from "mongoose";
import { USER_ROLES } from "../../config/constants";

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isActive: boolean;
  comparePassword(password: string): Promise<boolean>;
}

export interface PublicUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
}
