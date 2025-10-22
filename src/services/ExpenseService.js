import { serverBaseUrl } from "../config/config";
import axios from 'axios'
import { axiosInstance } from "../utils/AxiosHelper";

export const getExpenses = async (minPrice="",maxPrice="",fromDate="",toDate="") => {
  const response = await axiosInstance.get(`/expenses?minPrice=${minPrice}&maxPrice=${maxPrice}`);

  return response.data;
};
export const getSortedExpenses = async (fromDate="",toDate="") => {
  const response = await axiosInstance.get(`/expenses?fromDate=${fromDate}&toDate=${toDate}`);

  return response.data;
};

//creating expense

export const createExpense = async (expenseData) => {
  const response = await axiosInstance.post(`/expenses`, expenseData);

  return response.data;
};

export const deleteExpenses = async (expenseId) => {
  const response = await axiosInstance.delete(`/expenses/${expenseId}`);
  return response.data;
}

export const updateExpense = async (expenseId, expenseData) => {
  const response = await axiosInstance.put(`/expenses/${expenseId}`, expenseData);
  return response.data;
}