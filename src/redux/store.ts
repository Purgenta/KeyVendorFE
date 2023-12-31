import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { emptySplitApi } from "./api/baseQuery";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    [emptySplitApi.reducerPath]: emptySplitApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(emptySplitApi.middleware),
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
