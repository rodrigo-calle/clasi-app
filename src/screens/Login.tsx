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
import { FIREBASE_AUTH } from "../server/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NavigationProp } from "@react-navigation/native";
import { Image } from "expo-image";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

function Login({ navigation }: RouterProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source="https://res.cloudinary.com/drk1pe742/image/upload/v1702007467/clasiapp/assets/seed_1_id3cu2.png"
        placeholder="Logo"
        contentFit="contain"
        transition={1000}
      />
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Iniciar Sesión
      </Text>
      <KeyboardAvoidingView
        behavior="padding"
        style={{
          backgroundColor: "#fff",
        }}
      >
        <TextInput
          value={email}
          style={styles.input}
          placeholder="Correo"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        ></TextInput>
        <TextInput
          value={password}
          style={styles.input}
          placeholder="contraseña"
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        ></TextInput>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <Button
              color={"#689BFF"}
              title="Iniciar Sesión"
              onPress={() => signIn()}
            ></Button>
          </>
        )}
        <Text>¿No tienes una cuenta?</Text>
        <Text
          style={{ color: "blue" }}
          onPress={() => navigation.navigate("Register")}
        >
          Registrese Aquí
        </Text>
      </KeyboardAvoidingView>
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 0,
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
    width: 350,
    marginBottom: 10,
    // borderBlockColor: "#C9C9C9",
  },
  buttons: {
    marginVertical: 2,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "green",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginBottom: 10,
    textAlign: "center",
  },
});
