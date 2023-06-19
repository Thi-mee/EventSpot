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
  const [isLoading, setIsLoading] = useState(false);

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

  const getOrganizerEvents = useCallback(async (id, callback) => {
    setIsLoading(true);
    try {
      const res = await OrganizerService.getOrganizerEvents(id);
      if (callback) callback(res);
      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getOrganizerEventReservations = useCallback(
    async (organizerId, eventId, callback) => {
      setIsLoading(true);
      try {
        const res = await OrganizerService.getOrganizerEventReservations(
          organizerId,
          eventId
        );
        if (callback) callback(res);
        return res;
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const value = useMemo(
    () => ({
      isLoading,
      getOrganizerProfile,
      updateOrganizerProfile,
      getOrganizerEvents,
      getOrganizerEventReservations,
    }),
    [
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
