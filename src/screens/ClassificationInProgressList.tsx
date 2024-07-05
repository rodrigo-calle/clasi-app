import React, { useEffect, useState } from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import Loading from "../components/Loading";
import { ClassificationResponse } from "../types/classifications/types";
import { getClassificationsHandler } from "../handlers/classifications/getClassification";
import { NavigationProp } from "@react-navigation/native";
import ClassificationInProgressCard from "../components/ClassificationInProgressCard";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const ClassificationInProgressList = ({ navigation }: RouterProps) => {
  const [openLoader, setOpenLoader] = useState<boolean>(false);
  const [classificationList, setClassificationList] = useState<
    ClassificationResponse[]
  >([]);

  const getClassificationList = async () => {
    try {
      setOpenLoader(true);
      const classificationsSessions = await getClassificationsHandler();
      const filtered = classificationsSessions.filter(
        (classification) =>
          typeof classification.startedAt === "string" &&
          classification.startedAt !== "No started" &&
          typeof classification.finishedAt === "string" &&
          classification.finishedAt === "In progress"
      );
      setClassificationList(classificationsSessions);
      setOpenLoader(false);
    } catch (error) {
      alert(error);
      setOpenLoader(false);
    }
  };

  useEffect(() => {
    getClassificationList();
  }, []);

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
        Sesiones de Clasificación en Curso
      </Text>
      {classificationList.length > 0 ? (
        classificationList.map((classification) => {
          return (
            <ClassificationInProgressCard
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

export default ClassificationInProgressList;

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
