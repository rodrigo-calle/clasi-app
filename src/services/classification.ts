import { CameraCapturedPicture } from "expo-camera";
import axios from "axios";
import {
  ClassificationPredictResult,
  // ClassificationType,
  // ClassificationV2,
  // SeedsVarieties,
} from "../types/firebaseTypes";
import {
  ClassificationResponse,
  ClassificationUpdateMethodsKind,
  CreateClassification,
  UpdateClassificationPartial,
} from "../types/classifications/types";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

// Predict Pine Seed
export const getSeedClassification = async (photo: CameraCapturedPicture) => {
  const formData = new FormData();

  formData.append("image", {
    uri: photo.uri,
    name: "image",
    type: "image/jpg",
  });

  const response = await axios.post<ClassificationPredictResult>(
    `${API_BASE_URL}/classifications/predict`,
    formData,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response;
};

// Get Seed Classification bY Id
export const getSeedClassificationById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/classifications/${id}`);

  if (response.status !== 200) {
    return null;
  }

  return response.data as ClassificationResponse;
};

export const updateSeedClassification = async (
  id: string,
  classifcationUpdateKind: ClassificationUpdateMethodsKind,
  classification: UpdateClassificationPartial
) => {
  const response = await axios.patch<ClassificationResponse>(
    `${API_BASE_URL}/classifications/${id}/${classifcationUpdateKind}`,
    classification
  );

  return response;
};

export const createSeedClassification = async (
  classification: CreateClassification
) => {
  const response = await axios.post<ClassificationResponse>(
    `${API_BASE_URL}/classifications`,
    classification
  );

  return response;
};

export const getSeedsClassification = async () => {
  const response = await axios.get(`${API_BASE_URL}/classifications`);
  return response.data as ClassificationResponse[];
};
