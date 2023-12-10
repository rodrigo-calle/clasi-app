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
import { FIREBASE_AUTH, FIREBASE_DB } from "../server/FirebaseConfig";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { SUPPLIER_COLLECTION, USER_COLLECTION } from "../contants/constants";

const SeedsSuplierRegister = () => {
  const [supplierName, setSupplierName] = useState<string>("");
  const [supplierPhone, setSupplierPhone] = useState<string>("");
  const [supplierSeedOrigin, setSupplierSeedOrigin] = useState<string>("");
  const [supplierHarvestMethod, setSupplierHarvestMethod] =
    useState<string>("");
  const db = FIREBASE_DB;
  const auth = FIREBASE_AUTH;

  const registerSupplierHandler = async () => {
    if (
      !supplierName ||
      !supplierPhone ||
      !supplierSeedOrigin ||
      !supplierHarvestMethod
    ) {
      alert("Debe ingresar todos los campos");
      return;
    }
    try {
      const newDoc = collection(db, SUPPLIER_COLLECTION);
      const currentUser = auth.currentUser;

      const q = query(
        collection(db, USER_COLLECTION),
        where("email", "==", currentUser?.email)
      )

      const querySnapshot = await getDocs(q);

      const user = querySnapshot.docs[0]?.ref;

      await addDoc(newDoc, {
        supplierName: supplierName,
        supplierPhone: supplierPhone,
        supplierSeedOrigin: supplierSeedOrigin,
        supplierHarvestMethod: supplierHarvestMethod,
        createdBy: user
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
        Registrar Proveedor
      </Text>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <TextInput
            value={supplierName}
            onChangeText={(text) => setSupplierName(text)}
            autoCapitalize="none"
            style={styles.input}
            placeholder="Nombre del Proveedor"
          ></TextInput>
          <TextInput
            value={supplierPhone}
            onChangeText={(text) => setSupplierPhone(text)}
            autoCapitalize="none"
            style={styles.input}
            placeholder="Telefono"
          ></TextInput>
          <TextInput
            value={supplierSeedOrigin}
            onChangeText={(text) => setSupplierSeedOrigin(text)}
            autoCapitalize="none"
            style={styles.input}
            placeholder="Procedencia de Semilla"
          ></TextInput>
          <TextInput
            value={supplierHarvestMethod}
            onChangeText={(text) => setSupplierHarvestMethod(text)}
            autoCapitalize="none"
            style={styles.input}
            placeholder="Método de Recolección"
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
    backgroundColor: "#689BFF",
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
