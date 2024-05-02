import {
  getSeedClassificationById,
  updateSeedClassification,
} from "../services/classification";
import { SeedsVarieties } from "../types/firebaseTypes";

export const getSeedClassificationByIdHandler = async (id: string) => {
  const seedClassification = await getSeedClassificationById(id);

  return seedClassification;
};

export const getSeedCurrentQuantityHandler = async (
  id: string,
  typeClassified: string
): Promise<number | null> => {
  const seedClassification = await getSeedClassificationById(id);

  if (!seedClassification) {
    return null;
  }

  if (typeClassified === SeedsVarieties.OOCARPA) {
    return seedClassification.classifficationData.oocarpa;
  }
  if (typeClassified === SeedsVarieties.TECUNUMANII) {
    return seedClassification.classifficationData.tecunumanii;
  }
  if (typeClassified === SeedsVarieties.PSEGOUSTROBUS) {
    return seedClassification.classifficationData.psegoustrobus;
  }

  return null;
};

export const updateSeedCounterHandler = async (
  typeClassified: string,
  classificationDocId: string
) => {
  const currentSeedQuantity = await getSeedCurrentQuantityHandler(
    classificationDocId,
    typeClassified
  );

  if (!currentSeedQuantity) {
    return null;
  }

  const seedClassifiedSession = await updateSeedClassification(
    classificationDocId,
    {
      classificationData: {
        [typeClassified]: currentSeedQuantity + 1,
      },
    }
  );

  return seedClassifiedSession;
};
