import { createSeedClassification } from "../../services/classification";
import {
  ClassificationResponse,
  CreateClassification,
} from "../../types/classifications/types";

export const createSeedClassificationHandler = async (
  classificationData: CreateClassification
): Promise<ClassificationResponse | null> => {
  const seedClassification = await createSeedClassification(classificationData);
  if (seedClassification.status !== 200) {
    return null;
  }

  return seedClassification.data;
};
