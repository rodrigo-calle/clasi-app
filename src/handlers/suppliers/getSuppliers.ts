import { getSupplierById, getSuppliers } from "../../services/suppliers";
import { SupplierResponse } from "../../types/suppliers/types";

export const getSuppliersHandler = async (): Promise<SupplierResponse[]> => {
  const suppliers = await getSuppliers();

  return suppliers;
};

export const getSupplierByIdHandler = async (
  supplierId: string
): Promise<SupplierResponse> => {
  const supplier = await getSupplierById(supplierId);

  return supplier;
};
