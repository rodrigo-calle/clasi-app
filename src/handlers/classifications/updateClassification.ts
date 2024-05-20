import { updateSeedClassification } from "../../services/classification";
import {
  ClassificationUpdateMethodsKind,
  UpdateClassificationPartial,
} from "../../types/classifications/types";

export const updateClassification = async (
  updateMethodKind: ClassificationUpdateMethodsKind,
  classificationId: string,
  data: UpdateClassificationPartial
) => {
  if (updateMethodKind === ClassificationUpdateMethodsKind.COUNTER) {
    if (!data.classificationData) {
      return {
        status: 400,
        message: "Bad Request: Missing seed classification data",
      };
    }

    const classificationSeedValues: UpdateClassificationPartial = {
      classificationData: {
        oocarpa: data.classificationData.oocarpa,
        psegoustrobus: data.classificationData.psegoustrobus,
        tecunumanii: data.classificationData.tecunumanii,
      },
    };

    const classificationUpdated = await updateSeedClassification(
      classificationId,
      ClassificationUpdateMethodsKind.COUNTER,
      classificationSeedValues
    );

    return classificationUpdated;
  }

  if (updateMethodKind === ClassificationUpdateMethodsKind.FINISH) {
    const classificationFinished = await updateSeedClassification(
      classificationId,
      ClassificationUpdateMethodsKind.FINISH,
      {}
    );

    return classificationFinished;
  }
};
