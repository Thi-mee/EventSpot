import axios from "axios";
import { handleServerErrors } from "../utils/errors";


const createEvent = async (event) => {
  try {
    const token = localStorage.getItem("token");
    const endPoint = `${process.env.REACT_APP_API_URL}/events`
    const response = await axios.post(endPoint, event, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleServerErrors(error);
    // throw new Error("Event not created");
    return { error: true  }
  }
};

const getEvents = async () => {
  try {
    const token = localStorage.getItem("token");
    const endPoint = `${process.env.REACT_APP_API_URL}/events`
    const response = await axios.get(endPoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleServerErrors(error);
    // throw new Error("Events not found");
  }
};

const getEvent = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const endPoint = `${process.env.REACT_APP_API_URL}/events/${id}`
    const response = await axios.get(endPoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleServerErrors(error);
    // throw new Error("Event not found");
  }
};

const getEventG = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const endPoint = `${process.env.REACT_APP_API_URL}/events/${id}/guest`
    const response = await axios.get(endPoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleServerErrors(error);
    // throw new Error("Event not found");
  }
};

const updateEvent = async (event) => {
  try {
    const token = localStorage.getItem("token");
    const endPoint = `${process.env.REACT_APP_API_URL}/events/${event.id}`
    const response = await axios.put(endPoint, event, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleServerErrors(error);
    // throw new Error("Event not updated");
  }
};

const deleteEvent = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const endPoint = `${process.env.REACT_APP_API_URL}/events/${id}`
    const response = await axios.delete(endPoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleServerErrors(error);
    // throw new Error("Event not deleted");
  }
};





export const eventService = {
  createEvent,
  getEvents,
  getEvent,
  getEventG,
  updateEvent,
  deleteEvent,
}