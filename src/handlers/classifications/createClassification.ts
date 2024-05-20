import { createSeedClassification } from "../../services/classification";
import {
  ClassificationResponse,
  CreateClassification,
} from "../../types/classifications/types";

export const createSeedClassificationHandler = async (
  classificationData: CreateClassification
): Promise<ClassificationResponse | null> => {
  console.log({ classificationData });
  const seedClassification = await createSeedClassification(classificationData);
  if (seedClassification.status !== 200) {
    return null;
  }

  return seedClassification.data;
};
