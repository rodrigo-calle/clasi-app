import React from "react";
import { Timestamp, deleteDoc, doc } from "firebase/firestore";
import { Entypo } from "@expo/vector-icons";

import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FIREBASE_DB } from "../server/FirebaseConfig";
import { HitoricCardProps } from "../types/props";
import { CLASSIFICATION_SESSION_COLLECTION } from "../contants/constants";
import { NavigationProp } from "@react-navigation/native";

interface Props extends HitoricCardProps {
  navigation: NavigationProp<any, any>;
}

const HistoricCard = (props: Props) => {
  const { id, createdAt, finishedAt, navigation } = props;
  const db = FIREBASE_DB;

  const getReadableDuration = (
    createdAt: Timestamp["nanoseconds"],
    finishedAt: Timestamp["nanoseconds"] | null
  ) => {
    if (!finishedAt) {
      return "En progreso";
    }

    const duration = finishedAt - createdAt;
    const minutes = Math.floor(duration / 60000);
    const seconds = ((duration % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds}`;
  };

  const date = new Date(createdAt * 1000).toLocaleString();

  const deleteClassification = async (code: string) => {
    try {
      const classificationRef = doc(
        db,
        CLASSIFICATION_SESSION_COLLECTION,
        code
      );
      await deleteDoc(classificationRef);

      alert("Clasificación eliminada correctamente");
    } catch (error) {
      console.log(error);
    }
  };

  const onPress = () => {
    navigation.navigate("Detalles de Clasificación", {
      id: id,
    });
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.pressable} onPress={onPress}>
        <View>
          <View style={styles.dataContainer}>
            <Text style={styles.label}>Código:</Text>
            <Text>{id}</Text>
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.label}>Fecha Hora:</Text>
            <Text>{date}</Text>
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.label}>Duración:</Text>
            <Text>{getReadableDuration(createdAt, finishedAt)}</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => deleteClassification(id)}
            style={{
              flex: 1,
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <Entypo name="trash" size={26} color="#FF5757" />
          </TouchableOpacity>
        </View>
      </Pressable>
    </View>
  );
};

export default HistoricCard;

const styles = StyleSheet.create({
  container: {
    width: "80%",
    flex: 1,
    alignSelf: "center",
    backgroundColor: "#fff",
  },
  pressable: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    elevation: 2,
    marginBottom: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#689BFF",
  },
  dataContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 6,
  },
  label: {
    color: "#689BFF",
    marginEnd: 4,
  },
});
