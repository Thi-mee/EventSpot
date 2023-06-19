import axios from "axios";
import { handleServerErrors } from "../utils/errors";


const createReservation = async (reservation) => {
  try {
    const token = localStorage.getItem("token");
    const endPoint = `${process.env.REACT_APP_API_URL}/reservations`
    const response = await axios.post(endPoint, reservation, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleServerErrors(error);
    // throw new Error("Reservation not created");
  }
};

const getReservation = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const endPoint = `${process.env.REACT_APP_API_URL}/reservations/${id}`
    const response = await axios.get(endPoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleServerErrors(error);
    // throw new Error("Reservations not found");
  }
};

const updateReservation = async (reservation) => {
  try {
    const token = localStorage.getItem("token");
    const endPoint = `${process.env.REACT_APP_API_URL}/reservations/${reservation.id}`
    const response = await axios.put(endPoint, reservation, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleServerErrors(error);
    // throw new Error("Reservation not updated");
  };
};

const deleteReservation = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const endPoint = `${process.env.REACT_APP_API_URL}/reservations/${id}`
    const response = await axios.delete(endPoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleServerErrors(error);
    // throw new Error("Reservation not deleted");
  }
};

const reserveAsGuest = async (reservation) => {
  try {
    const endPoint = `${process.env.REACT_APP_API_URL}/reservations/guest`
    const response = await axios.post(endPoint, reservation);
    return response.data;
  } catch (error) {
    handleServerErrors(error);
    // throw new Error("Reservation not created");
  }
}

export const reservationService = {
  createReservation,
  getReservation,
  updateReservation,
  deleteReservation,
  reserveAsGuest
};