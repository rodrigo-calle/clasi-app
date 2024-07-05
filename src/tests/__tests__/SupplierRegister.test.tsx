import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import SeedsSuplierRegister from "../../screens/SeedsSuplierRegister";
import { createSupplierHandler } from "../../handlers/suppliers/createSupplier";
import { FIREBASE_AUTH } from "../../server/FirebaseConfig";

jest.mock("../../handlers/suppliers/createSupplier");
jest.mock("../../server/FirebaseConfig", () => ({
  FIREBASE_AUTH: {
    signOut: jest.fn(),
  },
  FIREBASE_DB: jest.fn(),
}));

describe("SeedsSuplierRegister Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render all input fields and button", () => {
    const { getByPlaceholderText, getByText } = render(
      <SeedsSuplierRegister />
    );
    expect(getByPlaceholderText("Nombre del Proveedor")).toBeTruthy();
    expect(getByPlaceholderText("Telefono")).toBeTruthy();
    expect(getByPlaceholderText("Procedencia de Semilla")).toBeTruthy();
    expect(getByPlaceholderText("Método de Recolección")).toBeTruthy();
    expect(
      getByPlaceholderText("Correo electrónico del Proveedor")
    ).toBeTruthy();
    expect(getByPlaceholderText("Dirección")).toBeTruthy();
    expect(getByText("Registrar Proveedor")).toBeTruthy();
    expect(getByText("Cerrar Sesión")).toBeTruthy();
  });

  it("should show alert if required fields are missing", async () => {
    const alertMock = jest.spyOn(global, "alert").mockImplementation(() => {});
    const { getByText, getByPlaceholderText } = render(
      <SeedsSuplierRegister />
    );

    fireEvent.changeText(
      getByPlaceholderText("Nombre del Proveedor"),
      "Supplier Name"
    );
    fireEvent.changeText(getByPlaceholderText("Telefono"), "123456789");
    fireEvent.changeText(getByPlaceholderText("Procedencia de Semilla"), "");
    fireEvent.changeText(
      getByPlaceholderText("Método de Recolección"),
      "Manual"
    );

    fireEvent.press(getByText("Registrar"));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith("Debe ingresar todos los campos");
    });

    alertMock.mockRestore();
  });

  it("should call createSupplierHandler with correct data", async () => {
    const alertMock = jest.spyOn(global, "alert").mockImplementation(() => {});
    const { getByText, getByPlaceholderText } = render(
      <SeedsSuplierRegister />
    );

    fireEvent.changeText(
      getByPlaceholderText("Nombre del Proveedor"),
      "Supplier Name"
    );
    fireEvent.changeText(getByPlaceholderText("Telefono"), "123456789");
    fireEvent.changeText(
      getByPlaceholderText("Procedencia de Semilla"),
      "Seed Origin"
    );
    fireEvent.changeText(
      getByPlaceholderText("Método de Recolección"),
      "Manual"
    );
    fireEvent.changeText(
      getByPlaceholderText("Correo electrónico del Proveedor"),
      "supplier@example.com"
    );
    fireEvent.changeText(getByPlaceholderText("Dirección"), "Supplier Address");

    fireEvent.press(getByText("Registrar"));

    await waitFor(() => {
      expect(createSupplierHandler).toHaveBeenCalledWith({
        address: "Supplier Address",
        email: "supplier@example.com",
        name: "Supplier Name",
        harvestMethod: "Manual",
        phone: "123456789",
        seedOrigin: "Seed Origin",
      });
      expect(alertMock).toHaveBeenCalledWith(
        "Proveedor registrado correctamente"
      );
    });

    alertMock.mockRestore();
  });

  it("should clear input fields after successful registration", async () => {
    const { getByText, getByPlaceholderText } = render(
      <SeedsSuplierRegister />
    );

    fireEvent.changeText(
      getByPlaceholderText("Nombre del Proveedor"),
      "Supplier Name"
    );
    fireEvent.changeText(getByPlaceholderText("Telefono"), "123456789");
    fireEvent.changeText(
      getByPlaceholderText("Procedencia de Semilla"),
      "Seed Origin"
    );
    fireEvent.changeText(
      getByPlaceholderText("Método de Recolección"),
      "Manual"
    );
    fireEvent.changeText(
      getByPlaceholderText("Correo electrónico del Proveedor"),
      "supplier@example.com"
    );
    fireEvent.changeText(getByPlaceholderText("Dirección"), "Supplier Address");

    fireEvent.press(getByText("Registrar"));

    await waitFor(() => {
      expect(getByPlaceholderText("Nombre del Proveedor").props.value).toBe("");
      expect(getByPlaceholderText("Telefono").props.value).toBe("");
      expect(getByPlaceholderText("Procedencia de Semilla").props.value).toBe(
        ""
      );
      expect(getByPlaceholderText("Método de Recolección").props.value).toBe(
        ""
      );
      expect(
        getByPlaceholderText("Correo electrónico del Proveedor").props.value
      ).toBe("");
      expect(getByPlaceholderText("Dirección").props.value).toBe("");
    });
  });

  it('should call FIREBASE_AUTH.signOut when "Cerrar Sesión" is pressed', () => {
    const { getByText } = render(<SeedsSuplierRegister />);

    fireEvent.press(getByText("Cerrar Sesión"));

    expect(FIREBASE_AUTH.signOut).toHaveBeenCalled();
  });
});

