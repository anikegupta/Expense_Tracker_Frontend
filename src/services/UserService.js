import { axiosInstance } from "../utils/AxiosHelper";

// Create user
export const createUser = async (userObject) => {
  const response = await axiosInstance.post(`/auth/register`, userObject);
  return response.data;
};

// Get profile
export const getUserProfile = async () => {
  const res = await axiosInstance.get("/user/profile");
  return res.data;
};

// ✅ Update profile (only provided fields)
export const updateUserProfile = async (data) => {
  const res = await axiosInstance.put("/user/profile", data);
  return res.data;
};
export const deleteAvatar = async () => {
  const res = await axiosInstance.delete("/user/profile/avatar");
  return res.data;
};
