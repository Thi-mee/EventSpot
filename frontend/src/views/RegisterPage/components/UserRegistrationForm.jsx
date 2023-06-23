import { Form, FormHeader, FormContent } from "../../../components/form";
import Card from "../../../components/card";
import { useAuth } from "../../../providers/AuthProvider";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UserRegistrationForm = () => {
  const { isLoading, registerUser, client } = useAuth();
  
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (data) => {
    console.log(data);
    registerUser(data);
  };

  useEffect(() => {
    if (client) {
      const { from } = location.state || {
        from: { pathname: "/user/dashboard" },
      };
      navigate(from.pathname);
    }
  }, [client, navigate, location.state]);

  return (
    <div className="RegisterPage">
      {isLoading && <div style={{
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "1000",
        color: "white"
      }}>Registering...</div>}
      <Card width="medium">
        <Form initialState={{name: "", email: "", password: "", password_confirmation: ""}} onSubmit={handleLogin} required shouldValidate>
          <FormHeader
            title="Register as a User"
            subtitle="Please fill in credentials to continue."
          />
          <FormContent>
            <FormContent.TextField
              name="name"
              label="Name"
              placeholder="Name"
            />
            <FormContent.TextField
              name="email"
              label="Email"
              placeholder="Email"
              type="email"
            />
            <FormContent.TextField
              name="password"
              label="Password"
              placeholder="Password"
              type="password"
            />
            <FormContent.TextField
              name="password_confirmation"
              label="Confirm Password"
              placeholder="Password"
              type="password"
            />
            <Form.SubmitBtn text="Register" fullWidth />
          </FormContent>
        </Form>
      </Card>
      
    </div>
  );
};

export default UserRegistrationForm;
