import axios from "axios";
import { handleServerErrors } from "../utils/errors";

const registerUser = async (name, email, password, password_confirmation) => {
  try {
    const endPoint = `${process.env.REACT_APP_API_URL}/auth/user/register`
    const response = await axios.post(endPoint, { name, email, password, password_confirmation });
    const { token, user } = response.data;
    localStorage.setItem("token", token);
    return user;
  } catch (error) {
    handleServerErrors(error);
    // throw new Error("Registration failed");
  }
};
    
const loginUser = async (email, password) => {
  try {
    const endPoint = `${process.env.REACT_APP_API_URL}/auth/user/login`
    const response = await axios.post(endPoint, { email, password });
    const { token, user } = response.data;
    localStorage.setItem("token", token);
    return user;
  } catch (error) {
    handleServerErrors(error);
    // throw new Error("Login failed");
  }
};

const registerOrganizer = async (name, email, password, password_confirmation, phoneNo) => {
  try {
    const endPoint = `${process.env.REACT_APP_API_URL}/auth/organizer/register`
    const response = await axios.post(endPoint, { name, email, password, password_confirmation, phoneNo });
    const { token, user } = response.data;
    localStorage.setItem("token", token);
    return user;
  } catch (error) {
    handleServerErrors(error);
    // throw new Error("Registration failed");
  }
};

const loginOrganizer = async (email, password) => {
  try {
    const endPoint = `${process.env.REACT_APP_API_URL}/auth/organizer/login`
    const response = await axios.post(endPoint, { email, password });
    const { token, user } = response.data;
    localStorage.setItem("token", token);
    return user;
  } catch (error) {
    handleServerErrors(error);
    // throw new Error("Login failed");
  }
};

const getUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleServerErrors(error);
    // throw new Error("Login failed");
  }
};

const logout = async () => {
  try {
    localStorage.removeItem("token");
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`);
    return response.data;
  } catch (error) {
    handleServerErrors(error);
    // throw new Error("Login failed");
  }
};

export const authService = {
  registerUser,
  loginUser,
  registerOrganizer,
  loginOrganizer,
  getUser,
  logout
};
