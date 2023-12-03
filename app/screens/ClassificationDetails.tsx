import { NavigationProp } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../FirebaseConfig";
import { Camera, CameraCapturedPicture } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import CameraButton, { IconType } from "../components/Button";
import { getSeedClassification } from "../services/classification";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const ClassificationDetails = ({ navigation }: RouterProps) => {
  const [hasPermission, setHasPermission] = React.useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
  const [imageData, setImageData] = useState<CameraCapturedPicture | undefined>(
    undefined
  );
  const [classificationSessionState, setClassificationSessionState] =
    useState<boolean>(false);
  const [currentClassificationSessionId, setCurrentClassificationSessionId] =
    useState<string | null>(null);
  const [classificationDataValues, setClassificationDataValues] = useState({
    tecunumanii: 0,
    oocarpa: 0,
    psegoustrobus: 0,
  });

  const db = FIREBASE_DB;
  const auth = FIREBASE_AUTH;

  const cameraRef = useRef<Camera>(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
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
    if (!currentClassificationSessionId) {
      return alert("Inicia una sesión de clasificación");
    }

    if (cameraRef) {
      try {
        const data = await cameraRef.current?.takePictureAsync();
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
    if (!currentClassificationSessionId) {
      return alert("Inicia una sesión de clasificación");
    }
    try {
      const response = await getSeedClassification(imageData!);
      if (response.status === 200) {
        if (response.data.class === "oocarpa") {
          const sessionRef = doc(
            db,
            "classification_sessions",
            currentClassificationSessionId!
          );
          setClassificationDataValues((prev) => ({
            ...prev,
            oocarpa: prev.oocarpa + 1,
          }));

          await updateDoc(sessionRef, {
            classificationData: classificationDataValues,
          });
          alert("Semilla clasificada como Oocarpa");
        }

        if (response.data.class === "psegoutrobus") {
          const sessionRef = doc(
            db,
            "classification_sessions",
            currentClassificationSessionId!
          );
          setClassificationDataValues((prev) => ({
            ...prev,
            psegoustrobus: prev.psegoustrobus + 1,
          }));

          await updateDoc(sessionRef, {
            classificationData: classificationDataValues,
          });
          alert("Semilla clasificada como Psegoustrobus");
        }

        if (response.data.class === "tecunumanii") {
          const sessionRef = doc(
            db,
            "classification_sessions",
            currentClassificationSessionId!
          );
          setClassificationDataValues((prev) => ({
            ...prev,
            tecunumanii: prev.tecunumanii + 1,
          }));

          await updateDoc(sessionRef, {
            classificationData: classificationDataValues,
          });
          alert("Semilla clasificada como Tecunumanii");
        }
      }
      setImage(null);
      setImageData(undefined);
    } catch (error) {
      console.log({ error });
    }
  };

  const classificationSessionHandler = async () => {
    setClassificationSessionState(!classificationSessionState);

    const classificationCollection = collection(db, "classification_sessions");

    if (classificationSessionState) {
      // create new classification session
      const user = auth?.currentUser?.email;
      const q = query(collection(db, "users"), where("email", "==", user));
      const usersResult = await getDocs(q);

      const userRef = usersResult.docs[0].ref;

      const newSession = await addDoc(classificationCollection, {
        user: userRef,
        classificationData: classificationDataValues,
        createdAt: Timestamp.now(),
        finishedAt: null,
      });

      setCurrentClassificationSessionId(newSession.id);

      alert("Sesión de clasificación iniciada");
      setImage(null);
      setImageData(undefined);
    } else {
      // close current classification session
      const sessionRef = doc(
        db,
        "classification_sessions",
        currentClassificationSessionId!
      );

      await updateDoc(sessionRef, {
        finishedAt: Timestamp.now(),
      });

      setCurrentClassificationSessionId(null);

      alert("Sesión de clasificación terminada");
      setClassificationDataValues({
        tecunumanii: 0,
        oocarpa: 0,
        psegoustrobus: 0,
      });
      setImage(null);
      setImageData(undefined);
    }
  };

  return (
    <ScrollView>
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
              onPress={classificationSessionHandler}
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
          <Text style={styles.textRow}>Tecunumanii:</Text>
          <TextInput
            style={styles.input}
            editable={false}
            value={classificationDataValues.tecunumanii.toString()}
          ></TextInput>
        </View>
        <View style={styles.varietyRow}>
          <Text style={styles.textRow}>Oocarpa:</Text>
          <TextInput
            style={styles.input}
            editable={false}
            value={classificationDataValues.oocarpa.toString()}
          ></TextInput>
        </View>
        <View style={styles.varietyRow}>
          <Text style={styles.textRow}>Psegoustrobus:</Text>
          <TextInput
            style={styles.input}
            editable={false}
            value={classificationDataValues.psegoustrobus.toString()}
          ></TextInput>
        </View>
        <View style={styles.varietyRow}>
          <Text style={styles.textRow}>Desconocido:</Text>
          <TextInput
            style={styles.input}
            editable={false}
            value="0"
          ></TextInput>
        </View>
      </View>
      <Text
        style={{
          color: "blue",
          marginLeft: 25,
          marginTop: 15,
          marginBottom: 10,
        }}
        onPress={() =>
          navigation.navigate("Registro de Proveedores de Semilla")
        }
      >
        Registro de Proveedor de Semilla
      </Text>
    </ScrollView>
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
