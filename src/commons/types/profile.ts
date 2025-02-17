// src/types/profile.ts

import { Product } from "./product";

export interface IAddress {
  city: string;
  state: string;
  pinCode: string;
  _id: string;
  addressLine: string;
}

export type Gender = "male" | "female" | "other";

export interface IUser {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: Gender;
  imageUrl: string;
  address: IAddress[];
  isAdmin: boolean;
  cart: Product[];
  wishlist: Product[];
}

export interface ProfileHeaderProps {
  user: IUser;
}

export interface TabSectionProps {
  user: IUser;
}

export interface ProfileFormProps {
  user: IUser;
}

export interface AddressSectionProps {
  addresses: IAddress[];
  onUpdateAddress: (index: number, address: IAddress) => Promise<void>;
  onDeleteAddress: (index: number) => Promise<void>;
  user: IUser;
}

export interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface PasswordSectionProps {
  onPasswordChange: (data: PasswordChangeData) => Promise<void>;
}
