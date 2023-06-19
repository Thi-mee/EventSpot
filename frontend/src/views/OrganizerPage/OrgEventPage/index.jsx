import { useEffect, useState } from "react";
import withOrganizerAuthentication from "../../../components/HOC/withAuth";
import { useParams } from "react-router-dom";
import { useEventContext } from "../../../providers/EventProvider";
import dayjs from "dayjs";
import style from "./style.module.css";
import Flex from "../../../components/layout/Flex";

const OrgEventPage = () => {
  const [button, setButton] = useState([
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
  ]);
  const [isEdit, setIsEdit] = useState(false);
  const [event, setEvent] = useState({}); // [event, setEvent
  const id = useParams().id;
  const { getEvent, isLoading } = useEventContext();

  useEffect(() => {
    getEvent(id, (res) => setEvent(res.event));
  }, [getEvent, id]);

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
            <button>
              <span className="material-symbols-outlined">share</span> Share
            </button>
          </div>
        )}
        <div className={style.aboutEvent}>
          <h1>{event.name}</h1>
          <p>
            Description:{" "}
            <span className={style.value}>{event.description}</span>
          </p>
          <Flex gap="2">
            <p>
              Start Date:{" "}
              <span className={style.value}>
                {dayjs(event.startDate).format("DD/MM/YYYY")}
              </span>
            </p>
            <p>
              End Date:{" "}
              <span className={style.value}>
                {dayjs(event.endDate).format("DD/MM/YYYY")}
              </span>
            </p>
          </Flex>
          <Flex gap="2">
            <p>
              Start Time: <span className={style.value}>{event.startTime}</span>
            </p>
            <p>
              End Time: <span className={style.value}> {event.endTime}</span>
            </p>
          </Flex>
          <p>
            Location: <span className={style.value}> {event.location}</span>
          </p>
        </div>
      </header>
      <main>
        <h2>Reservations</h2>
        {console.log(event.reservations)}
        {event.reservations?.length === 0 ? (
          <p>No reservations yet</p>
        ) : (
          event.reservations?.map((reservation, index) => (
            <table>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th> Name</th>
                  <th>Email</th>
                  <th>PhoneNo</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="style reservations">
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{reservation.name}</td>
                  <td>{reservation.email}</td>
                  <td>{reservation.phone}</td>
                  <td>
                    <button className={style.ctab}>
                      <span className="material-symbols-outlined">edit</span>{" "}
                      Edit
                    </button>
                    <button className={style.ctab}>
                      <span className="material-symbols-outlined">delete</span>{" "}
                      Delete
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

export default withOrganizerAuthentication(OrgEventPage);
