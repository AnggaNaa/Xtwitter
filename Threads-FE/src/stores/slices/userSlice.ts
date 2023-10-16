import { User } from "@/features/thread";
import { IAUTH } from "@/interface/auth";
import { createSlice } from "@reduxjs/toolkit";

const initialThreadSlice: { userThreads: IAUTH[] } = { userThreads: [] };

export const userThreadSlice = createSlice({
  name: "users",
  initialState: initialThreadSlice,
  reducers: {
    GET_USER_THREADS: (state, action) => {
      state.userThreads = action.payload;
    },
  },
});
