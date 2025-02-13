// src/types/profile.ts

import { Product } from "./product";

export interface IAddress {
    type: 'Home' | 'Office';
    street: string;
    city: string;
    state: string;
    pinCode: string;
    country: string;
  }
  
  export interface IUser {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    gender: "male" | "female" | "other";
    imageUrl: string;
    address: IAddress[];
    isAdmin: boolean;
    cart: Product[];
    wishlist: Product[];
  }
  
  export interface ProfileHeaderProps {
    user: IUser;
    onImageUpload: (file: File) => void;

  }
  
  export interface TabSectionProps {
    user: IUser;
  }
  
  export interface ProfileFormProps {
    user: IUser;
    onSubmit: (data: Partial<IUser>) => Promise<void>;
  }
  
  export interface AddressSectionProps {
    addresses: IAddress[];
    onAddAddress: (address: IAddress) => Promise<void>;
    onUpdateAddress: (index: number, address: IAddress) => Promise<void>;
    onDeleteAddress: (index: number) => Promise<void>;
  }
  
  export interface PasswordChangeData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }
  
  export interface PasswordSectionProps {
    onPasswordChange: (data: PasswordChangeData) => Promise<void>;
  }