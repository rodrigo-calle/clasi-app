import {
  createProductionAdministratorUser,
  createTechnicalUser,
  getUserById,
} from "../../services/users";
import {
  CreateProductionAdministratorUser,
  CreateTechnicalUser,
  UserResponse,
} from "../../types/users/types";

export const createTechnicalUserHandler = async (
  user: CreateTechnicalUser
): Promise<UserResponse> => {
  const newUser = await createTechnicalUser(user);

  const userData = await getUserById(newUser);
  return userData;
};

export const createProductionAdministratorHandler = async (
  user: CreateProductionAdministratorUser
): Promise<UserResponse> => {
  const newUser = await createProductionAdministratorUser(user);

  const userData = await getUserById(newUser);
  return userData;
};
