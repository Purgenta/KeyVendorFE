const apiEndpoints = {
  user: {
    create: "user/create",
    login: "auth/login",
  },
  auth: {
    login: "auth/login",
    verifyToken: (verifyToken: string) => `auth/${verifyToken}/completeLogin`,
  },
  vendor: {
    create: "vendor/create",
  },
  category: {
    rootCategories: "category/rootcategories",
    leafCategories: "category/all",
  },
};
export default apiEndpoints;
