import React from "react";
import style from "./style.module.css";
import { useParams } from "react-router-dom";
import { useEventContext } from "../../providers/EventProvider";
import dayjs from "dayjs";
import Form, { FormContent, FormHeader } from "../../components/form";
import { useReservationContext } from "../../providers/ReservationProvider";

const ReservePage = () => {
  const id = useParams().id;
  const [event, setEvent] = React.useState({});
  const { getEventG } = useEventContext();
  const { reserveAsGuest, isLoading } = useReservationContext();

  React.useEffect(() => {
    getEventG(id, (res) => setEvent(res.event));
  }, [getEventG, id]);

  const onSubmit = (data) => {
    data.eventId = id;
    reserveAsGuest(data, (res) => {
      if (res.success) alert("Reservation successful!");
      else {
        alert("Reservation failed!");
        throw new Error(res.message);
      }
    });
  };

  if (isLoading) return <div>Making reservation...</div>;

  return (
    <div className={style.page}>
      <header>
        <h1>{event.name}</h1>
        <h2>{event.description}</h2>
        <div className={style.date}>
          <p>Date: {dayjs(event.startDate).format("DD/MM/YYYY")}</p>
        </div>
      </header>
      <main>
        <Form
          shouldValidate
          required
          width="half"
          initialState={{ name: "", email: "", seats: 1 }}
          onSubmit={onSubmit}>
          <FormHeader subtitle="Fill in your details here"></FormHeader>
          <FormContent>
            <FormContent.TextField label="Name" name="name" />
            <FormContent.TextField label="Email" name="email" type="email" />
            <FormContent.TextField
              label="No of reservations"
              name="seats"
              type="number"
              minValue={1}
            />
            <FormContent.SubmitBtn>Reserve</FormContent.SubmitBtn>
          </FormContent>
        </Form>
      </main>
    </div>
  );
};

export default ReservePage;
