import React, { useState } from "react";
import { BiSkipNext } from 'react-icons/bi';
import { BiSkipPrevious } from 'react-icons/bi';
import "./Pagination.css";

const Pagination = ({ page, setPage, max }) => {
  const [actualPage, setActualPage] = useState(1);

  const prevPage = () => {
    setActualPage(actualPage - 1);
    setPage(page - 1);
  };

  const nextPage = () => {
    setActualPage(actualPage + 1);
    setPage(page + 1);
  };
  return (
    <div className="container-pagination">
      <button className="btn-prev" disabled={page === 1} onClick={prevPage}>
        <BiSkipPrevious className="btn-pagination" />
      </button>
      <div className="container-text">
        <p className="text1">{actualPage}</p>
        <p className="text2"> de {max ? max : 1}</p>
      </div>
      <button className="btn-next" disabled={page === max} onClick={nextPage}>
        <BiSkipNext />
      </button>
    </div>
  );
};

export default Pagination;
