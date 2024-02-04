import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/schema/user";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

export type AuthState = {
  user: User | undefined;
};

const initialState: AuthState = {
  user: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState["user"]>) => {
      state.user = action.payload;
    },
  },
});

const persistConfig = {
  key: "redux.auth",
  storage,
};

export const persistedAuthSlice = persistReducer(
  persistConfig,
  authSlice.reducer
);
