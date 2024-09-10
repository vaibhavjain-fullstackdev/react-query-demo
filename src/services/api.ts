import axios from "axios";
import { ToDo } from "../types/todo";

const BASE_URL = "http://localhost:8080";
const axiosInstance = axios.create({
    baseURL: BASE_URL
})

export const getToDosIds = async () => {
    return (await axiosInstance.get<ToDo[]>('todos')).data.map(todo => todo.id);
}

export const getToDo = async (id: number) => {
    return (await axiosInstance.get<ToDo>(`todos/${id}`)).data;
}