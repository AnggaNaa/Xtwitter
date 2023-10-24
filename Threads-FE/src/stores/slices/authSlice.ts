import { IAUTH } from "@/interface/auth";
import { setAuthToken } from "@/lib/api";
import { createSlice } from "@reduxjs/toolkit";

const initialAuthState: IAUTH = {
  id: 0,
  email: "",
  full_name: "",
  username: "",
  profile_picture: "",
  profile_description: "",
  profile_background: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    AUTH_LOGIN: (state, action) => {
      const {
        id,
        email,
        full_name,
        username,
        profile_picture,
        profile_description,
        profile_background,
        threads,
        followed_user_id,
      } = action.payload.user;

      const { token } = action.payload;

      setAuthToken(token);
      localStorage.setItem("token", token);

      state.id = id;
      state.username = username;
      state.full_name = full_name;
      state.email = email;
      state.profile_picture = profile_picture;
      state.profile_description = profile_description;
      state.profile_background = profile_background;
      state.threads = threads;
      state.follows = followed_user_id;
      // const payload = action.payload;
      // console.log("redux authLogin :", payload);
      // setAuthToken(payload.token);
      // localStorage.setItem("token", payload.token);
      // console.log(localStorage);

      // (state.id = payload.user.id),
      //   (state.full_name = payload.user.full_name),
      //   (state.username = payload.user.username),
      //   (state.email = payload.user.email);

      // return state;
    },
    AUTH_CHECK: (state, action) => {
      const {
        id,
        email,
        full_name,
        username,
        profile_picture,
        profile_description,
        profile_background,
        threads,
      } = action.payload.user;

      state.id = id;
      state.email = email;
      state.full_name = full_name;
      state.username = username;
      state.profile_picture = profile_picture;
      state.profile_description = profile_description;
      state.profile_background = profile_background;
      state.threads = threads;

      // const payload = action.payload;
      // console.log("ini data redux authCheck :", payload);
      // console.log(localStorage);

      // (state.id = payload.user.id),
      //   (state.full_name = payload.user.full_name),
      //   (state.username = payload.user.username),
      //   (state.email = payload.user.email);
    },
    AUTH_ERROR: () => {
      localStorage.removeItem("token");
    },
    AUTH_LOGOUT: () => {
      localStorage.removeItem("token");
      // state.data = {
      //   id: 0,
      //   email: "",
      //   full_name: "",
      //   username: "",
      // };
      return initialAuthState;
      // const navigate = useNavigate();
      // navigate("/login"); //dihapus
      //setAuthToken(null)
    },
  },
});
