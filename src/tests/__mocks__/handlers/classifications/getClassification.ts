// __mocks__/handlers/classifications/getClassification.ts
export const getClassificationsHandler = jest.fn().mockResolvedValue([
  {
    id: "1",
    createdAt: "2023-01-01",
    finishedAt: "2023-01-02",
    task: { technicalId: "tech1" },
  },
  {
    id: "2",
    createdAt: "2023-02-01",
    finishedAt: "2023-02-02",
    task: { technicalId: "tech2" },
  },
]);