jest.mock("../../handlers/suppliers/createSupplier");
jest.mock("../../server/FirebaseConfig", () => ({
  FIREBASE_AUTH: {
    signOut: jest.fn(),
  },
  FIREBASE_DB: jest.fn(),
}));

// describe("SeedsSuplierRegister Component", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   // it("should render all input fields and button", () => {
//   //   const { getByPlaceholderText, getByText } = render(
//   //     <SeedsSuplierRegister />
//   //   );
//   //   expect(getByPlaceholderText("Nombre del Proveedor")).toBeTruthy();
//   //   expect(getByPlaceholderText("Telefono")).toBeTruthy();
//   //   expect(getByPlaceholderText("Procedencia de Semilla")).toBeTruthy();
//   //   expect(getByPlaceholderText("Método de Recolección")).toBeTruthy();
//   //   expect(
//   //     getByPlaceholderText("Correo electrónico del Proveedor")
//   //   ).toBeTruthy();
//   //   expect(getByPlaceholderText("Dirección")).toBeTruthy();
//   //   expect(getByText("Registrar Proveedor")).toBeTruthy();
//   //   expect(getByText("Cerrar Sesión")).toBeTruthy();
//   // });

//   it("should show alert if required fields are missing", async () => {
//     const alertMock = jest.spyOn(global, "alert").mockImplementation(() => {});
//     const { getByText, getByPlaceholderText } = render(
//       <SeedsSuplierRegister />
//     );

//     fireEvent.changeText(
//       getByPlaceholderText("Nombre del Proveedor"),
//       "Supplier Name"
//     );
//     fireEvent.changeText(getByPlaceholderText("Telefono"), "123456789");
//     fireEvent.changeText(getByPlaceholderText("Procedencia de Semilla"), "");
//     fireEvent.changeText(
//       getByPlaceholderText("Método de Recolección"),
//       "Manual"
//     );

//     fireEvent.press(getByText("Registrar"));

//     await waitFor(() => {
//       expect(alertMock).toHaveBeenCalledWith("Debe ingresar todos los campos");
//     });

//     alertMock.mockRestore();
//   });

//   it("should call createSupplierHandler with correct data", async () => {
//     const alertMock = jest.spyOn(global, "alert").mockImplementation(() => {});
//     const { getByText, getByPlaceholderText } = render(
//       <SeedsSuplierRegister />
//     );

//     fireEvent.changeText(
//       getByPlaceholderText("Nombre del Proveedor"),
//       "Supplier Name"
//     );
//     fireEvent.changeText(getByPlaceholderText("Telefono"), "123456789");
//     fireEvent.changeText(
//       getByPlaceholderText("Procedencia de Semilla"),
//       "Seed Origin"
//     );
//     fireEvent.changeText(
//       getByPlaceholderText("Método de Recolección"),
//       "Manual"
//     );
//     fireEvent.changeText(
//       getByPlaceholderText("Correo electrónico del Proveedor"),
//       "supplier@example.com"
//     );
//     fireEvent.changeText(getByPlaceholderText("Dirección"), "Supplier Address");

//     fireEvent.press(getByText("Registrar"));

//     await waitFor(() => {
//       expect(createSupplierHandler).toHaveBeenCalledWith({
//         address: "Supplier Address",
//         email: "supplier@example.com",
//         name: "Supplier Name",
//         harvestMethod: "Manual",
//         phone: "123456789",
//         seedOrigin: "Seed Origin",
//       });
//       expect(alertMock).toHaveBeenCalledWith(
//         "Proveedor registrado correctamente"
//       );
//     });

//     alertMock.mockRestore();
//   });

//   it("should clear input fields after successful registration", async () => {
//     const { getByText, getByPlaceholderText } = render(
//       <SeedsSuplierRegister />
//     );

//     fireEvent.changeText(
//       getByPlaceholderText("Nombre del Proveedor"),
//       "Supplier Name"
//     );
//     fireEvent.changeText(getByPlaceholderText("Telefono"), "123456789");
//     fireEvent.changeText(
//       getByPlaceholderText("Procedencia de Semilla"),
//       "Seed Origin"
//     );
//     fireEvent.changeText(
//       getByPlaceholderText("Método de Recolección"),
//       "Manual"
//     );
//     fireEvent.changeText(
//       getByPlaceholderText("Correo electrónico del Proveedor"),
//       "supplier@example.com"
//     );
//     fireEvent.changeText(getByPlaceholderText("Dirección"), "Supplier Address");

//     fireEvent.press(getByText("Registrar"));

//     await waitFor(() => {
//       expect(getByPlaceholderText("Nombre del Proveedor").props.value).toBe("");
//       expect(getByPlaceholderText("Telefono").props.value).toBe("");
//       expect(getByPlaceholderText("Procedencia de Semilla").props.value).toBe(
//         ""
//       );
//       expect(getByPlaceholderText("Método de Recolección").props.value).toBe(
//         ""
//       );
//       expect(
//         getByPlaceholderText("Correo electrónico del Proveedor").props.value
//       ).toBe("");
//       expect(getByPlaceholderText("Dirección").props.value).toBe("");
//     });
//   });

//   it('should call FIREBASE_AUTH.signOut when "Cerrar Sesión" is pressed', () => {
//     const { getByText } = render(<SeedsSuplierRegister />);

//     fireEvent.press(getByText("Cerrar Sesión"));

//     expect(FIREBASE_AUTH.signOut).toHaveBeenCalled();
//   });
// });
