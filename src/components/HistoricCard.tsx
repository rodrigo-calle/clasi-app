import React from "react";
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
import { deleteClassificationService } from "../services/classification";
import { timeConverter } from "../utils/readableTimestamp";

interface Props extends HitoricCardProps {
  navigation: NavigationProp<any, any>;
}

const HistoricCard = (props: Props) => {
  const { id, createdAt, finishedAt, navigation, startedAt } = props;

  console.log(timeConverter(0));

  const deleteClassification = async (code: string) => {
    try {
      await deleteClassificationService(code);

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

  // const createdAtConverted = timeConverter(createdAt);
  const finishAtConverted =
    finishedAt === 0 ? "En curso" : timeConverter(finishedAt);
  const startedConverted = timeConverter(startedAt);
  console.log(createdAt);

  if (finishedAt === 0 && startedAt === 0) {
    return;
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.pressable}
        onPress={onPress}
        testID="card-pressable"
      >
        <View>
          <View style={styles.dataContainer}>
            <Text style={styles.label}>Código:</Text>
            <Text>{id}</Text>
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.label}>Fecha Inicio:</Text>
            <Text>{startedConverted}</Text>
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.label}>Fecha Fin:</Text>
            <Text>{finishAtConverted}</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            testID="delete-button"
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
