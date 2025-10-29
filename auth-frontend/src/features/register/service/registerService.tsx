import type { User } from "../../../types";
import { api } from "./api";

export const registerUser = async (userData: User) => {
    const response = await api.post("/user", userData);
    return response.data;
};
