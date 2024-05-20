interface Supplier {
  businessId: string;
  createdBy: string; // userId
  harvestMethod: string;
  name: string;
  phone: string;
  seedOrigin: string;
  email: string;
  address: string;
  createdAt: number; // now is registered in the service
}

export type CreateSupplier = Omit<Supplier, "createdBy" | "businessId" | "createdAt">;

export interface SupplierResponse extends Supplier {
  createdAt: number;
  id: string;
}
