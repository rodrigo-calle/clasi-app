import { CameraCapturedPicture } from "expo-camera";
import axios from "axios";
import {
  ClassificationPredictResult,
  ClassificationType,
  ClassificationV2,
  SeedsVarieties,
} from "../types/firebaseTypes";

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

  return response.data as ClassificationType;
};

export const updateSeedClassification = async (
  id: string,
  classification:
    | Partial<ClassificationV2>
    | { classificationData: { [key: string]: number } }
) => {
  const response = await axios.put(
    `${API_BASE_URL}/classifications/${id}`,
    classification
  );

  return response;
};
