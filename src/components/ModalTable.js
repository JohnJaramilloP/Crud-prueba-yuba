import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import Swal from "sweetalert2";

const ModalTable = ({
  modal,
  setModal,
  departmentSelected,
  handleChange,
  edit
}) => {

  const showAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Departamento Editado",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <Modal isOpen={modal}>
      <ModalHeader>
        <div className="modal-header">
          <h3 className="modal-add-title">Editar Departamento</h3>
        </div>
      </ModalHeader>
      <ModalBody>
        <div className="form-department">
          <label>Código</label>
          <input
            className="form-control"
            type="text"
            name="codigo"
            value={departmentSelected && departmentSelected.codigo}
            onChange={handleChange}
          />

          <label>Departamento</label>
          <input
            className="form-control"
            type="text"
            name="departamento"
            value={departmentSelected && departmentSelected.departamento}
            onChange={handleChange}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => {edit(); showAlert()}}>Editar</Button>
        <Button color="danger" onClick={() => setModal(false)}>Cancelar</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalTable;
