import React from "react";
import VendorForm from "../../../components/forms/vendor/VendorForm";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalOverlay,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
const Sales = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Add vendor</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new vendor</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VendorForm />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Sales;
