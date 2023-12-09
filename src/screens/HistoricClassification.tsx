import React, { useEffect, useState } from "react";
import { FIREBASE_AUTH, FIREBASE_DB } from "../server/FirebaseConfig";
import { ScrollView, Text } from "react-native";
import {
  DocumentReference,
  Timestamp,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import HistoricCard from "../components/HistoricCard";
import Loading from "../components/Loading";
import {
  CLASSIFICATION_SESSION_COLLECTION,
  USER_COLLECTION,
} from "../contants/constants";
import { ClassificationType } from "../types/firebaseTypes";

const HistoricClassification = () => {
  const currentUser = FIREBASE_AUTH.currentUser;
  const db = FIREBASE_DB;
  const [openLoader, setOpenLoader] = useState<boolean>(false);
  const [classificationList, setClassificationList] = useState<
    ClassificationType[]
  >([]);

  const getClassificationListByUser = async () => {
    try {
      setOpenLoader(true);
      const q = query(
        collection(db, USER_COLLECTION),
        where("email", "==", currentUser?.email)
      );
      console.log({ ww: currentUser?.email });
      const querySnapshot = await getDocs(q);
      const user = querySnapshot.docs[0]?.ref;

      const classificationQuery = query(
        collection(db, CLASSIFICATION_SESSION_COLLECTION),
        where('user', "==", user)
      );

      const classificationQuerySnapshot = await getDocs(classificationQuery);

      if (!classificationQuerySnapshot.empty) {
        const classificationList: ClassificationType[] = [];

        classificationQuerySnapshot.forEach((doc) => {
          classificationList.push({
            user: doc.data().user,
            createdAt: doc.data().createdAt,
            finishedAt: doc.data().finishedAt,
            classifficationData: doc.data().classifficationData,
            id: doc.id,
          });
        });

        setClassificationList(classificationList);
      }
      setOpenLoader(false);
    } catch (error) {
      alert(error);
      setOpenLoader(false);
    }
  };

  useEffect(() => {
    getClassificationListByUser();
  }, [db]);

  return (
    <ScrollView
      scrollEnabled={true}
      style={{
        backgroundColor: openLoader ? "rgba(0,0,0,0.5)" : "white",
      }}
    >
      <Loading open={openLoader} text="Cargando..." />
      <Text
        style={{
          fontSize: 26,
          fontWeight: "bold",
          marginBottom: 20,
          alignSelf: "center",
          width: "80%",
        }}
      >
        Historial
      </Text>
      {classificationList.length > 0 ? (
        classificationList.map((classification, index) => {
          return (
            <HistoricCard
              key={index}
              code={classification.id}
              createdAt={classification.createdAt}
              finishedAt={classification.finishedAt}
            />
          );
        })
      ) : !openLoader ? (
        <Text>No hay clasificaciones registradas</Text>
      ) : null}
    </ScrollView>
  );
};

export default HistoricClassification;
