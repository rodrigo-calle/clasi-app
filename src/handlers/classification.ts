import { Timestamp } from "firebase/firestore";
import {
  createSeedClassification,
  getSeedClassificationById,
  getSeedsClassification,
  updateSeedClassification,
} from "../services/classification";
import { ClassificationType, SeedsVarieties } from "../types/firebaseTypes";

export const getSeedClassificationByIdHandler = async (id: string) => {
  const seedClassification = await getSeedClassificationById(id);

  return seedClassification;
};

export const getSeedCurrentQuantityHandler = async (
  id: string,
  typeClassified: string
): Promise<{
  oocarpa: number;
  tecunumanii: number;
  psegoustrobus: number;
} | null> => {
  const seedClassification = await getSeedClassificationById(id);

  if (!seedClassification) {
    return null;
  }

  if (typeClassified === SeedsVarieties.OOCARPA) {
    return {
      oocarpa: seedClassification.classificationData.oocarpa + 1,
      tecunumanii: seedClassification.classificationData.tecunumanii,
      psegoustrobus: seedClassification.classificationData.psegoustrobus,
    };
  }
  if (typeClassified === SeedsVarieties.TECUNUMANII) {
    return {
      oocarpa: seedClassification.classificationData.oocarpa,
      tecunumanii: seedClassification.classificationData.tecunumanii + 1,
      psegoustrobus: seedClassification.classificationData.psegoustrobus,
    };
  }

  if (typeClassified === "psegoutrobus") {
    return {
      oocarpa: seedClassification.classificationData.oocarpa,
      tecunumanii: seedClassification.classificationData.tecunumanii,
      psegoustrobus: seedClassification.classificationData.psegoustrobus + 1,
    };
  }

  return null;
};

export const updateSeedCounterHandler = async (
  typeClassified: string,
  classificationDocId: string
): Promise<{
  oocarpa: number;
  tecunumanii: number;
  psegoustrobus: number;
} | null> => {
  const currentSeedQuantity = await getSeedCurrentQuantityHandler(
    classificationDocId,
    typeClassified
  );
  if (currentSeedQuantity == null) {
    return null;
  }

  const seedClassifiedSession = await updateSeedClassification(
    classificationDocId,
    {
      classificationData: {
        oocarpa: currentSeedQuantity.oocarpa,
        tecunumanii: currentSeedQuantity.tecunumanii,
        psegoustrobus: currentSeedQuantity.psegoustrobus,
      },
    }
  );

  return seedClassifiedSession.data.classificationData;
};

export const createSeedClassificationHandler = async (
  classificationData: ClassificationType
) => {
  const seedClassification = await createSeedClassification(classificationData);
  if (seedClassification.status !== 200) {
    return null;
  }

  return seedClassification.data;
};

export const endSeedClassificationSessionHandler = async (id: string) => {
  const seedClassification = await getSeedClassificationById(id);

  if (!seedClassification) {
    return null;
  }

  const seedClassificationSession = await updateSeedClassification(id, {
    finishedAt: Timestamp.now().toMillis(),
  });

  if (seedClassificationSession.status !== 200) {
    return null;
  }

  return seedClassificationSession.data as ClassificationType;
};

export const getClassificationsHandler = async () => {
  const classifications = await getSeedsClassification();
  return classifications;
};
