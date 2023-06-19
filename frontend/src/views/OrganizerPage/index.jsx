import React from "react";
import { Link } from "react-router-dom";
import withOrganizerAuthentication from "../../components/HOC/withAuth";
import style from "./style.module.css";

const OrganizerPage = () => {
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
              <p>0</p>
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
            <div className={style.event}>
              {/* <div className="event__image"></div> */}
              <div className={style.event__details}>
                <h3>Event Name</h3>
                <p>Date: Jan 3, 2023</p>
                <p>Event Location</p>
              </div>
            </div>
            <div className={style.event}>
              {/* <div className="event__image"></div> */}
              <div className={style.event__details}>
                <h3>Event Name</h3>
                <p>Date: Jan 3, 2023</p>
                <p>Event Location</p>
              </div>
            </div>
            <div className={style.event}>
              {/* <div className="event__image"></div> */}
              <div className={style.event__details}>
                <h3>Event Name</h3>
                <p>Date: Jan 3, 2023</p>
                <p>Event Location</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default withOrganizerAuthentication(OrganizerPage);
