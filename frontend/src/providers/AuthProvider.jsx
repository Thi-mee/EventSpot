import {
  createContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
  useContext,
} from "react";
import { authService } from "../services/authService";

// Create a new context for authentication
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [client, setClient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleAuthenticationError = useCallback((errorMessage) => {
    setError(errorMessage);
    setClient(null);
    localStorage.removeItem("token");
  }, []);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const client = await authService.getUser();
        setClient(client);
      } catch (error) {
        handleAuthenticationError(error.message);
      }
    };
    checkAuthentication().then(() => setIsLoading(false));
  }, [handleAuthenticationError]);

  const registerUser = useCallback(
    async (data) => {
      setIsLoading(true);
      try {
        const { name, email, password, password_confirmation } = data;
        const user = await authService.registerUser(
          name,
          email,
          password,
          password_confirmation
        );
        setClient(user);
      } catch (error) {
        handleAuthenticationError(error.message);
      } finally {
        setIsLoading(false);
      }
    },
    [handleAuthenticationError]
  );

  const registerOrganizer = useCallback(
    async (name, email, phoneNo, password, password_confirmation) => {
      setIsLoading(true);
      try {
        const user = await authService.registerOrganizer(
          name,
          email,
          password,
          password_confirmation,
          phoneNo
        );
        setClient(user);
      } catch (error) {
        handleAuthenticationError(error.message);
      }
      setIsLoading(false);
    },
    [handleAuthenticationError]
  );

  const loginUser = useCallback(
    async (email, password) => {
      setIsLoading(true);
      try {
        const user = await authService.loginUser(email, password);
        setClient(user);
      } catch (error) {
        handleAuthenticationError(error.message);
      } finally {
        setIsLoading(false);
      }
    },
    [handleAuthenticationError]
  );

  const loginOrganizer = useCallback(
    async (email, password) => {
      setIsLoading(true);
      try {
        const user = await authService.loginOrganizer(email, password);
        setClient(user);
      } catch (error) {
        handleAuthenticationError(error.message);
      } finally {
        setIsLoading(false);
      }
    },
    [handleAuthenticationError]
  );

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (error) {
      handleAuthenticationError(error.message);
    } finally {
      window.location.pathname = "/";
      window.location.reload();
      setClient(null);
    }
  }, [handleAuthenticationError]);

  const value = useMemo(
    () => ({
      client,
      loginUser,
      loginOrganizer,
      logout,
      registerUser,
      registerOrganizer,
      isLoading,
      error,
      setError,
    }),
    [
      client,
      isLoading,
      error,
      loginUser,
      loginOrganizer,
      logout,
      registerUser,
      registerOrganizer,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
