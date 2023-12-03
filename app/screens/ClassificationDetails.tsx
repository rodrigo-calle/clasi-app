import { NavigationProp } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { Camera, CameraCapturedPicture } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import CameraButton, { IconType } from "../components/Button";
import { getSeedClassification } from "../services/classification";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const ClassificationDetails = ({ navigation }: RouterProps) => {
  const [hasPermission, setHasPermission] = React.useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
  const [imageData, setImageData] = useState<CameraCapturedPicture | undefined>(
    undefined
  );
  // const [camaraType, setCamaraType] = useState(Camera.Constants.Type.back);
  // const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [classificationSession, setClassificationSession] =
    useState<boolean>(false);
  const cameraRef = useRef<Camera>(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasPermission(cameraStatus.status === "granted");
    })();
  }, []);

  if (hasPermission === false) {
    return (
      <View>
        <Text>Permiso denegado</Text>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current?.takePictureAsync();
        console.log({ data });
        if (data && data.uri) {
          setImageData(data);
          setImage(data.uri);
        }
      } catch (error) {
        console.log({ error });
      }
    }
  };

  const takePictureAgain = async () => {
    setImage(null);
    setImageData(undefined);
  };

  const saveAndContinue = async () => {
    try {
      const response = await getSeedClassification(imageData!);
      if (response.status === 200) {
        alert(
          `Variedad 1: ${response.data.class} \n Probabilidad: ${response.data.confidence} `
        );
      }
      setImage(null);
      setImageData(undefined);
    } catch (error) {
      console.log({ error });
    }
  };

  const classificationHandler = async () => {
    setClassificationSession(!classificationSession);
  };

  return (
    <View>
      <Button
        title="Cerrar Sesión"
        onPress={() => FIREBASE_AUTH.signOut()}
      ></Button>
      <View
        style={{
          height: 400,
          width: "90%",
          backgroundColor: "#fff",
          marginHorizontal: "auto",
          alignSelf: "center",
          marginTop: 20,
        }}
      >
        {!image ? (
          <Camera
            ref={cameraRef}
            style={{
              flex: 1,
              borderRadius: 10,
            }}
            type={Camera.Constants.Type.back}
            flashMode={Camera.Constants.FlashMode.off}
          ></Camera>
        ) : (
          <Image source={{ uri: image }} style={{ flex: 1 }}></Image>
        )}
      </View>
      <View
        style={{
          width: "90%",
          alignSelf: "center",
          marginTop: 4,
          flexDirection: "row",
          gap: 4,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 6,
          }}
        >
          <View style={styles.mediaButtons}>
            <CameraButton
              icon={IconType.check}
              title=""
              color="#000"
              onPress={classificationHandler}
            ></CameraButton>
          </View>
          <View style={styles.mediaButtons}>
            <CameraButton
              icon={IconType.forward}
              title=""
              color="#000"
              onPress={saveAndContinue}
            ></CameraButton>
          </View>
          <View style={styles.mediaButtons}>
            <CameraButton
              icon={IconType.retweet}
              title=""
              color="#000"
              onPress={takePictureAgain}
            ></CameraButton>
          </View>
        </View>
        <View style={styles.mediaButtons}>
          <CameraButton
            icon={IconType.camera}
            title=""
            color="#000"
            onPress={takePicture}
          ></CameraButton>
        </View>
      </View>
      <Text style={styles.subtitle}>Semillas Clasificadas</Text>
      <View
        style={{
          marginTop: 20,
        }}
      >
        <View style={styles.varietyRow}>
          <Text style={styles.textRow}>Variedad 1:</Text>
          <TextInput style={styles.input} value="20"></TextInput>
        </View>
        <View style={styles.varietyRow}>
          <Text style={styles.textRow}>Variedad 2:</Text>
          <TextInput style={styles.input} value="15"></TextInput>
        </View>
        <View style={styles.varietyRow}>
          <Text style={styles.textRow}>Variedad 3:</Text>
          <TextInput style={styles.input} value="0"></TextInput>
        </View>
        <View style={styles.varietyRow}>
          <Text style={styles.textRow}>Desconocido:</Text>
          <TextInput style={styles.input} value="0"></TextInput>
        </View>
      </View>
      <Text
        style={{ color: "blue", marginLeft: 25, marginTop: 15 }}
        onPress={() =>
          navigation.navigate("Registro de Proveedores de Semilla")
        }
      >
        Registro de Proveedor de Semilla
      </Text>
    </View>
  );
};

export default ClassificationDetails;

const styles = StyleSheet.create({
  mediaButtons: {
    width: 35,
    height: 35,
    marginTop: 10,
  },
  previewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  varietyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center",
    alignContent: "center",
    marginTop: 10,
  },
  input: {
    height: 40,
    width: "30%",
    borderWidth: 1,
    padding: 7,
    marginBottom: 10,
  },
  textRow: {
    fontSize: 16,
    marginTop: 7,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "normal",
    marginLeft: 25,
    marginTop: 15,
    width: "90%",
  },
});
