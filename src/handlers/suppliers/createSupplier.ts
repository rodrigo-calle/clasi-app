import { createSupplier, getSupplierById, getSuppliers } from "../../services/suppliers";
import { CreateSupplier, SupplierResponse } from "../../types/suppliers/types";

export const createSupplierHandler = async (
  newSupplier: CreateSupplier
): Promise<SupplierResponse> => {
  const supplierId = await createSupplier(newSupplier);

  const supplier = await getSupplierById(supplierId);

  return supplier;
};

