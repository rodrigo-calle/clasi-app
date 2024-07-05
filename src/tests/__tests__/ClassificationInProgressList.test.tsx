// src/tests/__tests__/ClassificationInProgressList.test.tsx
import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import ClassificationInProgressList from "../../screens/ClassificationInProgressList";
import * as classificationHandler from "../../handlers/classifications/getClassification";
import { ClassificationResponse } from "../../types/classifications/types";

jest.mock("../../handlers/classifications/getClassification", () => ({
  getClassificationsHandler: jest.fn(),
}));

const mockNavigation = {
  navigate: jest.fn(),
};

describe("ClassificationInProgressList Component", () => {
  const mockClassifications = [
    {
      id: "1",
      createdAt: 1672531200,
      finishedAt: "In progress",
      startedAt: "2023-01-01T00:00:00Z",
    },
    {
      id: "2",
      createdAt: 1672531300,
      finishedAt: "In progress",
      startedAt: "2023-01-01T00:05:00Z",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading indicator initially", () => {
    (
      classificationHandler.getClassificationsHandler as jest.Mock
    ).mockResolvedValue([]);

    const { getByText } = render(
      <NavigationContainer>
        <ClassificationInProgressList navigation={mockNavigation as any} />
      </NavigationContainer>
    );

    expect(getByText("Cargando...")).toBeTruthy();
  });

  it("fetches and displays classification sessions", async () => {
    (
      classificationHandler.getClassificationsHandler as jest.Mock
    ).mockResolvedValue(mockClassifications);

    const { getByText } = render(
      <NavigationContainer>
        <ClassificationInProgressList navigation={mockNavigation as any} />
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(getByText("Sesiones de Clasificación en Curso")).toBeTruthy();
      expect(getByText("1")).toBeTruthy();
      expect(getByText("2")).toBeTruthy();
    });
  });
});
