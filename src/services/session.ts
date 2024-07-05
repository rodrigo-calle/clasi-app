import { User } from "firebase/auth";
import { FIREBASE_AUTH } from "../server/FirebaseConfig";

export const logout = async (): Promise<void> => {
  return await FIREBASE_AUTH.signOut();
};

export const getCurrentUser = (): User | null => {
  return FIREBASE_AUTH.currentUser;
};

