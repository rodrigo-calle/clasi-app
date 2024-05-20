import { getTechnicalUsers, getUserByEmail } from "../../services/users";
import { UserResponse } from "../../types/users/types";

export const getTechnicalUsersHandler = async (
  nurseryName: string
): Promise<UserResponse[]> => {
  const technicals = await getTechnicalUsers(nurseryName);
  return technicals;
};

export const getTechnicalUserByEmailHandler = async (
  email: string
): Promise<UserResponse | null> => {
  const technical = await getUserByEmail(email);
  return technical;
};
