import React, { useEffect, useState } from "react";
import { mockE } from "./mockE";
import style from "./EventsP.module.css";
import Card from "../../../components/card";
import withAuth from "../../../components/HOC/withAuth";
import { useEventContext } from "../../../providers/EventProvider";

// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//   const pages = Array(totalPages).keys();

//   return (
//     <ul>
//       <li key="first">
//         <button onClick={() => onPageChange(1)}>First</button>
//       </li>
//       <li key="prev">
//         <button onClick={() => onPageChange(currentPage - 1)}>Previous</button>
//       </li>
//       {pages.map((pageNumber) => (
//         <li key={pageNumber}>
//           <button onClick={() => onPageChange(pageNumber)}>
//             {pageNumber + 1}
//           </button>
//         </li>
//       ))}
//       <li key="next">
//         <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
//       </li>
//       <li key="last">
//         <button onClick={() => onPageChange(totalPages)}>Last</button>
//       </li>
//     </ul>
//   );
// };

const EventsPage = ({navigate}) => {
  const { events, getEvents } = useEventContext();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const calculateTotalPages = (totalItems, itemsPerPage) => {
    return Math.ceil(totalItems / itemsPerPage);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const displayedEvents = events.slice(indexOfFirstItem, indexOfLastItem);

  // const fetchData = async (pageNumber) => {
  //   try {
  //     const response = await fetch(`/api/data?page=${pageNumber}`);
  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     console.error(error);
  //     return [];
  //   }
  // };

  React.useEffect(() => {
    getEvents();
  }, [getEvents]);

  return (
      <div className={style.eventPage}>
      <hgroup>
        <h1>Events</h1>
        <p>
          Find events that match your passion. Browse, save, and attend events
        </p>
      </hgroup>
      <div className={style.eventGrid}>
        {displayedEvents.map((event) => (
          <Card key={event._id} className={style.eventCard}>
            <div className={style.imgCtn}>
              <img
                src={`/assets/mock/mock${
                  [1, 2, 3, 4, 5][Math.floor(Math.random() * 5)]
                }.jpeg`}
                alt="img"
              />
            </div>
            <h3>{event.name}</h3>
            <p className={style.location}>{event.location}</p>
            <p className={style.date} >{event?.date}</p>
            <p>
              Tag: <span className={style.tag}>{event.category}</span>
            </p>
            <button onClick={() => navigate(`/user/event/${event._id}`)}>Details</button>
          </Card>
        ))}
      </div>
      {events?.length > 10 && (
        <div className={style.paginationControls}>
          {/* Render pagination controls */}
          <button onClick={() => handlePageChange(1)}>First</button>
          {Array.from({
            length: calculateTotalPages(events?.length, itemsPerPage),
          }).map((_, index) => (
            <button
              className={currentPage === index + 1 ? style.active : null}
              key={index}
              onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </button>
          ))}
          <button
            onClick={() =>
              handlePageChange(calculateTotalPages(events?.length, itemsPerPage))
            }>
            Last
          </button>
        </div>
      )}
    </div>
  );
};

export default withAuth(EventsPage);
