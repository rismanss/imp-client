import {
  Text,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

export const ViewModal = ({person, isOpen, onClose}) => {

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent mx={2}>
        <ModalHeader>List</ModalHeader>
        <ModalCloseButton />
        <Box>
          <ModalBody pb={6}>
            <Text fontSize='md'>Name : {person?.name}</Text>
            <Text fontSize='md'>Email : {person?.email}</Text>
            <Text fontSize='md'>Phone : {person?.phone}</Text>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </Box>
      </ModalContent>
    </Modal>
  )
}