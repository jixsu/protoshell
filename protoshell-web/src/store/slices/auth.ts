import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/schema/user";

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
