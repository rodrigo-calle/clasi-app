import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as ClassificationServices from "../../services/classification";
import HistoricCard from "../../components/HistoricCard";

const mockNavigation = {
  navigate: jest.fn(),
};

jest.mock("../../services/classification", () => ({
  deleteClassificationService: jest.fn(),
}));

const mockProps = {
  id: "12345",
  createdAt: 1672531200, // Timestamp en segundos
  finishedAt: 1672534800, // Timestamp en segundos
  navigation: mockNavigation,
};

describe("HistoricCard Component", () => {
  const props = {
    id: "12345",
    createdAt: 1672531200, // Timestamp en segundos
    finishedAt: 1672534800, // Timestamp en segundos
    navigation: mockNavigation as any,
  };

  it("renders correctly with given props", () => {
    const { getByText } = render(
      <NavigationContainer>
        <HistoricCard {...props} />
      </NavigationContainer>
    );

    expect(getByText("Código:")).toBeTruthy();
    expect(getByText("12345")).toBeTruthy();
    expect(getByText("Fecha Hora:")).toBeTruthy();
    expect(getByText("Duración:")).toBeTruthy();
  });

  it("delete seed classification session when delete button is pressed", async () => {
    window.alert = jest.fn();
    const { getByTestId } = render(
      <NavigationContainer>
        <HistoricCard {...props} />
      </NavigationContainer>
    );

    const deleteClassificationSpy = jest.spyOn(
      ClassificationServices,
      "deleteClassificationService"
    );

    fireEvent.press(getByTestId("delete-button"));

    await waitFor(() => {
      expect(deleteClassificationSpy).toHaveBeenCalledWith("12345");
  
    });
  });

  it("shows an alert when classification is deleted", async () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <HistoricCard {...props} />
      </NavigationContainer>
    );

    const jsdomAlert = window.alert;
    window.alert = jest.fn();

    fireEvent.press(getByTestId("delete-button"));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "Clasificación eliminada correctamente"
      );
    });

    window.alert = jsdomAlert;
  });
});
