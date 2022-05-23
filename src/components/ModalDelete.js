import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";
import Swal from "sweetalert2";

const ModalDelete = ( {modalDelete, departmentSelected, deleteDepartment, setModalDelete}) => {

  const showAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Departamento Eliminado",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (

    <Modal isOpen={modalDelete}>
        <ModalBody>
            Estás seguro de eliminar el departamento: {departmentSelected && departmentSelected.departamento}?
        </ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={() => {deleteDepartment(); showAlert()}}>Sí</Button>
            <Button color="danger" onClick={() => setModalDelete(false)}>No</Button>
        </ModalFooter>
    </Modal>
  )
}

export default ModalDelete