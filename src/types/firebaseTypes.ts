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

export interface ClassificationType {
  user: DocumentReference;
  createdAt: Timestamp;
  finishedAt: Timestamp;
  classifficationData: {
    oocarpa: number;
    tecunumanii: number;
    psegoustrobus: number;
  };
  id: string;
}

export interface ClassificationV2 {
  user: {
    email: string;
    userName: string;
    userType: string;
  };
  createdAt: Timestamp;
  finishedAt: Timestamp;
  classificationData: {
    oocarpa: number;
    tecunumanii: number;
    psegoustrobus: number;
  };
  // id: string;
}

export enum SeedsVarieties {
  OOCARPA = "oocarpa",
  TECUNUMANII = "tecunumanii",
  PSEGOUSTROBUS = "psegoustrobus",
}

export type ClassificationPredictResult = {
  class: SeedsVarieties;
  confidence: number;
};
