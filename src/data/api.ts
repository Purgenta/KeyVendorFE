const apiEndpoints = {
  user: {
    create: "user/create",
    login: "auth/login",
  },
  auth: {
    login: "auth/login",
    verifyToken: (verifyToken: string) => `auth/${verifyToken}/completeLogin`,
  },
};
export default apiEndpoints;
