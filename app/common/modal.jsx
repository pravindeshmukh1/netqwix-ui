import React from "react";
import { Modal as ReactStrapModal, ModalBody, ModalFooter } from "reactstrap";

const Modal = ({ isOpen, id, element, toggle, footer, isCenter, width }) => {
  return (
    <ReactStrapModal
      isOpen={isOpen}
      toggle={toggle}
      key={id}
      isCenter={isCenter}
      style={{ maxWidth: "100%", width: width, marginTop: "0%" }}
    >
      <ModalBody>{element}</ModalBody>
      <ModalFooter>{footer}</ModalFooter>
    </ReactStrapModal>
  );
};

export default Modal;
