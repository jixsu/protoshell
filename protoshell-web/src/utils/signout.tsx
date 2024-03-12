import { authSlice } from "@/store/slices/auth";
import { sourcesSlice } from "@/store/slices/sources";
import { dispatch } from "@/store/store";

export const signout = () => {
  dispatch(authSlice.actions.setUser(undefined));
  dispatch(sourcesSlice.actions.clearSourceConfig());
};
