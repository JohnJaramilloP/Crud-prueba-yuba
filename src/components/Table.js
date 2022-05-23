import React, { useState } from "react";
import Pagination from "./Pagination";
import { MdOutlineDeleteForever } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import "./Table.css";

const Table = ({ data, selectItenAmount, selectDepartment }) => {
  const [page, setPage] = useState(1);

  const max = Math.ceil(data.length / selectItenAmount);

  return (
    <div className="table-container">
      <table className="tables">
        <thead className="table-head">
          <tr className="fila">
            <th className="columna">Código</th>
            <th className="columna">Departamento</th>
            <th className="columna">Editar / Eliminar</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {data.length > 0 ? (
            data
              .slice((page - 1) * (selectItenAmount), (page - 1) * parseInt(selectItenAmount) + parseInt(selectItenAmount))
              .map((el, index) => (
                <tr
                  className={`${index % 2 === 0 ? "fila1" : "fila2"}`}
                  key={el._id}
                >
                  <td className="columna columna1">
                    {el.codigo}
                  </td>
                  <td className="columna columna2">
                    {el.departamento}
                  </td>
                  <td  className="columna columna3">
                    <div className="btn-container">
                      <button
                        className="btn-edit"
                        onClick={() => selectDepartment(el, "Editar")}
                      >
                        <AiOutlineEdit />
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => selectDepartment(el, "Eliminar")}
                      >
                        <MdOutlineDeleteForever />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan="3">Sin informacion</td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination page={page} setPage={setPage} max={max} />
    </div>
  );
};

export default Table;
