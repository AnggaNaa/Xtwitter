import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Home from "@/pages/Home";
import { Threads } from "./pages/Threads";
import { DetailProject } from "./pages/DetailProject";
import SignUp from "./pages/Register";
import Login from "./pages/Login";
import { API, setAuthToken } from "./lib/api";
import { useEffect, useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  async function authCheck() {
    try {
      setAuthToken(localStorage.Authorization);
      const response = await API.get("/check");
      console.log("auth check berhasil", response);
      setIsLoading(false);
    } catch (err) {
      localStorage.removeItem("Authorization");
      setIsLoading(false);
      navigate("/login");
      console.log("auth error:", err);
    }
  }

  useEffect(() => {
    if (localStorage.Authorization) {
      authCheck();
    } else {
      setIsLoading(false);
      navigate("/login");
    }
  }, []);

  return (
    <>
      {isLoading ? null : (
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Threads />}></Route>
            <Route path="detail/:id" element={<DetailProject />}></Route>
          </Route>
          <Route path="registrasi" element={<SignUp />}></Route>
          <Route path="login" element={<Login />}></Route>
        </Routes>
      )}
    </>
  );
}

export default App;
