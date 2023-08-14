import { User } from "@/features/thread";
import { createSlice } from "@reduxjs/toolkit";

const initialAuthState: User = {
  id: 0,
  email: "",
  full_name: "",
  profile_picture: "",
  username: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    AUTH_LOGIN: (state, action) => {},
    AUTH_CHECK: (state, action) => {},
    AUTH_ERROR: (state) => {},
    AUTH_LOGOUT: (state) => {},
  },
});
