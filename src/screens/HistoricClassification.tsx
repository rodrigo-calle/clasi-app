import React, { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import HistoricCard from "../components/HistoricCard";
import Loading from "../components/Loading";
import { ClassificationResponse } from "../types/classifications/types";
import { getClassificationsHandler } from "../handlers/classifications/getClassification";

const HistoricClassification = () => {
  const [openLoader, setOpenLoader] = useState<boolean>(false);
  const [classificationList, setClassificationList] = useState<
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

  useEffect(() => {
    getClassificationListByUser();
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
        Historial
      </Text>
      {classificationList.length > 0 ? (
        classificationList.map((classification) => {
          return (
            <HistoricCard
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
