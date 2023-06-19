import { useAuth } from "../../providers/AuthProvider";
import { isAuthorized } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

const withAuth = (Component) => {
  return (props) => {
    const navigate = useNavigate();
    const { client, isLoading } = useAuth();

    if (isLoading) {
      return <p>Loading...</p>;
    } else if (!client) {
      navigate("/", { replace: true });
      return;
    }

    if (client && !isAuthorized(client, window.location.pathname)) {
      navigate("/" + client.role + "/dashboard", { replace: true });
      return;
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
