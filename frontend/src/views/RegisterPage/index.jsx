import { useLocation } from "react-router-dom";
import ChooseRegistrationType from "./components/ChooseRegistrationType";
import OrganizerRegistrationForm from "./components/OrganizerRegistrationForm";
import UserRegistrationForm from "./components/UserRegistrationForm";
import { registerView } from "./helper";
import { useEffect, useState } from "react";

const RegisterPage = () => {
  const location = useLocation();
  const [view, setView] = useState(() => {
    const hash = location.hash;
    if (hash === "#organizer") return registerView.Organizer;
    if (hash === "#user") return registerView.User;
    return registerView.Choose;
  });

  useEffect(() => {
    const handleBackButtonClicked = (e) => {
      e.preventDefault();
      if (view === registerView.Choose) return;
      setView(registerView.Choose);
    };

    window.addEventListener("popstate", handleBackButtonClicked);
    return () => {
      window.removeEventListener("popstate", handleBackButtonClicked);
    };
  }, [view]);

  return (
    <div className="RegisterPage">
      <div className="container">
        {view === registerView.Choose ? (
          <ChooseRegistrationType setView={setView} />
        ) : null}
        {view === registerView.Organizer ? (
          <OrganizerRegistrationForm setView={setView} />
        ) : null}
        {view === registerView.User ? (
          <UserRegistrationForm setView={setView} />
        ) : null}
      </div>
    </div>
  );
};

export default RegisterPage;
