import { User } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface UserState {
  currentUser: User | null;
}

const initialState = {
  currentUser: null,
} satisfies UserState as UserState;
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload.user;
    },
    logout: (state) => {
      state.currentUser = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.currentUser;
export default userSlice.reducer;
