// src/tests/__tests__/HistoricClassification.test.tsx
import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react-native";
import HistoricClassification from "../../screens/HistoricClassification";
import { NavigationContainer } from "@react-navigation/native";
import { getClassificationsHandler } from "../__mocks__/handlers/classifications/getClassification";
import { getReports } from "../__mocks__/handlers/reports";
import { getTechnicalUsersHandler } from "../__mocks__/handlers/getUsers";

jest.mock("../../handlers/classifications/getClassification");
jest.mock("../../handlers/users/getUsers");
jest.mock("../../services/reports");

const mockNavigation = {
  navigate: jest.fn(),
};

describe("HistoricClassification Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly and loads data", async () => {
    const { getByText } = render(
      <NavigationContainer>
        <HistoricClassification navigation={mockNavigation as any} />
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(getByText("Historial")).toBeTruthy();
    });

    expect(getClassificationsHandler).toHaveBeenCalled();
    expect(getTechnicalUsersHandler).toHaveBeenCalled();
  });
  it("generates report when a specific technical user is selected", async () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <HistoricClassification navigation={mockNavigation as any} />
      </NavigationContainer>
    );

    await waitFor(() => {
      fireEvent(getByTestId("picker"), "valueChange", "tech1");
    });

    fireEvent.press(getByTestId("generate-report-button"));

    await waitFor(() => {
      expect(getReports).toHaveBeenCalledWith("tech1");
    });
  });

  it("filters classifications by technical user", async () => {
    const classifications = [
      {
        id: "kamsdlkasmdqwe",
        task: { technicalId: "tech1" },
        createdAt: "2023-01-01",
        finishedAt: null,
      },
      {
        id: "dlksamdaksdmasld",
        task: { technicalId: "tech1" },
        createdAt: "2023-01-01",
        finishedAt: null,
      },
      {
        id: "zxczxvn21dm",
        task: { technicalId: "tech2" },
        createdAt: "2023-01-01",
        finishedAt: null,
      },
    ];

    const technicalUsers = [
      { id: "tech1", name: "Technical User 1" },
      { id: "tech2", name: "Technical User 2" },
    ];

    getClassificationsHandler.mockResolvedValue(classifications);
    getTechnicalUsersHandler.mockResolvedValue(technicalUsers);

    const { getByText, getByTestId } = render(
      <NavigationContainer>
        <HistoricClassification navigation={mockNavigation as any} />
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(getByText("Historial")).toBeTruthy();
    });

    const technicalSelected = "tech1";

    const picker = getByTestId("picker");

    await waitFor(() => {
      fireEvent(picker, "onValueChange", technicalSelected);
    });

    await waitFor(() => {
      expect(getByText("kamsdlkasmdqwe")).toBeTruthy();
      expect(getByText("dlksamdaksdmasld")).toBeTruthy();
    });

    await waitFor(() => {
      expect(() => getByText("zxczxvn21dm")).toThrow();
    });
  });

  it("filters classifications by all technical users", async () => {
    const classifications = [
      {
        id: "kamsdlkasmdqwe",
        task: { technicalId: "tech1" },
        createdAt: "2023-01-01",
        finishedAt: null,
      },
      {
        id: "dlksamdaksdmasld",
        task: { technicalId: "tech1" },
        createdAt: "2023-01-01",
        finishedAt: null,
      },
      {
        id: "zxczxvn21dm",
        task: { technicalId: "tech2" },
        createdAt: "2023-01-01",
        finishedAt: null,
      },
    ];

    const technicalUsers = [
      { id: "tech1", name: "Technical User 1" },
      { id: "tech2", name: "Technical User 2" },
    ];

    getClassificationsHandler.mockResolvedValue(classifications);
    getTechnicalUsersHandler.mockResolvedValue(technicalUsers);

    const { getByText, getByTestId } = render(
      <NavigationContainer>
        <HistoricClassification navigation={mockNavigation as any} />
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(getByText("Historial")).toBeTruthy();
    });

    const technicalSelected = "Todos";

    const picker = getByTestId("picker");

    await waitFor(() => {
      fireEvent(picker, "onValueChange", technicalSelected);
    });

    await waitFor(() => {
      expect(getByText("kamsdlkasmdqwe")).toBeTruthy();
      expect(getByText("dlksamdaksdmasld")).toBeTruthy();
      expect(getByText("zxczxvn21dm")).toBeTruthy();
    });
  });
});
