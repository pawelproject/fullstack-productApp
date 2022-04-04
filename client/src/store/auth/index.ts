import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/User";

interface AuthState {
  token: string | null;
  username: string | null;
  role: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  username: null,
  token: null,
  role: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      localStorage.setItem("token", action.payload.token);
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.isLoggedIn = true;
    },
    clearState: (state) => {
      localStorage.removeItem("token");
      return initialState;
    },
  },
});

export const { setUser, clearState } = authSlice.actions;

export default authSlice.reducer;
