import React from 'react';
import { AiFillExclamationCircle } from 'react-icons/ai';
import { Button, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function ConfirmationModal({ toggle, isOpen, remove }) {
    return (
        <Modal
            isOpen={isOpen}
            toggle={() =>
                toggle()
            }
            className="modal-md"
        >
            <ModalHeader
                toggle={() =>
                    toggle()
                }
            >
                <Label>Delete Employee</Label>
            </ModalHeader>
            <ModalBody>
                <AiFillExclamationCircle className="text-danger" size={30} />  Are you sure you want to delete this Employee ?
            </ModalBody>
            <ModalFooter>
                <Button
                    color="secondary"
                    outline
                    onClick={() =>
                        toggle()
                    }
                >
                    Cancel
                </Button>
                <Button
                    color="danger"
                    outline
                    onClick={(event) => {
                        toggle();
                        remove();
                    }}
                >
                    Delete
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ConfirmationModal;