import axios from "axios";

export interface UserType {
  email: string;
  password: string;
}

export const registerUser = async (input: UserType) => {
  const { data } = await axios.post("http://localhost:3001/user", input, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data;
};
