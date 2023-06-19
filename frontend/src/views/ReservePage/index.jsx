import React from 'react'
import style from './style.module.css'
import { useParams } from 'react-router-dom';
import { useEventContext } from '../../providers/EventProvider';
import dayjs from 'dayjs';

const ReservePage = () => {
  const id = useParams().id;
  const [event, setEvent] = React.useState({}); 
  const { getEvent } = useEventContext();

  React.useEffect(() => {
    getEvent(id, (res) => setEvent(res.event));
  }, [getEvent, id]);

  return (
    <div className={style.page}>
      <header>

        <h1>{event.name}</h1> 
        <h2>{event.description}</h2>
        <div className={style.date}>
          <p>Date: {dayjs(event.startDate).format("DD/MM/YYYY")}</p>
        </div>
      </header>
      {console.log(event)}
    </div>
  );
}

export default ReservePage