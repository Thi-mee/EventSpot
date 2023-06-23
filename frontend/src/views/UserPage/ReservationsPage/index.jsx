import React, { useEffect } from "react";
import { useUserContext } from "../../../providers/UserProvider";
import Card from "../../../components/card";
import style from "./style.module.css";
import withAuth from "../../../components/HOC/withAuth";

const ReservationsPage = () => {
  const { getUserReservations, isLoading, reservations } = useUserContext();

  useEffect(() => {
    if (!reservations.length) getUserReservations();
  }, [getUserReservations, reservations.length]);

  if (isLoading) {
    return <p>loading ...</p>;
  }

  return (
    <div>
      {console.log(reservations)}
      {reservations.length === 0 && <p>No reservations yet</p>}
      <div className={style.reservations}>
        {reservations?.map((reservation) => (
          <Card key={reservation._id} className={style.reservation}>
            <div className={style.reservation__header}>
              <p>
                <strong>{reservation.event.name}</strong>
              </p>
              <p className={style.reservation__date}>
                {reservation.event.date}
              </p>
            </div>
            <div className={style.reservation__details}>
              <p className={style.reservation__detail}>
                <strong className={style.reservation__detail__label}>
                  Description:{" "}
                </strong>
                <span className={style.reservation__detail__value}>
                  {reservation.event.description}
                </span>
              </p>
              <p className={style.reservation__detail}>
                <strong className={style.reservation__detail__label}>
                  Location:{" "}
                </strong>
                <span className={style.reservation__detail__value}>
                  {reservation.event.location}
                </span>
              </p>
              <p className={style.reservation__detail}>
                <strong className={style.reservation__detail__label}>
                  Type:{" "}
                </strong>
                <span className={style.reservation__detail__value}>
                  {reservation.event.type}
                </span>
              </p>
              <p className={style.reservation__detail}>
                <strong className={style.reservation__detail__label}>
                  Date:{" "}
                </strong>
                <span className={style.reservation__detail__value}>
                  {reservation.event.date}
                </span>
              </p>
              <p className={style.reservation__detail}>
                <strong className={style.reservation__detail__label}>
                  Time:{" "}
                </strong>
                <span className={style.reservation__detail__value}>
                  {reservation.event.time}
                </span>
              </p>
              <p className={style.reservation__detail}>
                <strong className={style.reservation__detail__label}>
                  Seats:{" "}
                </strong>
                <span className={style.reservation__detail__value}>
                  {reservation.seats}
                </span>
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default withAuth(ReservationsPage);
