export const initializeApp = jest.fn();
export const getAuth = jest.fn().mockReturnValue({
  signOut: jest.fn(),
  currentUser: { email: "test@example.com" },
});
export const getFirestore = jest.fn();
export const collection = jest.fn();
export const query = jest.fn();
export const where = jest.fn();
export const getDocs = jest.fn();
export const Timestamp = {
  now: jest.fn().mockReturnValue({
    toMillis: jest.fn().mockReturnValue(Date.now()),
  }),
};
