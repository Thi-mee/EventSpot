import { useEffect } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { isAuthorized } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

const withAuth = (Component) => {
  return (props) => {
    const navigate = useNavigate();
    const { client, isLoading } = useAuth();

    useEffect(() => {
      if (!isLoading && !client) {
        navigate("/", { replace: true });
      } else if (
        client !== null &&
        !isAuthorized(client, window.location.pathname)
      ) {
        navigate("/" + client.role + "/dashboard", { replace: true });
      }
    }, [client, isLoading, navigate]);

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <Component
        {...props}
        user={client}
        isLoading={isLoading}
        navigate={navigate}
      />
    );
  };
};

export default withAuth;
