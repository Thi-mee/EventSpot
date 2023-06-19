import RegistrationCard from "./RegistrationCard";
import { registerView } from "../helper";
import style from "../Register.module.css";
import { useNavigate } from "react-router-dom";


const ChooseRegistrationType = ({ setView }) => {
  const navigate = useNavigate();

  return (
    <>
      <h1 className={style.h1}>What would you be registering as?</h1>
      <div className={`ctn-flex equal-children ${style.flexCtn}`}>
        <div className="flexItem">
          <RegistrationCard
            image="/regular-user-image.png"
            title="A Regular User"
            description="Allows you to browse and discover events, save events, view event details, reserve events, manage reservations, recieve updates, provide feedbacks and reviews and save favouritr events."
            onClick={() => {
              console.log("User");
              navigate("#user", { replace: true });
              setView(registerView.User);
            }}
          />
        </div>
        <div className="flexItem">
          <RegistrationCard
            image="/organizer-image.png"
            title="An Organizer"
            description="Allows you to create and manage  events, set reservation options, track reservations, manage attendee Information, promote and market events, and receieve feedbacks and reviews."
            onClick={() => {
              console.log("Organizer");
              navigate("#organizer");
              setView(registerView.Organizer);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ChooseRegistrationType;
