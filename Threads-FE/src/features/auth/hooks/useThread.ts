import { API } from "@/lib/api";
import { SET_THREAD_LIKE } from "@/stores/rootReducer";
import { RootState } from "@/stores/types/rootState";
import { useDispatch, useSelector } from "react-redux";

export function useThreadCard() {
  const dispatch = useDispatch();
  const threads = useSelector((state: RootState) => state.thread.threads);

  // function updateThreadswithLike(
  //   thread_id: number | undefined,
  //   threads: ThreadCard[]
  // ) {
  //   return new Promise((resolve, reject) => {
  //     const updateThreads: ThreadCard[] = [];

  //     threads.forEach((thread) => {
  //       let likes_count = thread.likes_count ?? 0;

  //       if (thread.is_liked) {
  //         likes_count = likes_count - 1;
  //       } else {
  //         likes_count = likes_count + 1;
  //       }

  //       if (thread.id === thread_id) {
  //         updateThreads.push({
  //           ...thread,
  //           is_liked: !thread.is_liked,
  //           likes_count: likes_count,
  //         });
  //       } else {
  //         updateThreads.push(thread);
  //       }

  //       if (updateThreadswithLike.length === 0) {
  //         reject(new Error("Data thread kosong"));
  //       }

  //       resolve(updateThreads);
  //     });
  //   });
  // }

  // async function handlerLikeClick(
  //   thread_id: number | undefined,
  //   is_liked: boolean | undefined
  // ) {
  //   try {
  //     if (!is_liked) {
  //       const response = await API.post("/like", { thread_id: thread_id });
  //       console.log("Berhasil tambah like", response.data);
  //     } else {
  //       const response = await API.delete(`/like/${thread_id}`);
  //       console.log("Berhasil hapus like", response.data);
  //     }
  //     const newThreads = await updateThreadswithLike(thread_id, threads);
  //     dispatch(GET_THREADS(newThreads));
  //   } catch (err) {
  //     console.log("gagal update like", err);
  //   }
  // }

  async function handlerLikeClick(id: number, isLiked: boolean) {
    try {
      if (!isLiked) {
        const response = await API.post("/like", { thread_id: id });
        dispatch(SET_THREAD_LIKE({ id: id, isLiked: isLiked }));
        console.log("berhasil menambahkan like", response.data);
      } else {
        const response = await API.delete(`/like/${id}`);
        dispatch(SET_THREAD_LIKE({ id: id, isLiked: isLiked }));
        console.log("berhasil delete like", response.data);
      }
    } catch (err) {
      console.log("gagal update like", err);
    }
  }

  return {
    threads,
    handlerLikeClick,
  };
}
