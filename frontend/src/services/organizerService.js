import axios from "axios";
import { handleServerErrors } from "../utils/errors";

const getOrganizerProfile = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/organizers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleServerErrors(error);
  }
}

const updateOrganizerProfile = async (organizer) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/organizers/${organizer.id}`, organizer, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleServerErrors(error);
  }
}

const getOrganizerEvents = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/organizers/${id}/events`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleServerErrors(error);
  }
}

const getOrganizerEventReservations = async (organizerId, eventId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/organizers/${organizerId}/events/${eventId}/reservations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleServerErrors(error);
  }
}


export const OrganizerService = { getOrganizerProfile, updateOrganizerProfile, getOrganizerEvents, getOrganizerEventReservations };