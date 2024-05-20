import { Timestamp } from "firebase/firestore";
import {
  createSeedClassification,
  getSeedClassificationById,
  getSeedsClassification,
  updateSeedClassification,
} from "../../services/classification";
import { SeedsVarieties } from "../../types/firebaseTypes";
import {
  ClassificationResponse,
  ClassificationUpdateMethodsKind,
} from "../../types/classifications/types";

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
  console.log({ typeClassified, classificationDocId });
  const currentSeedQuantity = await getSeedCurrentQuantityHandler(
    classificationDocId,
    typeClassified
  );
  console.log({ currentSeedQuantity });
  if (currentSeedQuantity == null) {
    return null;
  }

  const seedClassifiedSession = await updateSeedClassification(
    classificationDocId,
    ClassificationUpdateMethodsKind.COUNTER,
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

export const endSeedClassificationSessionHandler = async (id: string) => {
  const seedClassification = await getSeedClassificationById(id);

  if (!seedClassification) {
    return null;
  }

  const seedClassificationSession = await updateSeedClassification(
    id,
    ClassificationUpdateMethodsKind.FINISH,
    {}
  );

  if (seedClassificationSession.status !== 200) {
    return null;
  }

  return seedClassificationSession.data as ClassificationResponse;
};

