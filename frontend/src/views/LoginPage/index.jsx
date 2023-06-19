import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { Form, FormContent, FormHeader } from "../../components/form";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "../../components/card";

const LoginPage = () => {
  const { client, loginUser, loginOrganizer, isLoading, error } = useAuth();
  const userRef = useRef("user");
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState("a User");

  useEffect(() => {
    if (location.search === "?organizer") {
      userRef.current = "organizer";
      setRole("an Organizer");
    }

    if (client) {
      const { from } = location.state || {
        from: { pathname: "/" + client.role + "/dashboard" },
      };
      navigate(from.pathname);
    }
  }, [client, navigate, location.state, location.search]);

  const handleLogin = async (formdata) => {
    const { email, password } = formdata;
    if (userRef.current === 'organizer') {
      await loginOrganizer(email, password, "organizer");
      return;
    }
    await loginUser(email, password);
  };

  return (
    // Login UI
    <div className="LoginPage">
      <Card>
        <Form
          initialState={{ email: "", password: "" }}
          onSubmit={handleLogin}
          required>
          <FormHeader
            title={`Login as ${role}`}
            subtitle="Please fill in credentials to continue"
            error={error}
          />
          <FormContent>
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
            {/* <CheckboxField name="rememberMe" label="Remember Me" /> */}
            <Form.SubmitBtn text="Login" fullWidth />
          </FormContent>
        </Form>
        {isLoading && <p>Loading...</p>}
      </Card>
    </div>
  );
};

export default LoginPage;
