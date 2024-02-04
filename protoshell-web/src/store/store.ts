import { configureStore } from "@reduxjs/toolkit";
import { persistedAuthSlice } from "./slices/auth";
import { persistStore } from "redux-persist";

export const store = configureStore({
  reducer: {
    auth: persistedAuthSlice,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const getStore = () => store.getState();
export const dispatch = store.dispatch;
