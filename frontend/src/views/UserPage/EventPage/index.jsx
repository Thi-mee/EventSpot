import React, { useEffect } from "react";
import { useEventContext } from "../../../providers/EventProvider";
import { useParams } from "react-router-dom";
import withAuth from "../../../components/HOC/withAuth";
import style from "./style.module.css";
import { useReservationContext } from "../../../providers/ReservationProvider";

const EventPage = () => {
  const { events, getEvents, isLoading: isEventLoading } = useEventContext();
  const { isLoading, createReservation } = useReservationContext();
  const id = useParams().id;
  const event = events.find((event) => event._id === id);
  const [value, setValue] = React.useState(1);
  const [modal, setModal] = React.useState(false);

  useEffect(() => {
    if (!event) {
      getEvents();
    }
  }, [event, getEvents]);

  if (isEventLoading) {
    return <p>Loading...</p>;
  }

  const onRegisterBtnClick = () => {
    setModal(true);
  };
  const showLoader = () => {
    if (isLoading) {
      return <div className={style.loader}>
        <div className=""></div>
        <div className=""></div>
        <div className=""></div>
      </div>;
    }
    return null;
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (value > event.totalNumberOfSeats) {
      alert("You can't reserve more than the total number of seats");
    } else {
      createReservation({
        event: event._id,
        seats: value,
      }, (res) => {
        alert("Reservation created successfully");
        setValue(1)
        setModal(false)
      })
    }
  };


  return (
    <div className={style.page}>
      <header>
        <div className="container">
          <h1>{event?.name}</h1>
          <p>Description: {event?.description}</p>
        </div>
        <button className={style.ctab} onClick={onRegisterBtnClick}>Register</button>
      </header>
      <main>
        <h2>Event Details</h2>
        <div className={style.details}>
          <div className={style.details__item}>
            <h3>Event Date:</h3>
            <p>{event?.date}</p>
          </div>
          <div className={style.details__item}>
            <h3>Event Time:</h3>
            <p>{event?.time}</p>
          </div>
          <div className={style.details__item}>
            <h3>Event Location:</h3>
            <p>{event?.location}</p>
          </div>
          <div className={style.details__item}>
            <h3>Event Category:</h3>
            <p>{event?.category}</p>
          </div>
          <div className={style.details__item}>
            <h3>Event Type:</h3>
            <p>{event?.type}</p>
          </div>
          <div className={style.details__item}>
            <h3>Total seats:</h3>
            <p>{event?.totalNumberOfSeats}</p>
          </div>
          <div className={style.details__item}>
            <h3>Event Organizer:</h3>
            <p>{event?.organizerId.name}</p>
          </div>
          <div className={style.details__item}>
            <h3>Event Organizer email:</h3>
            <p>{event?.organizerId.email}</p>
          </div>
        </div>
      </main>
      <div className={`${style.modal}  ${modal ? style.show : null}`}>
        <div className={style.modal__content}>
          <button className={style.close} onClick={() => setModal(false)}> &times;</button>
          <h2>Register for {event?.name}</h2>
          <form onSubmit={onSubmit}>
            <div className={style.form__group}>
              <label htmlFor="seats">No of Reservations</label>
              <input type="number" id="seats" value={value} onChange={onChange}/>
              <p className={style.helperText}>Please enter the number of reservations you need </p>
            </div>
            <button className={style.btn}>
              Register
            </button>
          </form>
        </div>
      </div>
      {showLoader()}
    </div>
  );
};

export default withAuth(EventPage);
