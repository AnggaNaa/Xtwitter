import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./slices";
import { threadSlice } from "./slices/threadSlice";

export const { AUTH_CHECK, AUTH_LOGIN, AUTH_ERROR, AUTH_LOGOUT } =
  authSlice.actions;
export const { GET_THREADS } = threadSlice.actions;

export const authReducer = authSlice.reducer;
export const threadReducer = threadSlice.reducer;

const rootReducer = combineReducers({
  auth: authReducer,
  thread: threadReducer,
});

export default rootReducer;
