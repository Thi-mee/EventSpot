import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useOrganizerContext } from "../../../providers/OrganizerProvider";
import style from "./style.module.css";
import withAuth from "../../../components/HOC/withAuth";
import Modal from "../../../components/modal";
import QRCode from "react-qr-code";

const OrgEventPage = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const button = [
    {
      text: "Edit",
      icon: "edit",
      onClick: () => {
        setIsEdit(true);
      },
    },
    {
      text: "Save Changes",
      icon: "save",
      onClick: () => {
        console.log("save");
      },
    },
  ];

  const [isEdit, setIsEdit] = useState(false);
  const {
    getOrganizerEvents,
    getOrganizerEventReservations,
    isLoading,
    organizerEvents,
    reservations,
    clearReservations,
    deleteReservationById,
  } = useOrganizerContext();
  const id = useParams().id;
  const event = organizerEvents.find((event) => event._id === id);

  useEffect(() => {
    if (!event) {
      getOrganizerEvents(user?._id);
    }
    getOrganizerEventReservations(user?._id, id);

    return () => {
      clearReservations();
    };
  }, [
    getOrganizerEvents,
    event,
    getOrganizerEventReservations,
    id,
    user?._id,
    clearReservations,
  ]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={style.page}>
      <header>
        {isEdit ? (
          <button className={style.ctab} onClick={button[1].onClick}>
            <span className="material-symbols-outlined">save</span> Save{" "}
          </button>
        ) : (
          <div className={style.floatpositioner}>
            <button className={style.ctab} onClick={button[0].onClick}>
              <span className="material-symbols-outlined">edit</span> Edit
            </button>
            <button onClick={() => setIsModalOpen(true)}>
              <span className="material-symbols-outlined">share</span> Share
            </button>
          </div>
        )}
        <div className={style.aboutEvent}>
          <h1>{event?.name}</h1>
          <p>
            Description:{" "}
            <span className={style.value}>{event?.description}</span>
          </p>
          <p>
            Start Date: <span className={style.value}>{event?.date}</span>
          </p>
          <p>
            Start Time: <span className={style.value}>{event?.time}</span>
          </p>
          <p>
            Location: <span className={style.value}> {event?.location}</span>
          </p>
        </div>
      </header>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h1>Share</h1>

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
                    "https://localhost:3000/reserve/" + id
                  )
                }>
                {" "}
                Copy Link
              </button>
            </div>
          </div>
          <div className={style.modal__content__right}>
            <h3>Or download this qr code and share</h3>
            <QRCode size={150} value={"https://localhost:3000/reserve/" + id} />
          </div>
        </div>
      </Modal>
      <main>
        <h2>Reservations</h2>
        {reservations?.length === 0 ? (
          <p>No reservations yet</p>
        ) : (
          reservations?.map((reservation, index) => (
            <table key={reservation._id}>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th> Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="style reservations">
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{reservation.name}</td>
                  <td>{reservation.email}</td>
                  <td>{reservation.status}</td>
                  <td className={style.multiCta}>
                    <button className={style.ctab}>
                      <span className="material-symbols-outlined">edit</span>{" "}
                      <span>Edit</span>
                    </button>
                    <button className={style.ctab} onClick={() => deleteReservationById(reservation._id)}>
                      <span className="material-symbols-outlined">delete</span>{" "}
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          ))
        )}
      </main>
    </div>
  );
};

export default withAuth(OrgEventPage);
