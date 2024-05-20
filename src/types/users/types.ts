export interface User {
  businessId: string;
  email: string;
  name: string;
  role: string;
  phone: string | null;
  createdBy: string | null;
  createdAt: number;
}

export type CreateProductionAdministratorUser = Omit<
  User,
  "role" | "createdBy" | "businessId" | "createdAt"
>;
export type CreateTechnicalUser = Omit<
  User,
  "role" | "createdBy" | "businessId" | "createdAt"
>;

export interface UserResponse extends User {
  createdAt: number;
  id: string;
}
