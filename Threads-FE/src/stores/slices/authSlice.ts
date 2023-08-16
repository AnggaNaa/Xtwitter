import { User } from "@/features/thread";
import { IAUTH } from "@/interface/auth";
import { setAuthToken } from "@/lib/api";
import { createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

const initialAuthState: { data: IAUTH } = {
  data: {
    id: 0,
    email: "",
    full_name: "",
    username: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    AUTH_LOGIN: (state, action) => {
      const payload = action.payload;
      console.log("redux authLogin :", payload);
      setAuthToken(payload.token);
      localStorage.setItem("token", payload.token);
      console.log(localStorage);

      (state.data.id = payload.user.id),
        (state.data.full_name = payload.user.full_name),
        (state.data.username = payload.user.username),
        (state.data.email = payload.user.email);

      // return state;
    },
    AUTH_CHECK: (state, action) => {
      const payload = action.payload;
      console.log("ini data redux authCheck :", payload);
      console.log(localStorage);

      (state.data.id = payload.user.id),
        (state.data.full_name = payload.user.full_name),
        (state.data.username = payload.user.username),
        (state.data.email = payload.user.email);
    },
    AUTH_ERROR: () => {
      localStorage.removeItem("token");
    },
    AUTH_LOGOUT: () => {
      localStorage.removeItem("token");
      const navigate = useNavigate();
      navigate("/login");
    },
  },
});
