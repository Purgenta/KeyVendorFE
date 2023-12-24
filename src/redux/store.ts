import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice from "./authSlice/authSlice";
import { vendorApi } from "./api/vendorApi";
import { categoryApi } from "./api/categoryApi";

export const store = configureStore({
  reducer: {
    [vendorApi.reducerPath]: vendorApi.reducer,
    auth: authSlice,
  },
  middleware: (getdefaultMiddleware) => {
    return (
      getdefaultMiddleware().concat(categoryApi.middleware),
      getdefaultMiddleware().concat(vendorApi.middleware)
    );
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
