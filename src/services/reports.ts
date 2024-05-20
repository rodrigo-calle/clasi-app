import axios from "axios";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const getReports = async (technicalId: string) => {
  try {
    console.log({ technicalId });
    const response = await axios.get(
      `${API_BASE_URL}/reports/download-csv/${technicalId}`,
      {
        responseType: "blob",
      }
    );

    // Crea un nombre de archivo único
    const randomKey = Math.floor(Math.random() * 90000) + 10000;
    const fileName = `classifications_${randomKey}.csv`;
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;

    // Convierte el blob en una cadena de texto base64
    const reader = new FileReader();
    reader.onload = async () => {
      const base64String = reader.result.split(",")[1];

      // Escribe el contenido del archivo descargado en el sistema de archivos del dispositivo
      await FileSystem.writeAsStringAsync(fileUri, base64String, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Usa el módulo de sharing para abrir el diálogo de compartir el archivo descargado
      await Sharing.shareAsync(fileUri);
    };
    reader.readAsDataURL(response.data);
  } catch (error) {
    console.error("Error descargando el archivo CSV: ", error);
  }
};
