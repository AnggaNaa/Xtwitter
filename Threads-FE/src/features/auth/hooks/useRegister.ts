import { User } from "@/features/thread";
import { API } from "@/lib/api";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface ICreateUser {
  username: string;
  full_name: string;
  email: string;
  password: string;
}

export function useRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorAlert, setErrorAlert] = useState("");
  const [successAlert, setSuccessAlert] = useState("");

  const [_, setUser] = useState<User[]>([]);
  const [form, setForm] = useState<ICreateUser>({
    username: "",
    full_name: "",
    email: "",
    password: "",
  });

  const fetchData = async () => {
    try {
      const response = await API.get("/user");
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await API.post("/user", form);
      // {
      //   username: form.username,
      //   full_name: form.full_name,
      //   email: form.email,
      //   password: form.password,
      // });
      console.log(response.data, "ini post");
      setForm({
        username: "",
        full_name: "",
        email: "",
        password: "",
      });
      setSuccessAlert("Registrasi berhasil!");
      setErrorAlert("");

      // toast({
      //   title: "Registrasi Berhasil",
      // });
      fetchData();
    } catch (err: any) {
      if (err.response && err.response.data) {
        setErrorAlert(err.response.data.error);
      } else {
        setErrorAlert("Terjadi kesalahan pada server");
      }

      // toast({
      //   title: "Email already exists",
      //   status: "error",
      // });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return {
    handleSubmit,
    changeHandler,
    setErrorAlert,
    setShowPassword,
    errorAlert,
    successAlert,
    showPassword,
    form,
  };
}
