// Base Classification Interface
export interface Classification {
  businessId: string;
  classificationData: ClassificationData;
  startedAt: number | null; // Timestamp in seconds
  finishedAt: number | null; // Timestamp in seconds
  task: ClassificationTask | null;
  userId: string;
}

export interface ClassificationData { 
  oocarpa: number;
  psegoustrobus: number;
  tecunumanii: number;
}

// Task details for classification
export interface ClassificationTask {
  supplierId: string | null;
  technicalId: string | null;
  seedVarietyRequired: string | null;
  seedsVarietyLimit: number | null;
  totalSeedsLimit: number | null; // Changed to number for consistency
}
// Detailed classification data interface

// Interface for creating a new classification
export interface CreateClassification extends Classification {}

// Response structure for classification, includes additional metadata
export interface ClassificationResponse extends Classification {
  createdAt: number; // Timestamp in seconds
  id: string;
}

// Interface for partially updating a classification
export interface UpdateClassificationPartial extends Partial<Classification> {}

// Enumeration for classification update methods
export enum ClassificationUpdateMethodsKind {
  COUNTER = "counter",
  TASK = "task",
  STATUS = "status",
  START = "start",
  FINISH = "finish",
}
