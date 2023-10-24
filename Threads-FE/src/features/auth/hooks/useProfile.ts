import { User } from "@/features/thread";
import { API } from "@/lib/api";
import { AUTH_CHECK } from "@/stores/rootReducer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export function useProfile() {
  const [User, setUser] = useState<User>();
  const dispatch = useDispatch();

  async function getUserById() {
    try {
      //   const id = setAuthToken(localStorage.token);
      const id = useParams();

      const response = await API.get("/user/" + id);
      dispatch(AUTH_CHECK(response.data));
      setUser(response.data);
    } catch (err) {
      console.log("gagal mendapatkan user id", err);
    }
    useEffect(() => {
      getUserById();
    }, []);
  }
  return {
    User,
    getUserById,
  };
}
