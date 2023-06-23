import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import withAuth from "../../components/HOC/withAuth";
import style from "./style.module.css";
import { useOrganizerContext } from "../../providers/OrganizerProvider";

const OrganizerPage = ({ user, navigate }) => {
  const { organizerEvents, getOrganizerEvents, isLoading } =
    useOrganizerContext();

  useEffect(() => {
    if (!organizerEvents.length) {
      getOrganizerEvents(user?._id);
    }
  }, [organizerEvents, getOrganizerEvents, user?._id]);

  if (isLoading) {
    return (
      <div className={style.skeleton}>
        <header>
          <h1>Dashboard</h1>
          <Link to="/organizer/create-event" className={style.fixedCtab}>
            Create Event
          </Link>
        </header>
        <main>
          <span></span><span></span>
        </main>
      </div>
    );
  }

  return (
    <div className={style.page}>
      <header>
        <h1>Dashboard</h1>
        <Link to="/organizer/create-event" className={style.fixedCtab}>
          Create Event
        </Link>
      </header>
      <main>
        <div className={style.left}>
          <h2>Analytics</h2>
          <div className={style.analytics}>
            <div className={style.analytics__item}>
              <h3>Active Events</h3>
              <p>{organizerEvents.length}</p>
            </div>
            <div className={style.analytics__item}>
              <h3>Upcoming Events</h3>
              <p>0</p>
            </div>
            <div className={`${style.analytics__item} ${style.full}`}></div>
          </div>
        </div>
        <div className={style.right}>
          <h2>Upcoming Events</h2>
          <div className={style.events}>
            {organizerEvents.slice(0, 2).map((event) => (
              <div className={style.event} key={event._id}>
                {/* <div className="event__image"></div> */}
                <div className={style.event__details}>
                  <h3>{event.name}</h3>
                  <p>Date: {event.date}</p>
                  <p>Event Location: {event.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default withAuth(OrganizerPage);
