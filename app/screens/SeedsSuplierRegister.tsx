import React, { useState } from "react";
import {
  Button,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../FirebaseConfig";
import { addDoc, collection } from "firebase/firestore";

const SeedsSuplierRegister = () => {
  const [supplierName, setSupplierName] = useState<string>("");
  const [supplierPhone, setSupplierPhone] = useState<string>("");
  const [supplierSeedOrigin, setSupplierSeedOrigin] = useState<string>("");
  const [supplierHarvestMethod, setSupplierHarvestMethod] =
    useState<string>("");
  const db = FIREBASE_DB;

  const registerSupplierHandler = async () => {
    try {
      const newDoc = collection(db, "suppliers");

      await addDoc(newDoc, {
        supplierName: supplierName,
        supplierPhone: supplierPhone,
        supplierSeedOrigin: supplierSeedOrigin,
        supplierHarvestMethod: supplierHarvestMethod,
      });

      alert("Proveedor registrado correctamente");

        setSupplierName("");
        setSupplierPhone("");
        setSupplierSeedOrigin("");
        setSupplierHarvestMethod("");
        
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View>
      <Button
        title="Cerrar Sesión"
        onPress={() => FIREBASE_AUTH.signOut()}
      ></Button>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          marginBottom: 20,
          alignSelf: "center",
        }}
      >
        Registro de Proveedor
      </Text>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <Text>Nombre del Proveedor</Text>
          <TextInput
            value={supplierName}
            onChangeText={(text) => setSupplierName(text)}
            autoCapitalize="none"
            style={styles.input}
          ></TextInput>
          <Text>Telefono:</Text>
          <TextInput
            value={supplierPhone}
            onChangeText={(text) => setSupplierPhone(text)}
            autoCapitalize="none"
            style={styles.input}
          ></TextInput>
          <Text>Procedencia de Semilla</Text>
          <TextInput
            value={supplierSeedOrigin}
            onChangeText={(text) => setSupplierSeedOrigin(text)}
            autoCapitalize="none"
            style={styles.input}
          ></TextInput>
          <Text>Método de Recolección</Text>
          <TextInput
            value={supplierHarvestMethod}
            onChangeText={(text) => setSupplierHarvestMethod(text)}
            autoCapitalize="none"
            style={styles.input}
          ></TextInput>
          <Pressable
            style={styles.button}
            onPress={() => registerSupplierHandler()}
          >
            <Text
              style={{
                fontSize: 16,
                lineHeight: 21,
                fontWeight: "bold",
                letterSpacing: 0.25,
                color: "white",
              }}
            >
              Registrar Proveedor
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default SeedsSuplierRegister;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    marginTop: 20,
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
  },
  container: {
    width: "80%",
    flexDirection: "column",
    alignSelf: "center",
  },
});
