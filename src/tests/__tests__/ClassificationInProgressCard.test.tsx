import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import ClassificationInProgressCard from "../../components/ClassificationInProgressCard";

const mockNavigation = {
  navigate: jest.fn(),
};

const mockProps = {
  id: "67890",
  createdAt: 1672531200, // Timestamp in seconds
  finishedAt: null, // Indicates in-progress classification
  navigation: mockNavigation,
};

describe("ClassificationInProgressCard Component", () => {
  const props = {
    id: "67890",
    createdAt: 1672531200, // Timestamp in seconds
    finishedAt: null, // Indicates in-progress classification
    navigation: mockNavigation as any,
  };

  it("renders correctly with given props", () => {
    const { getByText } = render(
      <NavigationContainer>
        <ClassificationInProgressCard {...props} />
      </NavigationContainer>
    );

    expect(getByText("Código:")).toBeTruthy();
    expect(getByText("67890")).toBeTruthy();
    expect(getByText("Fecha Hora:")).toBeTruthy();
    expect(getByText("Duración:")).toBeTruthy();
    expect(getByText("En progreso")).toBeTruthy();
  });

  it("navigates to classification session when start button is pressed", async () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <ClassificationInProgressCard {...props} />
      </NavigationContainer>
    );

    fireEvent.press(getByTestId("start-classify-button"));

    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith(
        "Sesión de Clasificación de Semilla",
        {
          id: "67890",
        }
      );
    });
  });
});
