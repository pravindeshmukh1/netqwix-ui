import React from "react";
import { Modal as ReactStrapModal, ModalBody, ModalFooter } from "reactstrap";

const Modal = ({ isOpen, id, element, toggle, footer = <></>, width, allowFullWidth = false, height }) => {
  return (
    <ReactStrapModal
      className={`${allowFullWidth ? 'react-strap-modal-full' : ''} `}
      isOpen={isOpen}
      toggle={toggle}
      key={id}
      style={{ width, height }}
    >
      <ModalBody>{element}</ModalBody>
      <ModalFooter>{footer}</ModalFooter>
    </ReactStrapModal>
  );
};

export default Modal;
