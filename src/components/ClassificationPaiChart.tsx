import React, { useEffect, useState } from "react";
import { ColorValue, Text, View } from "react-native";
import { ClassificationResponse } from "../types/classifications/types";
import { PieChart } from "react-native-gifted-charts";

type Props = ClassificationResponse["classificationData"];

const ClassificationPaiChart = (classification: Props) => {
  const [totalSeeds, setTotalSeeds] = useState<number>(0);
  const [pieData, setPieData] = useState<
    {
      value: number;
      color: string;
      gradientCenterColor: string;
      focused: boolean;
    }[]
  >([]);
  const [percentage, setPercentage] = useState<{
    tecunumanii: number;
    oocarpa: number;
    pseudostrobus: number;
  }>({
    tecunumanii: 0,
    oocarpa: 0,
    pseudostrobus: 0,
  });

  const handleData = () => {
    const dataEntries = Object.entries(classification);
    const total = dataEntries.reduce((acc, [_, value]) => acc + value, 0);
    setTotalSeeds(total);

    function roundToTwoDigits(num: number): number {
      return parseFloat(num.toFixed(2));
    }

    const getPercentage = (value: number) =>
      roundToTwoDigits((value / total) * 100);

    setPercentage({
      tecunumanii: getPercentage(classification.tecunumanii) || 0,
      oocarpa: getPercentage(classification.oocarpa) || 0,
      pseudostrobus: getPercentage(classification.psegoustrobus) || 0,
    });

    const data = dataEntries.map(([key, value]) => {
      let color = "";
      let gradientCenterColor = "";
      switch (key) {
        case "tecunumanii":
          color = "#009FFF";
          gradientCenterColor = "#006DFF";
          break;
        case "oocarpa":
          color = "#93FCF8";
          gradientCenterColor = "#3BE9DE";
          break;
        case "psegoustrobus":
          color = "#BDB2FA";
          gradientCenterColor = "#8F80F3";
          break;
        default:
          color = "#FFA5BA";
          gradientCenterColor = "#FF7F97";
          break;
      }

      return {
        value,
        color,
        gradientCenterColor,
        focused: false,
      };
    });

    setPieData(data);
  };

  useEffect(() => {
    handleData();
  }, []);

  const renderDot = (color: ColorValue | undefined) => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

  const renderLegendComponent = () => {
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: 120,
              marginRight: 20,
            }}
          >
            {renderDot("#006DFF")}
            <Text style={{ color: "white" }}>
              Tecunumanii: {percentage.tecunumanii}%
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", width: 120 }}
          >
            {renderDot("#93FCF8")}
            <Text style={{ color: "white" }}>
              Oocarpa: {percentage.oocarpa}%
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: 120,
              marginRight: 20,
            }}
          >
            {renderDot("#BDB2FA")}
            <Text
              style={{ color: "white" }}
            >{`Pseudostrobus: ${percentage.pseudostrobus}%`}</Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <View
      style={{
        margin: 20,
        padding: 16,
        borderRadius: 20,
        backgroundColor: "#232B5D",
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 16,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Clasificación de semillas
      </Text>
      <Text
        style={{
          color: "white",
          fontSize: 16,
          fontWeight: "200",
          textAlign: "center",
          fontStyle: "italic",
        }}
      >
        {totalSeeds < 10
          ? "Cantidad de semillas insuficiente para mostrar gráfica"
          : ""}
      </Text>
      <View style={{ padding: 20, alignItems: "center" }}>
        <PieChart
          data={pieData}
          donut
          showGradient
          sectionAutoFocus
          radius={90}
          innerRadius={60}
          innerCircleColor={"#232B5D"}
          centerLabelComponent={() => {
            return (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text
                  style={{ fontSize: 22, color: "white", fontWeight: "bold" }}
                >
                  {totalSeeds}
                </Text>
                <Text style={{ fontSize: 14, color: "white" }}>
                  N° total de semillas
                </Text>
              </View>
            );
          }}
        />
      </View>
      {renderLegendComponent()}
    </View>
  );
};

export default ClassificationPaiChart;
