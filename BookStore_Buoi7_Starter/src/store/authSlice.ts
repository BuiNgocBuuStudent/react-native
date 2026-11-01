import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types";

interface AuthState {
  user: User | null;
  token: string | null;
}
const initialState: AuthState = { user: null, token: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // BT7.4a: Lưu thông tin user và token vào state
    setCredentials(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  
    updateUser(state, action: PayloadAction<Partial<User>>) {
      if (state.user) Object.assign(state.user, action.payload);
    },
  
    // BT7.4a: Xoá user và token khi đăng xuất
    logout(state) {
      state.user = null;
      state.token = null;
    },
  }
});

export const { setCredentials, updateUser, logout } = authSlice.actions;
export default authSlice.reducer;
