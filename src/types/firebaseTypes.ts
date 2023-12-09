import { DocumentReference, Timestamp } from "firebase/firestore";

export interface TechnicalInterface {
  technicalEmail: string;
  createdBy: string;
  technicalName: string;
}

export interface TaskInterface {
  taskNote: string | null;
  technicalReference: DocumentReference | null;
  createdAt: Timestamp;
  createdBy: DocumentReference;
  providerReference: DocumentReference | null;
}

export type TaskFormData = {
  thecnical: string;
  provider: string;
  taskNote: string;
};

export type SupplierInterface = {
  supplierHarvestMethod: string;
  supplierName: string;
  supplierPhone: string;
  supplierSeedOrigin: string;
};
