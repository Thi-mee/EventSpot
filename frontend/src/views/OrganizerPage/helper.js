import { eventService } from "../../services/eventService";

export const createEvent = async (data, callback) => {
  console.log(data);
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const res = await eventService.createEvent(token, data);
      if (callback) callback(res);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
};

// export const getEvents = async (callback) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     try {
//       const res = await eventService.getEvents(token);
//       if (callback) callback(res);
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }

export const getEventsByOrganizer = async callback => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const res = await eventService.getEventsByOrganizer(token);
      if (callback) callback(res);
    } catch (error) {
      console.log(error);
    }
  }
}