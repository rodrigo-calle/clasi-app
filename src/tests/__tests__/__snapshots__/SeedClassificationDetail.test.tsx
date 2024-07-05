import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import SeedClassificationDetail from "../../../screens/SeedClassificationDetail";
// import * as ClassificationServices from "../../__mocks__/services/getSeedClassificationById";
import * as ClassificationServices from "../../../services/classification";
import { ClassificationResponse } from "../../../types/classifications/types";
// import SeedClassificationDetail from "../screens/SeedClassificationDetail";

jest.mock("../../../services/classification", () => ({
  getSeedClassificationById: jest.fn(),
}));

const mockRoute = {
  params: {
    id: "12345",
  },
};

const classificationResponseMock: ClassificationResponse = {
  id: "12345",
  createdAt: 1672531200000, // Timestamp in milliseconds
  startedAt: 1672534800000,
  finishedAt: 1672538400000,
  task: {
    supplierId: "supplier1",
    technicalId: "tech1",
    seedVarietyRequired: "oocarpa",
    seedsVarietyLimit: 100,
    totalSeedsLimit: 1000,
  },
  classificationData: {
    oocarpa: 10,
    psegoustrobus: 20,
    tecunumanii: 30,
  },
  userId: "user1",
  businessId: "vivero-santo-domingo",
};

describe("SeedClassificationDetail Component", () => {
  it("renders loading state initially", () => {
    const getSeedClassificationByIdSpy = jest.spyOn(
      ClassificationServices,
      "getSeedClassificationById"
    );

    getSeedClassificationByIdSpy.mockResolvedValue(null);

    const { getByText } = render(
      <NavigationContainer>
        <SeedClassificationDetail route={mockRoute} />
      </NavigationContainer>
    );

    expect(getByText("Cargando...")).toBeTruthy();
  });

  it("renders classification details correctly", async () => {
    const getSeedClassificationByIdSpy = jest.spyOn(
      ClassificationServices,
      "getSeedClassificationById"
    );

    getSeedClassificationByIdSpy.mockResolvedValueOnce(
      classificationResponseMock
    );

    const { getByText } = render(
      <NavigationContainer>
        <SeedClassificationDetail route={mockRoute} />
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(getByText("Id de clasificación: 12345")).toBeTruthy();
      expect(
        getByText("Fecha de creación de clasificación: 531200000")
      ).toBeTruthy();
      expect(
        getByText("Fecha de inicio de classificación: 1672534800000")
      ).toBeTruthy();
      expect(
        getByText("Fecha de fin de classificación: 1672538400000")
      ).toBeTruthy();
    });
  });

  it("renders no data message when there is no classification data", async () => {
    const emptyClassificationResponseMock = {
      ...classificationResponseMock,
      classificationData: {
        oocarpa: 0,
        psegoustrobus: 0,
        tecunumanii: 0,
      },
    };

    const getSeedClassificationByIdSpy = jest.spyOn(
      ClassificationServices,
      "getSeedClassificationById"
    );

    getSeedClassificationByIdSpy.mockResolvedValueOnce(
      emptyClassificationResponseMock
    );

    const { getByText } = render(
      <NavigationContainer>
        <SeedClassificationDetail route={mockRoute} />
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(getByText("No hay datos para mostrar gráficamente")).toBeTruthy();
    });
  });

  it("renders ClassificationPaiChart when there is classification data", async () => {
    const getSeedClassificationByIdSpy = jest.spyOn(
      ClassificationServices,
      "getSeedClassificationById"
    );

    getSeedClassificationByIdSpy.mockResolvedValueOnce(
      classificationResponseMock
    );

    const { getByText } = render(
      <NavigationContainer>
        <SeedClassificationDetail route={mockRoute} />
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(getByText("Id de clasificación: 12345")).toBeTruthy();
      expect(getByText("Oocarpa: 16.67%")).toBeTruthy();
      expect(getByText("Pseudostrobus: 33.33%")).toBeTruthy();
      expect(getByText("Tecunumanii: 50%")).toBeTruthy();
    });
  });
});
