import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

export function setAuthToken(Authorization: string) {
  if (Authorization) {
    API.defaults.headers.common["Authorization"] = `Bearer ${Authorization}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
}

//sebelumnya parameternya token
