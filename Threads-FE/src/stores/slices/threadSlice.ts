import { ThreadCard } from "@/features/thread";
import { createSlice } from "@reduxjs/toolkit";

export const initialThreadSlice: ThreadCard[] = [];

export const threadSlice = createSlice({
  name: "thread",
  initialState: initialThreadSlice,
  reducers: {
    GET_THREADS: (_, action) => {
      return action.payload;
    },
  },
});
