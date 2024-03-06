import { User } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface UserState {
  token: string | null;
  currentUser: User | null;
}

const initialState = {
  token: null,
  currentUser: null,
} satisfies UserState as UserState;
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.currentUser = null;
      state.token = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.currentUser;
export default userSlice.reducer;
