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
import { FIREBASE_AUTH, FIREBASE_DB } from "../server/FirebaseConfig";
import { CreateSupplier, SupplierResponse } from "../types/suppliers/types";

const DB = FIREBASE_DB;
const AUTH = FIREBASE_AUTH;

export const createSupplier = async (
  supplier: CreateSupplier
): Promise<string> => {
  const supplierCollectionRef = collection(DB, "suppliers");
  const newSupplierData = {
    ...supplier,
    createdBy: AUTH.currentUser?.email || null,
    createdAt: Timestamp.now().seconds,
    businessId: "vivero-santo-domingo",
  };
  const newSupplier = await addDoc(supplierCollectionRef, newSupplierData);
  return newSupplier.id;
};

export const getSuppliers = async (): Promise<SupplierResponse[]> => {
  const supplierCollectionRef = collection(DB, "suppliers");
  const q = query(
    supplierCollectionRef,
    where("businessId", "==", "vivero-santo-domingo")
  );
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return [];
  }

  const suppliers = querySnapshot.docs.map((doc) => {
    const data = doc.data() as SupplierResponse;
    return {
      ...data,
      id: doc.id,
    };
  });

  return suppliers;
};

export const getSupplierById = async (
  supplierId: string
): Promise<SupplierResponse> => {
  const supplierCollectionRef = collection(DB, "suppliers");
  const supplierDoc = await getDoc(doc(supplierCollectionRef, supplierId));

  if (!supplierDoc.exists()) {
    throw new Error("Supplier not found");
  }

  return {
    ...(supplierDoc.data() as SupplierResponse),
    id: supplierDoc.id,
  };
};
