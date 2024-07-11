import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { ClassificationResponse } from "../types/classifications/types";
import { getSeedClassificationById } from "../services/classification";
import ClassificationPaiChart from "../components/ClassificationPaiChart";
import { timeConverter } from "../utils/readableTimestamp";

type Props = {
  route: any;
};
const SeedClassificationDetail = ({ route }: Props) => {
  const id = route.params.id;
  const [classificationData, setClassificationData] =
    useState<ClassificationResponse | null>(null);

  const handleGetSeedClassification = async () => {
    const seedClassification = await getSeedClassificationById(id);
    setClassificationData(seedClassification);
  };

  useEffect(() => {
    handleGetSeedClassification();
  }, []);

  if (!classificationData) {
    return (
      <View>
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (!id) {
    return (
      <View>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <>
      <View
        style={{
          height: "auto",
          alignSelf: "center",
          marginTop: 20,
        }}
      >
        <Text>Id de clasificación: {classificationData.id}</Text>
        <Text>
          Fecha de creación de clasificación:{" "}
          {timeConverter(classificationData.createdAt)}
        </Text>
        <Text>
          Fecha de inicio de classificación:{" "}
          {timeConverter(classificationData.startedAt)}
        </Text>
        <Text>
          Fecha de fin de classificación:{" "}
          {classificationData.finishedAt === 0
            ? "En curso"
            : timeConverter(classificationData.finishedAt)}
        </Text>
      </View>
      {classificationData.classificationData.oocarpa +
        classificationData.classificationData.psegoustrobus +
        classificationData.classificationData.tecunumanii ===
      0 ? (
        <Text
          style={{
            textAlign: "center",
            marginTop: 20,
            fontWeight: "bold",
          }}
        >
          No hay datos para mostrar gráficamente
        </Text>
      ) : (
        <ClassificationPaiChart
          oocarpa={classificationData.classificationData.oocarpa}
          psegoustrobus={classificationData.classificationData.psegoustrobus}
          tecunumanii={classificationData.classificationData.tecunumanii}
        />
      )}
    </>
  );
};

export default SeedClassificationDetail;
