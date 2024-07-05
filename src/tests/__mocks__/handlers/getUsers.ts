// __mocks__/handlers/users/getUsers.ts
export const getTechnicalUsersHandler = jest.fn().mockResolvedValue([
    { id: "tech1", name: "Technical User 1" },
    { id: "tech2", name: "Technical User 2" },
  ]);
  