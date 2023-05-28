import { useRef, useEffect } from 'react';
import {
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
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

import { Input } from './input';
import { addPerson, updatePerson } from '@/api/persons';

let isLoading = false;

export const FormModal = ({person, isOpen, onClose}) => {
  const {register, handleSubmit, formState: {errors}, reset} = useForm();

  const initialRef = useRef();
  const finalRef = useRef();

  useEffect(() => {
    reset({
      name: '',
      email: '',
      phone: ''
    });
  }, [isOpen, reset])

  useEffect(() => {
    if(person) {
      reset({
        name: person.name,
        email: person.email,
        phone: person.phone
      });
    }
  }, [person, reset])

  const mutation = useMutation({
    mutationFn: (res) => {
     if (person) {
      updatePerson(res, person.id)
     } else {
      addPerson(res)
     } 
    }
  })

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent mx={2}>
        <ModalHeader>Form</ModalHeader>
        <ModalCloseButton />
        <Box 
          as="form" 
          onSubmit={handleSubmit((data) => {
            mutation.mutate(data)
            onClose()
            window.location.reload()
          } )}
        >
          <ModalBody pb={6}>
            <Input
              ref={initialRef}
              placeholder="Name"
              label='Name'
              error={errors.name}
              {...register('name', {required: 'this is required !'})}
            />
            <Input
              placeholder="Email"
              label='Email'
              error={errors.email}
              {...register('email', {required: 'this is required !'})}
            />
            <Input 
              placeholder="Phone"
              label='Phone'
              error={errors.phone}
              type='number'
              {...register('phone', {required: 'this is required !', minLength: {value: 7, message: 'min length is 7'}})}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              mr={3}
              isLoading={isLoading}
              colorScheme="green"
              type="submit"
            >
              Save
            </Button>

            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </Box>
      </ModalContent>
    </Modal>
  )
}