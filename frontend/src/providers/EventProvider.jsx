import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { eventService } from "../services/eventService";

const EventContext = createContext();

const EventProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const createEvent = useCallback(async (event, callback) => {
    setIsLoading(true);
    try {
      const res = await eventService.createEvent(event);
      if (callback) callback(res);
      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getEvents = useCallback(async (callback) => {
    setIsLoading(true);
    try {
      const res = await eventService.getEvents();
      if (callback) callback(res);
      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getEvent = useCallback(async (id, callback) => {
    setIsLoading(true);
    try {
      const res = await eventService.getEvent(id);
      if (callback) callback(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateEvent = useCallback(async (event, callback) => {
    setIsLoading(true);
    try {
      const res = await eventService.updateEvent(event);
      if (callback) callback(res);
      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteEvent = useCallback(async (id, callback) => {
    setIsLoading(true);
    try {
      const res = await eventService.deleteEvent(id);
      if (callback) callback(res);
      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      isLoading,
      createEvent,
      getEvents,
      getEvent,
      updateEvent,
      deleteEvent,
    }),
    [isLoading, createEvent, getEvent, getEvents, updateEvent, deleteEvent]
  );

  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
};

export const useEventContext = () => useContext(EventContext);
export default EventProvider;
