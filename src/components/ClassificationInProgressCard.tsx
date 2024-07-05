import React from "react";
import { Timestamp } from "firebase/firestore";
import { Entypo } from "@expo/vector-icons";

import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { HitoricCardProps } from "../types/props";
import { NavigationProp } from "@react-navigation/native";

interface Props extends HitoricCardProps {
  navigation: NavigationProp<any, any>;
}

const ClassificationInProgressCard = (props: Props) => {
  const { id, createdAt, finishedAt, navigation } = props;

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

  const onPressHandle = async (code: string) => {
    console.log("code", code);
    navigation.navigate("Sesión de Clasificación de Semilla", {
      id: code,
    });
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.pressable}
        // onPress={onPress}
        testID="card-pressable"
      >
        <View>
          <View style={styles.dataContainer}>
            <Text style={styles.label}>Código:</Text>
            <Text>{id}</Text>
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.label}>Fecha Hora:</Text>
            <Text>
              {createdAt.slice(5, 17)} - {createdAt.slice(17, 25)}
            </Text>
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.label}>Duración:</Text>
            <Text>{"EN CURSO"}</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            testID="start-classify-button"
            onPress={() => onPressHandle(id)}
            style={{
              flex: 1,
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <Entypo name="tools" size={26} color="#000" />
          </TouchableOpacity>
        </View>
      </Pressable>
    </View>
  );
};

export default ClassificationInProgressCard;

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
