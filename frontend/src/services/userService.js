import axios from "axios";
import { handleServerErrors } from "../utils/errors";


const getUserProfile = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleServerErrors(error);
  }
}

const updateUserProfile = async (user) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/users/${user.id}`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleServerErrors(error);
  }
}

const getUserReservations = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/${id}/reservations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleServerErrors(error);

  }
}


export {
  getUserProfile,
  updateUserProfile,
  getUserReservations
};