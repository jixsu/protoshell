import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const getStore = () => store.getState();
export const dispatch = store.dispatch;
