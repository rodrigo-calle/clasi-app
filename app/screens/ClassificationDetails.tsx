import { NavigationProp } from "@react-navigation/native";
import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const ClassificationDetails = ({ navigation }: RouterProps) => {
  return (
    <View>
      <Button
        title="Cerrar Sesión"
        onPress={() => FIREBASE_AUTH.signOut()}
      ></Button>
      <View
        style={{
          height: 200,
          width: "90%",
          backgroundColor: "black",
          marginHorizontal: "auto",
          alignSelf: "center",
          marginTop: 20,
        }}
      ></View>
      <View
        style={{
          width: "90%",
          alignSelf: "center",
          marginTop: 4,
          flexDirection: "row",
          gap: 4,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 4,
          }}
        >
          <View style={styles.mediaButtons}></View>
          <View style={styles.mediaButtons}></View>
          <View style={styles.mediaButtons}></View>
        </View>
        <View style={styles.mediaButtons}></View>
      </View>
      <Text style={styles.subtitle}>Semillas Clasificadas</Text>
      <View
        style={{
          marginTop: 20,
        }}
      >
        <View style={styles.varietyRow}>
          <Text style={styles.textRow}>Variedad 1:</Text>
          <TextInput style={styles.input} value="20"></TextInput>
        </View>
        <View style={styles.varietyRow}>
          <Text style={styles.textRow}>Variedad 2:</Text>
          <TextInput style={styles.input} value="15"></TextInput>
        </View>
        <View style={styles.varietyRow}>
          <Text style={styles.textRow}>Variedad 3:</Text>
          <TextInput style={styles.input} value="0"></TextInput>
        </View>
        <View style={styles.varietyRow}>
          <Text style={styles.textRow}>Desconocido:</Text>
          <TextInput style={styles.input} value="0"></TextInput>
        </View>
      </View>
      <Text
        style={{ color: "blue", marginLeft: 25, marginTop: 15 }}
        onPress={() =>
          navigation.navigate("Registro de Proveedores de Semilla")
        }
      >
        Registro de Proveedor de Semilla
      </Text>
    </View>
  );
};

export default ClassificationDetails;

const styles = StyleSheet.create({
  mediaButtons: {
    width: 35,
    height: 35,
    backgroundColor: "#D9D9D9",
  },
  previewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  varietyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center",
    alignContent: "center",
    marginTop: 10,
  },
  input: {
    height: 40,
    width: "30%",
    borderWidth: 1,
    padding: 7,
    marginBottom: 10,
  },
  textRow: {
    fontSize: 16,
    marginTop: 7,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "normal",
    marginLeft: 25,
    marginTop: 15,
    width: "90%",
  },
});
