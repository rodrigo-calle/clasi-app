import React from "react";
import { NavigationProp } from "@react-navigation/native";
import { ClassificationResponse } from "../types/classifications/types";
import { useEffect, useState } from "react";
import { getClassificationsHandler } from "../handlers/classifications/getClassification";
import { getCurrentUser } from "../services/session";
import { getUserByEmail } from "../services/users";
import { ScrollView, Text, StyleSheet } from "react-native";
import Loading from "../components/Loading";
import ClassificationInProgressCard from "../components/ClassificationInProgressCard";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}
const ClassificationByTech = ({ navigation }: RouterProps) => {
  const [openLoader, setOpenLoader] = useState<boolean>(false);
  const [currentTech, setCurrentTech] = useState<string>("");

  const [classificationList, setClassificationList] = useState<
    ClassificationResponse[]
  >([]);

  const getClassificationList = async () => {
    try {
      setOpenLoader(true);
      const currentUser = getCurrentUser();

      const user = await getUserByEmail(currentUser?.email ?? "");
      setCurrentTech(user?.name ?? "");
      const classificationsSessions = await getClassificationsHandler();
      const filtered = classificationsSessions.filter(
        (classification) => classification.task?.technicalId === user?.id
      );
      setClassificationList(filtered);
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
        Clasificación por Técnico {currentTech}
      </Text>
      {classificationList.length > 0 ? (
        classificationList.map((classification) => {
          return (
            <ClassificationInProgressCard
              navigation={navigation}
              key={classification.id}
              id={classification.id}
              createdAt={classification.createdAt}
              finishedAt={classification.finishedAt}
              startedAt={classification.startedAt}
            />
          );
        })
      ) : !openLoader ? (
        <Text>No hay clasificaciones registradas</Text>
      ) : null}
    </ScrollView>
  );
};

export default ClassificationByTech;

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
