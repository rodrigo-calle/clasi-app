import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {
  CreateProductionAdministratorUser,
  CreateTechnicalUser,
  UserResponse,
} from "../types/users/types";
import { FIREBASE_AUTH, FIREBASE_DB } from "../server/FirebaseConfig";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;
const DB = FIREBASE_DB;
const AUTH = FIREBASE_AUTH;

export const createProductionAdministratorUser = async (
  user: CreateProductionAdministratorUser
) => {
  const newTechnicalData = {
    ...user,
    role: "production-administrator",
    createdBy: null,
    createdAt: Timestamp.now().seconds,
    businessId: "vivero-santo-domingo",
  };

  const userCollectionRef = collection(DB, "users");
  const newTechnicalUser = await addDoc(userCollectionRef, newTechnicalData);
  return newTechnicalUser.id;
};

export const createTechnicalUser = async (user: CreateTechnicalUser) => {
  const newTechnicalData = {
    ...user,
    role: "technical",
    createdBy: AUTH.currentUser?.email || null,
    createdAt: Timestamp.now().seconds,
    businessId: "vivero-santo-domingo",
  };

  const userCollectionRef = collection(DB, "users");
  const newTechnicalUser = await addDoc(userCollectionRef, newTechnicalData);
  return newTechnicalUser.id;
};

export const getTechnicalUsers = async (
  nurseryName: string
): Promise<UserResponse[]> => {
  const userCollectionRef = collection(DB, "users");
  const q = query(
    userCollectionRef,
    where("role", "==", "technical"),
    where("businessId", "==", nurseryName)
  );

  const technicals = await getDocs(q);

  if (technicals.empty) {
    return [];
  }

  const technicalsData = technicals.docs.map((doc) => {
    return {
      ...(doc.data() as UserResponse),
      id: doc.id,
    };
  });

  return technicalsData;
};

export const getUserByEmail = async (email: string) => {
  const userCollectionRef = collection(DB, "users");
  const q = query(userCollectionRef, where("email", "==", email));

  const user = await getDocs(q);

  if (user.empty) {
    return null;
  }

  const userData = user.docs[0].data() as UserResponse;
  return {
    ...userData,
    id: user.docs[0].id,
  };
};

export const getUserById = async (id: string) => {
  const userCollectionRef = collection(DB, "users");

  const userRef = doc(userCollectionRef, id);
  const userDoc = await getDoc(userRef);

  const userData = userDoc.data() as UserResponse;
  return {
    ...userData,
    id: userDoc.id,
  };
};
