import {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useState,
} from "react";
import { UserService } from "../services/userService";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [reservations, setReservations] = useState([]);

  const getUserProfile = useCallback(async (id, callback) => {
    setIsLoading(true);
    try {
      const res = await UserService.getUserProfile(id);
      if (callback) callback(res);
      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateUserProfile = useCallback(async (user, callback) => {
    setIsLoading(true);
    try {
      const res = await UserService.updateUserProfile(user);

      if (callback) callback(res);
      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getUserReservations = useCallback(async (id) => {
    setIsLoading(true);
    try {
      const res = await UserService.getUserReservations(id);
      console.log(res);
      setReservations(res.reservations);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = useMemo(() => {
    return {
      isLoading,
      getUserProfile,
      updateUserProfile,
      getUserReservations,
      reservations,
    };
  }, [
    isLoading,
    getUserProfile,
    updateUserProfile,
    getUserReservations,
    reservations,
  ]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
export const useUserContext = () => useContext(UserContext);
