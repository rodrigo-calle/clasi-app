import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
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
import { TECHNICAL_COLLECTION, USER_COLLECTION } from "../contants/constants";

const TechnicalRegister = () => {
  const [technicalName, setTechnicalName] = useState<string>("");
  const [technicalEmail, setTechnicalEmail] = useState<string>("");
  const db = FIREBASE_DB;
  const currentUser = FIREBASE_AUTH.currentUser;

  const registerTechnical = async () => {
    try {
      const newDoc = collection(db, TECHNICAL_COLLECTION);

      const q = query(
        collection(db, USER_COLLECTION),
        where("email", "==", currentUser?.email)
      );
      const querySnapshot = await getDocs(q);
      const user = querySnapshot.docs[0].ref;

      await addDoc(newDoc, {
        technicalName: technicalName,
        technicalEmail: technicalEmail,
        createdBy: user,
      });

      alert("Técnico registrado correctamente");

      setTechnicalName("");
      setTechnicalEmail("");
    } catch (error) {
      alert(error);
    }
  };
  return (
    <View>
      <KeyboardAvoidingView behavior="padding">
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            marginBottom: 20,
            alignSelf: "center",
          }}
        >
          Registrar Técnico
        </Text>
        <TextInput
          placeholder="Nombre del técnico"
          onChangeText={setTechnicalName}
          value={technicalName}
          style={styles.input}
        />
        <TextInput
          placeholder="Correo electrónico"
          onChangeText={setTechnicalEmail}
          value={technicalEmail}
          style={styles.input}
        />
        <Pressable style={styles.button} onPress={() => registerTechnical()}>
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
  );
};

export default TechnicalRegister;

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
    width: 350,
    alignSelf: "center",
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
    alignSelf: "center",
    width: 350,
  },
  container: {
    width: "80%",
    flexDirection: "column",
    alignSelf: "center",
  },
});
