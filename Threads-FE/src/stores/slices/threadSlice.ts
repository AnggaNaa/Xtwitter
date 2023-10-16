import { ThreadCard } from "@/features/thread";
import { createSlice } from "@reduxjs/toolkit";

const initialThreadSlice: { threads: ThreadCard[] } = { threads: [] };

export const threadSlice = createSlice({
  name: "thread",
  initialState: initialThreadSlice,
  reducers: {
    GET_THREADS: (state, action) => {
      state.threads = action.payload;
    },

    SET_THREAD_LIKE: (
      state,
      action: { payload: { id: number; isLiked: boolean } }
    ) => {
      const { id, isLiked } = action.payload;

      state.threads = state.threads.map((thread) => {
        if (thread.id === id) {
          return {
            ...thread,
            likes_count: isLiked
              ? thread.likes_count - 1
              : thread.likes_count + 1,
            is_liked: !isLiked,
          };
        }
        return thread;
      });
    },
  },
});
