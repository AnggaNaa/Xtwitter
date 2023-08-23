import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Home from "@/pages/Home";
import { Threads } from "./pages/Threads";
import { DetailProject } from "./pages/DetailProject";
import SignUp from "./pages/Register";
import Login from "./pages/Login";
import { API, setAuthToken } from "./lib/api";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AUTH_CHECK, AUTH_ERROR } from "./stores/rootReducer";
import { useSelector } from "react-redux";
import { RootState } from "./stores/types/rootState";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function authCheck() {
    try {
      setAuthToken(localStorage.token);
      const response = await API.get("/auth/check");
      dispatch(AUTH_CHECK(response.data));
      console.log("auth check berhasil", response);
      setIsLoading(false);
    } catch (err) {
      dispatch(AUTH_ERROR());

      setIsLoading(false);
      navigate("/login");
      console.log("auth error:", err);
    }
  }

  useEffect(() => {
    if (localStorage.token) {
      authCheck();
    } else {
      setIsLoading(false);
      // navigate("/login");
    }
  }, []);

  function IsLogin() {
    if (!auth.data.username) {
      return <Navigate to={"/login"} />;
    } else {
      return <Outlet />;
    }
  }

  function IsNotLogin() {
    if (auth.data.username) {
      return <Navigate to={"/"} />;
    } else {
      return <Outlet />;
    }
  }

  return (
    <>
      {isLoading ? null : (
        <Routes>
          <Route path="/" element={<IsLogin />}>
            <Route path="/" element={<Home />}>
              <Route index element={<Threads />}></Route>
              <Route path="detail/:id" element={<DetailProject />}></Route>
            </Route>
          </Route>

          <Route path="/" element={<IsNotLogin />}>
            <Route path="registrasi" element={<SignUp />}></Route>
            <Route path="login" element={<Login />}></Route>
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
