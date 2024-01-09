import axiosInstance from "./apiConfig";

export const getAllTodo = async (param) => {
  const response = await axiosInstance.get(`/todos`);
  return response.data;
};

export const createTodo = async (data) => {
  const response = await axiosInstance.post(`/todos`, data);
  return response.data;
};
export const deleteTodo = async (id) => {
  const response = await axiosInstance.delete(`/todos/${id}`);
  return response;
};
