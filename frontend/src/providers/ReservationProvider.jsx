import {
  useCallback,
  useState,
  useContext,
  createContext,
  useMemo,
} from "react";
import { reservationService } from "../services/reservationService";

const ReservationContext = createContext();
const ReservationProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const createReservation = useCallback(async (reservation, callback) => {
    setIsLoading(true);
    try {
      const res = await reservationService.createReservation(reservation);
      if (callback) callback(res);
      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getReservation = useCallback(async (id, callback) => {
    setIsLoading(true);
    try {
      const res = await reservationService.getReservation(id);
      if (callback) callback(res);
      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateReservation = useCallback(async (reservation, callback) => {
    setIsLoading(true);
    try {
      const res = await reservationService.updateReservation(reservation);
      if (callback) callback(res);
      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteReservation = useCallback(async (id, callback) => {
    setIsLoading(true);
    try {
      const res = await reservationService.deleteReservation(id);
      if (callback) callback(res);
      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reserveAsGuest = useCallback(async (reservation, callback) => {
    setIsLoading(true);
    try {
      const res = await reservationService.reserveAsGuest(reservation);
      if (callback) callback(res);
      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = useMemo(() => {
    return {
      isLoading,
      createReservation,
      getReservation,
      updateReservation,
      deleteReservation,
      reserveAsGuest,
    };
  }, [
    isLoading,
    createReservation,
    getReservation,
    updateReservation,
    deleteReservation,
    reserveAsGuest,
  ]);

  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  );
};

export default ReservationProvider;
export const useReservationContext = () => useContext(ReservationContext);
