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
import { FIREBASE_AUTH, FIREBASE_DB } from "../server/FirebaseConfig";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { NavigationProp } from "@react-navigation/native";
import { Image } from "expo-image";
import { Picker } from "@react-native-picker/picker";
import { TECHNICAL_COLLECTION, USER_COLLECTION } from "../contants/constants";
import { isEmail } from "../utils/validation";
import { getTechnicalUserByEmailHandler } from "../handlers/users/getUsers";
import { createProductionAdministratorHandler } from "../handlers/users/createUser";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Register = ({ navigation }: RouterProps) => {
  const [isTechnical, setIsTechnical] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

  const signUp = async () => {
    if (!email || !password || !userName) {
      alert("Debe ingresar un correo, contraseña y nombre de usuario");
      return;
    }

    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (userName.length < 6) {
      alert("El nombre de usuario debe tener al menos 6 caracteres");
      return;
    }

    if (!isEmail(email)) {
      alert("Debe ingresar un correo valido");
      return;
    }

    setLoading(true);
    try {
      if (!isTechnical) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        if (userCredential.user) {
          createProductionAdministratorHandler({
            name: userName,
            phone: "",
            email: email,
          });

          alert("Usuario creado correctamente, por favor solicitar acceso");
        }
      } else {
        const technical = await getTechnicalUserByEmailHandler(email);

        if (technical) {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

          alert("Técnico creado correctamente");
        } else {
          alert(
            "El técnico aun no se encuentra registrado por el administrador"
          );
        }
      }
    } catch (error) {
      alert(error);
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
        <Text>¿Eres técnico?</Text>
        <Picker
          selectedValue={isTechnical}
          onValueChange={(itemValue, itemIndex) => setIsTechnical(itemValue)}
          style={{
            height: 50,
            width: 150,
            borderWidth: 1,
            backgroundColor: "#fff",
          }}
        >
          <Picker.Item
            label="No"
            value={false}
            style={{
              borderBlockColor: "red",
              borderWidth: 1,
            }}
          />
          <Picker.Item label="Si" value={true} />
        </Picker>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <Button
              title="Registrate"
              color={"#689BFF"}
              onPress={() => signUp()}
            ></Button>
          </>
        )}
        <Text>Ya tienes una cuenta?</Text>
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
