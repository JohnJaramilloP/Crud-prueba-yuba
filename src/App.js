import React, { useEffect, useState } from "react";
import Table from "./components/Table";
import ModalDelete from "./components/ModalDelete";
import ModalInsert from "./components/ModalInsert";
import ModalTable from "./components/ModalTable";
import { helpHttp } from "./helpers/helpHttp";
import Loader from "./components/Loader";
import Message from "./components/Message";
import "./App.css";

function App() {
  let apiFetch = helpHttp();
  let getUrl = "https://api-deparments.herokuapp.com/departments";
  let postUrl = "https://api-deparments.herokuapp.com/newDepartment";
  let putUrl = "https://api-deparments.herokuapp.com/changeDepartment";
  let deleteUrl = "https://api-deparments.herokuapp.com/deleteDepartment";

  useEffect(() => {
    setLoading(true);
    apiFetch.get(getUrl).then((res) => {
      if (!res.err) {
        setData(res.Departamentos);
        setError(null);
      } else {
        setData(null);
        setError(res);
      }
      setLoading(false);
    });
  }, [getUrl]);

  const [data, setData] = useState(null);
  const [modal, setModal] = useState(false);
  const [add, setAdd] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [departmentSelected, setDepartmentSelected] = useState({
    id: "",
    codigo: "",
    Departamento: "",
  });
  const [selectItenAmount, setSelectItenAmount] = useState(10);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const selectDepartment = (element, cases) => {
    setDepartmentSelected(element);
    cases === "Editar" ? setModal(true) : setModalDelete(true);
  };

  const openAddDepartment = () => {
    setDepartmentSelected(null);
    setAdd(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartmentSelected((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangePage = (e) => {
    const value = e.target.value;
    setSelectItenAmount(value);
  };

  const edit = () => {
    let newData = data;
    let endpoint = putUrl;
    let options = {
      body: departmentSelected,
      headers: { "content-type": "application/json" },
    };

    apiFetch.put(endpoint, options).then((res) => {
      if (!res.err) {
        newData.map((department) => {
          if (department._id === res._id) {
            department.codigo = res.codigo;
            department.departamento = res.departamento;
          }
        });
        setData([...newData]);
      } else {
        setError(res);
      }
    });
    setModal(false);
  };

  const deleteDepartment = () => {
    let endpoint = `${deleteUrl}/${departmentSelected._id}`;
    let options = {
      headers: { "content-type": "application/json" },
    };
    apiFetch.del(endpoint, options).then((res) => {
      if (!res.err) {
        setData(
          data.filter((department) => department._id !== departmentSelected._id)
        );
      } else {
        setError(res);
      }
    });
    setModalDelete(false);
  };

  const addDepartment = () => {
    let insert = departmentSelected;
    let newData = data;
    let options = {
      body: insert,
      headers: { "content-type": "application/json" },
    };
    apiFetch.post(postUrl, options).then((res) => {
      if (!res.err) {
        setData([res, ...newData]);
      } else {
        setError(res);
      }
    });

    setAdd(false);
  };

  return (
    <div className="container-app">
      <h2 className="title"> Tabla de Departamentos</h2>

      <div className="select-container">
        <select
          onChange={handleChangePage}
          name="select"
          className="select"
          defaultValue="10"
        >
          <option value="" disabled>
            cantidad de filas
          </option>
          <option value="10">
            10
          </option>
          <option value="15">
            15
          </option>
          <option value="20">
            20
          </option>
          <option value="25">
            25
          </option>
          <option value="30">
            30
          </option>
        </select>

        <button className="btn-add" onClick={openAddDepartment}>
          Agregar Departamento
        </button>
      </div>

      {loading && <Loader />}
      {error && (
        <Message
          message={`Error ${error.status}: ${error.statusText}`}
          color={"rgb(202, 4, 4)"}
        />
      )}
      {data && (
        <Table
          data={data}
          selectItenAmount={selectItenAmount}
          selectDepartment={selectDepartment}
        />
      )}

      <ModalTable
        modal={modal}
        setModal={setModal}
        departmentSelected={departmentSelected}
        handleChange={handleChange}
        setError={setError}
        edit={edit}
      />

      <ModalDelete
        modalDelete={modalDelete}
        departmentSelected={departmentSelected}
        deleteDepartment={deleteDepartment}
        setModalDelete={setModalDelete}
      />

      <ModalInsert
        handleChange={handleChange}
        add={add}
        setAdd={setAdd}
        departmentSelected={departmentSelected}
        addDepartment={addDepartment}
      />
    </div>
  );
}

export default App;
