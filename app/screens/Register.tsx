import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { NavigationProp } from "@react-navigation/native";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Register = ({ navigation }: RouterProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

  const signUp = async () => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        const newDoc = doc(db, "users", userCredential.user.uid);
        await setDoc(newDoc, {
          email: userCredential.user.email,
          userName: userName,
        });

        alert("Usuario creado correctamente");
      }
    } catch (error) {
      alert(error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: 20 }}>
        Registrar
      </Text>
      <KeyboardAvoidingView behavior="padding">
        <TextInput
          value={userName}
          style={styles.input}
          placeholder="Nombre de usuario"
          autoCapitalize="none"
          onChangeText={(text) => setUserName(text)}
        ></TextInput>
        <TextInput
          value={email}
          style={styles.input}
          placeholder="Correo"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        ></TextInput>
        <TextInput
          secureTextEntry={true}
          value={password}
          style={styles.input}
          placeholder="contraseña"
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
        ></TextInput>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            {/* <Button title="Iniciar Sesión" onPress={() => signIn()}></Button> */}
            <Button title="Registrate" onPress={() => signUp()}></Button>
          </>
        )}
        <Text>Ya tienes una cuenta? </Text>
        <Text
          style={{ color: "blue" }}
          onPress={() => navigation.navigate("Login")}
        >
          Inicia Sesión Aquí
        </Text>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "center",
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
  },
  buttons: {
    marginVertical: 2,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "green",
  },
});
