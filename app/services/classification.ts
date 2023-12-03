import { CameraCapturedPicture } from "expo-camera";
import axios from "axios";

const PREDICT_API_URL = process.env.EXPO_PUBLIC_SEED_CLASSIFICATION_API_URL

export const getSeedClassification = async (photo: CameraCapturedPicture) => {

  const formData = new FormData();

  formData.append("file", {
    uri: photo.uri,
    name: "file",
    type: "image/jpg",
  })

  const response = await axios.post(
    PREDICT_API_URL!,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response;

  
};
