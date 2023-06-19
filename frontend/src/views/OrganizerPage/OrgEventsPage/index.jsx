import React, { useEffect } from "react";
import withOrganizerAuthentication from "../../../components/HOC/withAuth";
import dayjs from "dayjs";
import style from "../style.module.css";
import Modal from "../../../components/modal";
import QRCode from "react-qr-code";
import { useOrganizerContext } from "../../../providers/OrganizerProvider";

const OrgEventsPage = ({ navigate }) => {
  const [events, setEvents] = React.useState([]);
  const { isLoading, getOrganizerEvents } = useOrganizerContext();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState("");

  useEffect(() => {
    getOrganizerEvents((res) => setEvents(res.events));
  }, [getOrganizerEvents]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const onClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={style.page}>
      <h1>My Events</h1>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis
        doloribus cum beatae.
      </p>
      <Modal isOpen={isModalOpen} onClose={onClose}>
        <h1>Modal</h1>

        <div className={style.modal__content}>
          <div className={style.modal__content__left}>
            <h2>Share this event</h2>

            <div className={style.modal__content__left__buttons}>
              <button className="btn btn-primary">Share on Facebook</button>
              <button className="btn btn-primary">Share on Twitter</button>
              <button
                className="btn btn-primary"
                onClick={() =>
                  navigator.clipboard.writeText(
                    "https://localhost:3000/reserve/" + selectedId
                  )
                }>
                {" "}
                Copy Link
              </button>
            </div>
          </div>
          <div className={style.modal__content__right}>
            <h3>Or download this qr code and share</h3>
            <QRCode
              size={150}
              value={"https://localhost:3000/reserve/" + selectedId}
            />
          </div>
        </div>
      </Modal>

      <table>
        <thead>
          <tr>
            <th>S/N</th>
            <th>Name</th>
            <th>Reservations</th>
            <th>Event Type</th>
            <th>Location</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
                {console.log(events)}
          {events.map((event, index) => {
            return (
              <tr key={event._id}>
                <td>{index + 1}</td>
                <td>{event.name}</td>
                <td>
                  {event.reservations.length}/{event.seats}
                </td>
                <td>{event.type}</td>
                <td>{event.location}</td>
                <td>{dayjs(event.startDate).format("DD/MM/YYYY")}</td>
                <td>
                  <button
                    className={"" + style.btn + " " + style.btnDetails}
                    onClick={() =>
                      navigate("/organizer/event/" + event._id.toString())
                    }>
                    Details
                  </button>
                  <button
                    className={"" + style.btn + " " + style.btnPrimary}
                    onClick={() => {
                      setIsModalOpen(true);
                      setSelectedId(event._id.toString());
                    }}>
                    Share
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default withOrganizerAuthentication(OrgEventsPage);
