import style from "../Layout.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../../providers/AuthProvider";
import LinkTab from "./LinkTab";

const Sidebar = ({ title }) => {
  const { client } = useAuth();
  return (
    <aside className={style.sidebar}>
      <div className={style.positioner}>
        <div className={style.logo}>
          <Link to="/">
            <h1>{title}</h1>
          </Link>
        </div>
        <ul>
          {client?.role === "organizer" ? (
            <>
              <LinkTab
                to="/organizer/dashboard"
                iconName="home"
                text="Dashboard"
              />
              <LinkTab
                to="/organizer/create-event"
                iconName="add"
                text="Create Event"
              />
              <LinkTab
                to="/organizer/events"
                iconName="event"
                text="My Events"
              />
              <LinkTab
                to="/organizer/settings"
                iconName="settings"
                text="Settings"
              />
            </>
          ) : null}
          {client?.role === "user" ? (
            <>
              <LinkTab to="/user/dashboard" iconName="home" text="Dashboard" />
              <LinkTab to="/user/reservations" iconName="list" text="Reservations" />
              <LinkTab to="/user/events" iconName="event" text="Events" />
              <LinkTab
                to="/user/settings"
                iconName="settings"
                text="Settings"
              />
            </>
          ) : null}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
