import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import Swal from "sweetalert2";

const ModalInsert = ({
  add,
  setAdd,
  departmentSelected,
  addDepartment,
  handleChange,
}) => {
  
  const showAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Departamento Agregado",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const showAlertRequiere = () => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: "Los campos Código y Departamento son requeridos",
    })
  };

  return (
    <Modal isOpen={add}>
      <ModalHeader>
        <div>
          <h3>Agregar Departamento</h3>
        </div>
      </ModalHeader>
      <ModalBody>
        <label>Código</label>
        <input
          className="form-control"
          type="text"
          name="codigo"
          value={departmentSelected ? departmentSelected.codigo : ""}
          onChange={handleChange}
          title="Este campo es requerido"
          required
        />

        <label>Departamento</label>
        <input
          className="form-control"
          type="text"
          name="departamento"
          value={departmentSelected ? departmentSelected.departamento : ""}
          onChange={handleChange}
          title="Este campo es requerido"
          required
        />
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={
            !!departmentSelected &&
            departmentSelected.codigo &&
            departmentSelected.departamento
              ? () => {
                  addDepartment();
                  showAlert();
                }
              : () => showAlertRequiere()
          }
        >
          Agregar
        </Button>
        <Button color="danger" onClick={() => setAdd()}>
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalInsert;
