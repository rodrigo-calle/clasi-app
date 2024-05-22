import React, { useEffect, useState } from "react";
import { ScrollView, Text, StyleSheet, Button } from "react-native";
import HistoricCard from "../components/HistoricCard";
import Loading from "../components/Loading";
import { ClassificationResponse } from "../types/classifications/types";
import { getClassificationsHandler } from "../handlers/classifications/getClassification";
import { Picker } from "@react-native-picker/picker";
import { getTechnicalUsersHandler } from "../handlers/users/getUsers";
import { UserResponse } from "../types/users/types";
import { getReports } from "../services/reports";
import { NavigationProp } from "@react-navigation/native";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const HistoricClassification = ({ navigation }: RouterProps) => {
  const [openLoader, setOpenLoader] = useState<boolean>(false);
  const [classificationList, setClassificationList] = useState<
    ClassificationResponse[]
  >([]);
  const [technicalSelected, setTechnicalSelected] = useState<string>("");
  const [technicals, setTechnicals] = useState<UserResponse[]>([]);
  const [classificationListFiltered, setClassificationListFiltered] = useState<
    ClassificationResponse[]
  >([]);

  const getClassificationListByUser = async () => {
    try {
      setOpenLoader(true);
      const classificationsSessions = await getClassificationsHandler();

      setClassificationList(classificationsSessions);
      setOpenLoader(false);
    } catch (error) {
      alert(error);
      setOpenLoader(false);
    }
  };

  const getTechnicalUsers = async () => {
    try {
      setOpenLoader(true);
      const technicals = await getTechnicalUsersHandler("vivero-santo-domingo");
      setTechnicals(technicals);
      setOpenLoader(false);
    } catch (error) {
      alert(error);
      setOpenLoader(false);
    }
  };

  const filterHandle = (technicalId: string) => {
    if (technicalId === "Todos") {
      setClassificationListFiltered(classificationList);
    } else {
      const filtered = classificationList.filter(
        (classification) => classification.task?.technicalId === technicalId
      );

      setClassificationListFiltered(filtered);
    }
  };

  useEffect(() => {
    getClassificationListByUser();
    getTechnicalUsers();
  }, []);

  useEffect(() => {
    if (!technicalSelected) {
      filterHandle("Todos");
    }
  }, [technicals]);

  const getReport = async () => {
    try {
      setOpenLoader(true);
      await getReports(technicalSelected);
      setOpenLoader(false);
    } catch (error) {
      alert(error);
      setOpenLoader(false);
    }
  };

  return (
    <ScrollView
      scrollEnabled={true}
      style={{
        backgroundColor: openLoader ? "rgba(0,0,0,0.5)" : "white",
      }}
    >
      <Loading open={openLoader} text="Cargando..." />
      <Text
        style={{
          fontSize: 26,
          fontWeight: "bold",
          marginBottom: 20,
          alignSelf: "center",
          width: "80%",
        }}
      >
        Historial
      </Text>
      <Picker
        onValueChange={(itemValue: string) => {
          filterHandle(itemValue);
          setTechnicalSelected(itemValue);
        }}
        placeholder="Seleccionar técnico..."
        style={styles.picker}
        selectedValue={technicalSelected}
      >
        <Picker.Item key={"todos"} label={"Todos"} value={"Todos"} />
        {technicals?.map((technical, index) => {
          return (
            <Picker.Item
              key={index}
              label={technical.name}
              value={technical.id}
            />
          );
        })}
      </Picker>
      {technicalSelected !== "Todos" && (
        <Button
          title="Generar Reporte"
          color={"#689BFF"}
          onPress={() => getReport()}
        ></Button>
      )}
      {classificationListFiltered.length > 0 ? (
        classificationListFiltered.map((classification) => {
          return (
            <HistoricCard
              navigation={navigation}
              key={classification.id}
              id={classification.id}
              createdAt={classification.createdAt}
              finishedAt={
                !classification.finishedAt ? null : classification.finishedAt
              }
            />
          );
        })
      ) : !openLoader ? (
        <Text>No hay clasificaciones registradas</Text>
      ) : null}
    </ScrollView>
  );
};

export default HistoricClassification;

const styles = StyleSheet.create({
  picker: {
    flex: 1,
    alignSelf: "center",
    marginBottom: 10,
    height: 50,
    width: 350,
    borderWidth: 2,
    backgroundColor: "#fff",
    padding: 10,
    borderColor: "#689BFF",
    elevation: 2,
  },
});
