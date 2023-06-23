import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { OrganizerService } from "../services/organizerService";

const OrganizerContext = createContext();
const OrganizerProvider = ({ children }) => {
  const [organizerEvents, setOrganizerEvents] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getOrganizerProfile = useCallback(async (id, callback) => {
    setIsLoading(true);
    try {
      const res = await OrganizerService.getOrganizerProfile(id);
      if (callback) callback(res);
      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateOrganizerProfile = useCallback(async (organizer, callback) => {
    setIsLoading(true);
    try {
      const res = await OrganizerService.updateOrganizerProfile(organizer);
      if (callback) callback(res);
      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getOrganizerEvents = useCallback(async (id) => {
    setIsLoading(true);
    try {
      const res = await OrganizerService.getOrganizerEvents(id);
      setOrganizerEvents(res.events);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getOrganizerEventReservations = useCallback(
    async (organizerId, eventId) => {
      setIsLoading(true);
      try {
        const res = await OrganizerService.getOrganizerEventReservations(
          organizerId,
          eventId
        );
        setReservations(res.reservations);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const clearReservations = useCallback(() => {
    setReservations([]);
  }, []);

  const value = useMemo(
    () => ({
      isLoading,
      getOrganizerProfile,
      updateOrganizerProfile,
      getOrganizerEvents,
      getOrganizerEventReservations,
      organizerEvents,
      reservations,
      clearReservations,
    }),
    [
      organizerEvents,
      reservations,
      clearReservations,
      isLoading,
      getOrganizerProfile,
      updateOrganizerProfile,
      getOrganizerEvents,
      getOrganizerEventReservations,
    ]
  );
  return (
    <OrganizerContext.Provider value={value}>
      {children}
    </OrganizerContext.Provider>
  );
};

export const useOrganizerContext = () => useContext(OrganizerContext);
export default OrganizerProvider;
