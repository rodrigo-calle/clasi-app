import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import TechnicalRegister from "../../screens/TechnicalRegister";
import { createTechnicalUserHandler } from "../../handlers/users/createUser";

jest.mock("../../handlers/users/createUser");

describe("TechnicalRegister Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render all input fields and button", () => {
    const { getByPlaceholderText, getByText } = render(<TechnicalRegister />);
    expect(getByPlaceholderText("Nombre del técnico")).toBeTruthy();
    expect(getByPlaceholderText("Correo electrónico")).toBeTruthy();
    expect(getByPlaceholderText("Número telefónico")).toBeTruthy();
    expect(getByText("Registrar Técnico")).toBeTruthy();
  });

  it("should call createTechnicalUserHandler with correct data", async () => {
    const alertMock = jest.spyOn(global, "alert").mockImplementation(() => {});
    const { getByText, getByPlaceholderText } = render(<TechnicalRegister />);

    fireEvent.changeText(getByPlaceholderText("Nombre del técnico"), "John Doe");
    fireEvent.changeText(getByPlaceholderText("Correo electrónico"), "john@example.com");
    fireEvent.changeText(getByPlaceholderText("Número telefónico"), "123456789");

    fireEvent.press(getByText("Registrar"));

    await waitFor(() => {
      expect(createTechnicalUserHandler).toHaveBeenCalledWith({
        name: "John Doe",
        email: "john@example.com",
        phone: "123456789",
      });
      expect(alertMock).toHaveBeenCalledWith("Técnico registrado correctamente");
    });

    alertMock.mockRestore();
  });

  it("should clear input fields after successful registration", async () => {
    const { getByText, getByPlaceholderText } = render(<TechnicalRegister />);

    fireEvent.changeText(getByPlaceholderText("Nombre del técnico"), "John Doe");
    fireEvent.changeText(getByPlaceholderText("Correo electrónico"), "john@example.com");
    fireEvent.changeText(getByPlaceholderText("Número telefónico"), "123456789");

    fireEvent.press(getByText("Registrar"));

    await waitFor(() => {
      expect(getByPlaceholderText("Nombre del técnico").props.value).toBe("");
      expect(getByPlaceholderText("Correo electrónico").props.value).toBe("");
      expect(getByPlaceholderText("Número telefónico").props.value).toBe("");
    });
  });
});
