export type UserRole = 'patient' | 'doctor';

export interface UserModel {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  createdAt: string;
}
