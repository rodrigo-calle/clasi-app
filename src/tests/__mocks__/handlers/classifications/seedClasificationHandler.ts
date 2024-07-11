export const getSeedClassification = jest.fn().mockResolvedValue({
  status: 200,
  data: {
    class: "tecunumanii",
    confidence: 0.95,
  },
});


export const getCurrentUser = jest.fn().mockResolvedValue({
    email: "test@example.com"
})