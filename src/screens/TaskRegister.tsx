import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Loading from "../components/Loading";
import {
  ClassificationTask,
  CreateClassification,
} from "../types/classifications/types";
import { getTechnicalUsersHandler } from "../handlers/users/getUsers";
import { createSeedClassificationHandler } from "../handlers/classifications/createClassification";
import { getSuppliersHandler } from "../handlers/suppliers/getSuppliers";
import { getCurrentUser } from "../services/session";
import { getUserByEmail } from "../services/users";

const seedVarieties = [
  {
    name: "Todos",
    value: null,
  },
  {
    name: "Tecunumanii",
    value: "tecunumanii",
  },
  {
    name: "Oocarpa",
    value: "oocarpa",
  },
  {
    name: "Psegoustrobus",
    value: "psegoustrobus",
  },
];

const TaskRegister = () => {
  const [technicals, setTechnicals] = useState<
    { name: string; value: string }[]
  >([]);
  const [suppliers, setSuppliers] = useState<{ name: string; value: string }[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [seedVariety, setSeedVariety] = useState<string | null>(
    seedVarieties[0].value
  );
  const [seedVarietyLimit, setSeedVarietyLimit] = useState<string>("");
  const [totalSeedLimit, setTotalSeedLimit] = useState<string>("");

  const [formData, setFormData] = useState<ClassificationTask>({
    seedsVarietyLimit:
      seedVarietyLimit && seedVarietyLimit !== "0"
        ? Number(seedVarietyLimit)
        : null,
    totalSeedsLimit:
      totalSeedLimit && totalSeedLimit !== "0" ? Number(totalSeedLimit) : null,
    supplierId: null,
    technicalId: null,
    seedVarietyRequired: seedVariety,
  });

  const seedVarietyLimitOnChange = (text: string) => {
    const numberValue = text.replace(/[^0-9]/g, "");
    setSeedVarietyLimit(numberValue);
    setFormData((prev) => ({
      ...prev,
      seedsVarietyLimit: Number(numberValue),
    }));
  };

  const seedTotalLimitOnChange = (text: string) => {
    setTotalSeedLimit(text.replace(/[^0-9]/g, ""));
    setFormData((prev) => ({
      ...prev,
      totalSeedsLimit: Number(text.replace(/[^0-9]/g, "")),
    }));
  };

  const getTechnicals = async () => {
    const technicalList = await getTechnicalUsersHandler(
      "vivero-santo-domingo"
    );

    const technicalsDataList = technicalList.map((t) => ({
      name: t.name,
      value: t.id,
    }));
    setTechnicals(technicalsDataList);
  };

  const getProviders = async () => {
    const suppliersList = await getSuppliersHandler();
    setSuppliers(
      suppliersList.map((s) => ({
        name: s.name,
        value: s.id,
      }))
    );
  };

  // const getCurrentUserReference = async () => {
  //   const q = query(
  //     collection(db, USER_COLLECTION),
  //     where("email", "==", currentUser?.email)
  //   );

  //   const querySnapshot = await getDocs(q);

  //   const docs = querySnapshot.docs.map((doc) => doc.ref);

  //   setCurrentUserRef(docs[0]);
  // };

  useEffect(() => {
    // getCurrentUserReference();
    getTechnicals();
    getProviders();
  }, []);

  const taskRegistrationHandler = async () => {
    const authUser = getCurrentUser();

    const currentUser = await getUserByEmail(authUser?.email || "");

    try {
      setLoading(true);
      const classification: CreateClassification = {
        businessId: "vivero-santo-domingo",
        classificationData: {
          oocarpa: 0,
          psegoustrobus: 0,
          tecunumanii: 0,
        },
        startedAt: 0,
        finishedAt: 0,
        task: formData,
        userId: currentUser?.id || "",
      };

      await createSeedClassificationHandler(classification);

      alert("Tarea registrada correctamente");

      setFormData({
        seedsVarietyLimit: null,
        seedVarietyRequired: null,
        supplierId: null,
        technicalId: null,
        totalSeedsLimit: null,
      });
      setLoading(false);
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  };
  console.log({ technicals });
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
          testID="technical-picker"
          onValueChange={(itemValue: string) =>
            setFormData({ ...formData, technicalId: itemValue })
          }
          placeholder="Seleccionar técnico..."
          style={styles.picker}
          selectedValue={
            technicals.find((t) => t.value === formData.technicalId)?.value
          }
        >
          {technicals?.map((technical, index) => {
            return (
              <Picker.Item
                key={index}
                label={technical.name}
                value={technical.value}
              />
            );
          })}
        </Picker>
        <Text style={styles.label}>Proveedor de Semilla</Text>
        <Picker
          testID="supplier-picker"
          onValueChange={(itemValue: string, itemIndex) =>
            setFormData({ ...formData, supplierId: itemValue })
          }
          placeholder="Seleccionar Proveedor de Semilla..."
          style={styles.picker}
        >
          {suppliers?.map((supplier, index) => {
            return (
              <Picker.Item
                key={index}
                label={supplier.name}
                value={supplier.value}
              />
            );
          })}
        </Picker>
        <Text style={styles.label}>Variedad de Semilla</Text>
        <Picker
          testID="seed-variety-picker"
          onValueChange={(seedName: string) => {
            setSeedVariety(seedName);
            setFormData({ ...formData, seedVarietyRequired: seedName });
          }}
          placeholder="Seleccionar Variedad de semilla a seleccionar de Semilla..."
          style={styles.picker}
          selectedValue={seedVariety == null ? undefined : seedVariety}
        >
          {seedVarieties.map((seed, index) => {
            return (
              <Picker.Item key={index} label={seed.name} value={seed.value} />
            );
          })}
        </Picker>
        <Text style={styles.label}>
          Límite de Semillas por variedad a notificar
        </Text>
        <TextInput
          testID="variety-seed-limit"
          value={seedVarietyLimit}
          onChangeText={(seeds) => seedVarietyLimitOnChange(seeds)}
          numberOfLines={2}
          style={styles.seedsInput}
        />
        <Text style={styles.label}>
          Límite Total de Semilla para la clasificación
        </Text>
        <TextInput
          value={totalSeedLimit}
          onChangeText={(seeds) => seedTotalLimitOnChange(seeds)}
          numberOfLines={2}
          style={styles.seedsInput}
          testID="total-seed-limit"
        />
        <Pressable
          testID="pressable-form"
          style={styles.button}
          onPress={taskRegistrationHandler}
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
    borderRadius: 5,
    elevation: 3,
    backgroundColor: "#689BFF",
    marginTop: 20,
    width: 350,
    alignSelf: "center",
  },
  seedsInput: {
    alignSelf: "center",
    height: 50,
    width: 350,
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#ffff",
    padding: 10,
  },
});
