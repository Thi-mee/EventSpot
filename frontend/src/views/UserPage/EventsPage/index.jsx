import React, { useEffect, useState } from "react";
import { mockE } from "./mockE";
import style from "./EventsP.module.css";
import Card from "../../../components/card";
import withAuth from "../../../components/HOC/withAuth";

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

const EventsPage = () => {
  const [data, setData] = useState([]);

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
  const displayedItems = data.slice(indexOfFirstItem, indexOfLastItem);

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
    setData(mockE);
  }, []);

  return (
    <div className={style.eventPage}>
      <hgroup>
        <h1>Events</h1>
        <p>
          Find events that match your passion. Browse, save, and attend events
        </p>
      </hgroup>
      <div className={style.eventGrid}>
        {displayedItems.map((item) => (
          <Card key={item.id}>
            <div className={style.imgCtn}>
              <img src={item.imgUrl} alt="img" />
            </div>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </Card>
        ))}
      </div>

      <div className={style.paginationControls}>
        {/* Render pagination controls */}
        <button onClick={() => handlePageChange(1)}>First</button>
        {Array.from({
          length: calculateTotalPages(data.length, itemsPerPage),
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
            handlePageChange(calculateTotalPages(data.length, itemsPerPage))
          }>
          Last
        </button>
      </div>
    </div>
  );
};

export default withAuth(EventsPage);
