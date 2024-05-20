import { DocumentReference, Timestamp } from "firebase/firestore";

export interface TechnicalInterface {
  technicalEmail: string;
  createdBy: string;
  technicalName: string;
}

export type SupplierInterface = {
  supplierHarvestMethod: string;
  supplierName: string;
  supplierPhone: string;
  supplierSeedOrigin: string;
};

export interface ClassificationV2 {
  user: {
    email: string;
    userName: string;
    userType: string;
  };
  createdAt: number;
  finishedAt: number;
  classificationData: {
    oocarpa: number;
    tecunumanii: number;
    psegoustrobus: number;
  };
  // id?: string;
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
