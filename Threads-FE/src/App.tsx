import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import { Threads } from "./pages/Threads";
import { DetailProject } from "./pages/DetailProject";
import SignUp from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Threads />}></Route>
            <Route path="detail/:id" element={<DetailProject />}></Route>
          </Route>
          <Route path="registrasi" element={<SignUp />}></Route>
          <Route path="login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
