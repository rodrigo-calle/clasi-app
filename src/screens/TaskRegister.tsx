import { Picker } from "@react-native-picker/picker";
import {
  DocumentReference,
  Timestamp,
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { FIREBASE_AUTH, FIREBASE_DB } from "../server/FirebaseConfig";
import Loading from "../components/Loading";
import {
  SupplierInterface,
  TaskFormData,
  TaskInterface,
  TechnicalInterface,
} from "../types/firebaseTypes";
import {
  SUPPLIER_COLLECTION,
  TASK_COLLECTION,
  TECHNICAL_COLLECTION,
  USER_COLLECTION,
} from "../contants/constants";

const TaskRegister = () => {
  const db = FIREBASE_DB;
  const currentUser = FIREBASE_AUTH.currentUser;
  const [technicals, setTechnicals] = useState<TechnicalInterface[]>([]);
  const [suppliers, setSuppliers] = useState<SupplierInterface[]>([]);
  const [currentUserRef, setCurrentUserRef] = useState<DocumentReference>();
  const [loading, setLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<TaskFormData>({
    thecnical: "",
    provider: "",
    taskNote: "",
  });

  console.log({ technicals });
  const getTechnicals = async () => {
    const q = query(
      collection(db, USER_COLLECTION),
      where("userType", "==", "technical")
    );

    const querySnapshot = await getDocs(q);

    const docs = querySnapshot.docs.map(
      (doc) => doc.data() as TechnicalInterface
    );

    setTechnicals(docs);
  };

  const getProviders = async () => {
    const querySnapshot = await getDocs(collection(db, SUPPLIER_COLLECTION));

    const docs = querySnapshot.docs.map(
      (doc) => doc.data() as SupplierInterface
    );

    setSuppliers(docs);
  };

  const getCurrentUserReference = async () => {
    const q = query(
      collection(db, USER_COLLECTION),
      where("email", "==", currentUser?.email)
    );

    const querySnapshot = await getDocs(q);

    const docs = querySnapshot.docs.map((doc) => doc.ref);

    setCurrentUserRef(docs[0]);
  };

  useEffect(() => {
    getCurrentUserReference();
    getTechnicals();
    getProviders();
  }, []);

  const getTechnicalRef = async (technicalEmail: string) => {
    const q = query(
      collection(db, USER_COLLECTION),
      where("userType", "==", "technical")
    );

    const querySnapshot = await getDocs(q);

    const docs = querySnapshot.docs.map((doc) => doc.ref);

    return docs[0];
  };

  const getProviderRef = async (supplierName: string) => {
    const q = query(
      collection(db, SUPPLIER_COLLECTION),
      where("supplierName", "==", supplierName)
    );

    const querySnapshot = await getDocs(q);

    const docs = querySnapshot.docs.map((doc) => doc.ref);

    return docs[0];
  };

  const taskRegistrationHandler = async () => {
    try {
      setLoading(true);
      const technicalEmail = formData.thecnical;
      const supplierName = formData.provider;

      let technicalRef: DocumentReference | null = null;
      let providerRef: DocumentReference | null = null;

      if (technicalEmail !== "") {
        technicalRef = await getTechnicalRef(technicalEmail);
      }

      if (supplierName !== "") {
        providerRef = await getProviderRef(supplierName);
      }

      const newDoc = collection(db, TASK_COLLECTION);

      const task: TaskInterface = {
        taskNote: formData.taskNote,
        technicalReference: technicalRef,
        createdAt: Timestamp.now(),
        createdBy: currentUserRef!,
        providerReference: providerRef,
      };

      await addDoc(newDoc, task);

      alert("Tarea registrada correctamente");

      setFormData({
        thecnical: "",
        provider: "",
        taskNote: "",
      });
      setLoading(false);
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Loading text="Registrando..." open={loading}></Loading>
      <View>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            marginBottom: 20,
            alignSelf: "center",
            width: 350,
            textAlign: "center",
          }}
        >
          Registrar y Asignar Tareas
        </Text>
        <Text style={styles.label}>Técnico</Text>
        <Picker
          onValueChange={(itemValue: string, itemIndex) =>
            setFormData({ ...formData, thecnical: itemValue })
          }
          placeholder="Seleccionar técnico..."
          style={styles.picker}
        >
          {technicals?.map((technical, index) => {
            return (
              <Picker.Item
                key={index}
                label={technical.userName}
                value={technical.email}
              />
            );
          })}
        </Picker>
        <Text style={styles.label}>Proveedor de Semilla</Text>
        <Picker
          onValueChange={(itemValue: string, itemIndex) =>
            setFormData({ ...formData, provider: itemValue })
          }
          placeholder="Seleccionar Proveedor de Semilla..."
          style={styles.picker}
        >
          {suppliers?.map((supplier: SupplierInterface, index) => {
            return (
              <Picker.Item
                key={index}
                label={supplier.supplierName}
                value={supplier.supplierName}
              />
            );
          })}
        </Picker>
        <Text style={styles.label}>Nota de Tarea</Text>
        <TextInput
          multiline
          numberOfLines={5}
          editable
          onChange={(e) =>
            setFormData({
              ...formData,
              taskNote: e.nativeEvent.text,
            })
          }
          value={formData.taskNote}
          style={styles.textArea}
        ></TextInput>

        <Pressable style={styles.button} onPress={taskRegistrationHandler}>
          <Text
            style={{
              fontSize: 16,
              lineHeight: 21,
              fontWeight: "bold",
              letterSpacing: 0.25,
              color: "white",
            }}
          >
            Registrar Tarea
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TaskRegister;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    width: 350,
    alignSelf: "center",
    marginBottom: 5,
  },
  picker: {
    flex: 1,
    alignSelf: "center",
    marginBottom: 10,
    height: 50,
    width: 350,
    borderWidth: 1,
    backgroundColor: "#fff",
  },
  textArea: {
    alignSelf: "center",
    width: 350,
    height: 150,
    padding: 10,
    backgroundColor: "#fff",
  },
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
});
