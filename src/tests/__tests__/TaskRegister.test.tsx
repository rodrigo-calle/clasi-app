import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { getTechnicalUsersHandler } from "../__mocks__/handlers/getUsers";
import { getSuppliersHandler } from "../__mocks__/handlers/suppliers/getSuppliers";
import TaskRegister from "../../screens/TaskRegister";
import * as CreateClassificationHandler from "../../handlers/classifications/createClassification";

jest.mock("../../services/users");
jest.mock("../../handlers/suppliers/getSuppliers");
jest.mock("../../handlers/classifications/createClassification");
jest.mock("../../handlers/suppliers/getSuppliers");

describe("TaskRegister Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("it should have all form fields required", async () => {
    getTechnicalUsersHandler.mockResolvedValueOnce([
      { name: "Technical 1", id: "1" },
      { name: "Technical 2", id: "2" },
    ]);

    getSuppliersHandler.mockResolvedValueOnce([
      { name: "Supplier 1", id: "1" },
      { name: "Supplier 2", id: "2" },
    ]);

    const { getByText } = render(<TaskRegister />);

    await waitFor(() => {
      expect(getByText("Registrar y Asignar Tareas")).toBeTruthy();
      expect(getByText("Técnico")).toBeTruthy();
      expect(getByText("Proveedor de Semilla")).toBeTruthy();
      expect(getByText("Variedad de Semilla")).toBeTruthy();
      expect(
        getByText("Límite de Semillas por variedad a notificar")
      ).toBeTruthy();
      expect(
        getByText("Límite Total de Semilla para la clasificación")
      ).toBeTruthy();
    });
  });

  it("it should allow register a technician to an task", async () => {
    getTechnicalUsersHandler.mockResolvedValueOnce([
      { name: "Technical 1", id: "1" },
      { name: "Technical 2", id: "2" },
    ]);

    const { getByText } = render(<TaskRegister />);

    await waitFor(() => {
      expect(getByText("Técnico")).toBeTruthy();
    });
  });

  it("should register a task", async () => {
    const jsdomAlert = window.alert; // remember the jsdom alert
    window.alert = () => {};
    getTechnicalUsersHandler.mockResolvedValueOnce([
      { name: "Technical 1", id: "1" },
      { name: "Technical 2", id: "2" },
    ]);

    getSuppliersHandler.mockResolvedValueOnce([
      { name: "Supplier 1", id: "1" },
      { name: "Supplier 2", id: "2" },
    ]);

    const { getByText, getByTestId } = render(<TaskRegister />);

    fireEvent.changeText(getByTestId("variety-seed-limit"), "10");
    fireEvent.changeText(getByTestId("total-seed-limit"), "100");

    const technicalPicker = getByTestId("technical-picker");
    const supplierPicker = getByTestId("supplier-picker");
    const seedVarietyPicker = getByTestId("seed-variety-picker");

    await waitFor(() => {
      fireEvent(technicalPicker, "onValueChange", "1");
      fireEvent(supplierPicker, "onValueChange", "1");
      fireEvent(seedVarietyPicker, "onValueChange", "oocarpa");
    });

    await waitFor(() => {
      expect(getByText("Registrar Tarea")).toBeTruthy();
    });

    const submitButton = getByTestId("pressable-form");

    const createClassificationSpy = jest.spyOn(
      CreateClassificationHandler,
      "createSeedClassificationHandler"
    );

    await waitFor(() => {
      fireEvent.press(submitButton);
    });

    await waitFor(() => {
      expect(createClassificationSpy).toHaveBeenCalled();
      expect(createClassificationSpy).toHaveBeenCalledWith({
        businessId: "vivero-santo-domingo",
        classificationData: {
          oocarpa: 0,
          psegoustrobus: 0,
          tecunumanii: 0,
        },
        startedAt: null,
        finishedAt: null,
        task: {
          seedsVarietyLimit: 10,
          totalSeedsLimit: 100,
          supplierId: "1",
          technicalId: "1",
          seedVarietyRequired: "oocarpa",
        },
        userId: "",
      });
      window.alert = jsdomAlert;
    });
  });
});
