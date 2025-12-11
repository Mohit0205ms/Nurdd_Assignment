import axios from "axios";

export const loginReqres = async (email: string, password: string) => {
  // Using ReqRes mock auth endpoint
  const res = await axios.post("https://reqres.in/api/login", { email, password });
  return res.data; // { token: '...' }
};

export const signupReqres = async (email: string, password: string) => {
  // Using ReqRes mock register endpoint
  const res = await axios.post("https://reqres.in/api/register", { email, password });
  return res.data; // { id: number, token: '...' }
};
