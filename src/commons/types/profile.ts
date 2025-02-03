// src/types/profile.ts

export interface IAddress {
    type: 'Home' | 'Office';
    street: string;
    city: string;
    state: string;
    pinCode: string;
    country: string;
  }
  
  export interface IUser {
    name: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    gender: 'male' | 'female' | 'other';
    imageUrl?: string;
    addresses: IAddress[];
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