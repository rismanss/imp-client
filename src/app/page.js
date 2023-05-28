'use client'
import { useState } from 'react';
import {
  Flex,
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Icon,
  Text,
  Button,
  IconButton,
  useColorMode,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react';

import { FaEdit, FaTrash, FaPlus, FaEye } from 'react-icons/fa';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getPerson, removePerson } from '@/api/persons';
import { FormModal } from '@/components/FormModal';
import { Pagination } from '@/components/Pagination';
import { ViewModal } from '@/components/ViewModal';


export default function Home() {
  const [isOpenFormModal, setIsOpenFormModal] = useState(false);

  const [isOpenViewModal, setIsOpenViewModal] = useState(false);

  const [page, setPage] = useState(1);

  const [person, setPerson] = useState(null);

  const { colorMode, toggleColorMode } = useColorMode();
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const asButton = useBreakpointValue({ base: IconButton, md: Button });

  const isLgVerison = useBreakpointValue({
    base: false,
    lg: true,
  });

  const isMdVerison = useBreakpointValue({
    base: false,
    md: true,
  });

  const handleToggleFormModal = () => {
    setIsOpenFormModal(!isOpenFormModal);
  }

  const handleToggleViewModal = (person) => {
    setPerson(person);
    setIsOpenViewModal(!isOpenViewModal);
  }

  const handleCreatePerson = () => {
    setPerson(null);
    setIsOpenFormModal(!isOpenFormModal);
  }

  const handleUpdatePerson = (person) => {
    setPerson(person);
    setIsOpenFormModal(!isOpenFormModal);
  }

  const { data } = useQuery({
    queryKey: ['persons', page],
    queryFn: () => getPerson(page),
    keepPreviousData : true
  })

  const mutation = useMutation({
    mutationFn: (id) => removePerson(id)
  })

  const handleDelete = (id) => {
    mutation.mutate(id);
    window.location.reload();
  }

  return (
    <Flex
      w="100%"
      maxWidth={1220}
      mx="auto"
      px="6"
      my="6"
      direction="column"
    >
      <Button
        maxWidth={120}
        my="4"
        ml="auto"
        colorScheme="green"
        onClick={toggleColorMode}
      >
        Tema {colorMode === "light" ? "Dark" : "Light"}
      </Button>
      <Box
        flex="1"
        p="4"
        bg={colorMode === "light" ? "white" : "gray.700"}
        borderRadius="md"
      >
        <Flex
          justify="space-between"
          align="right"
          py="2"
        >
          <Heading
            py="2"
            fontSize={["sm", "lg", "xl"]}
            fontWeight="black"
            color={colorMode === "light" ? "gray.600" : "gray.200"}
          >
            Test From Imp Studio
          </Heading>
          <Button
            onClick={handleCreatePerson}
            as={asButton}
            ml="4"
            size="sm"
            fontSize="sm"
            colorScheme="green"
            leftIcon={<Icon as={FaPlus} fontSize="16" />}
            icon={<Icon as={FaPlus} fontSize="16" />}
            title="Add Data"
          >
            {isMdVerison && <Text>Tambah Data</Text>}
          </Button>
          <FormModal
            person={person}
            isOpen={isOpenFormModal}
            onClose={handleToggleFormModal}
          />
          <ViewModal
            person={person}
            isOpen={isOpenViewModal}
            onClose={handleToggleViewModal}
          />
        </Flex>
        <Box
          border="1px"
          borderRadius="sm"
          borderColor={borderColor}
        >
          <Table size="sm">
            <Thead bg={colorMode === "light" ? "gray.200" : "gray.600"}>
              <Tr>
                <Th>Name</Th>
                {isMdVerison && <Th>Email</Th>}
                {isLgVerison && <Th>Phone</Th>}
                <Th width="8"></Th>
                <Th width="8"></Th>
                <Th width="8"></Th>
              </Tr>
            </Thead>
            <Tbody>
            {data?.data.data.map(user => {
              return (
                <Tr key={user.id}>
                  <Td borderColor={borderColor}>{user.name}</Td>
                  {isMdVerison && <Td borderColor={borderColor}>{user.email}</Td>}
                  {isLgVerison && <Td borderColor={borderColor}>{user.phone}</Td>}
                  <Td borderColor={borderColor}>
                    <Button
                      onClick={() => handleToggleViewModal(user)}
                      as={asButton}
                      variant="outline"
                      size="sm"
                      fontSize="sm"
                      leftIcon={<Icon as={FaEye} fontSize="16"/>}
                      icon={<Icon as={FaEye} fontSize="16"/>}
                      title="Editar Usuário"
                    >
                      {isMdVerison && <Text>View</Text>}
                    </Button>
                  </Td>
                  <Td borderColor={borderColor}>
                    <Button
                      onClick={() => handleUpdatePerson(user)}
                      as={asButton}
                      variant="outline"
                      size="sm"
                      fontSize="sm"
                      leftIcon={<Icon as={FaEdit} fontSize="16"/>}
                      icon={<Icon as={FaEdit} fontSize="16"/>}
                      title="Editar Usuário"
                    >
                      {isMdVerison && <Text>Edit</Text>}
                    </Button>
                  </Td>
                  <Td borderColor={borderColor}>
                    <Button
                      as={asButton}
                      variant="outline"
                      size="sm"
                      fontSize="sm"
                      leftIcon={<Icon as={FaTrash} fontSize="16" />}
                      icon={<Icon as={FaTrash} fontSize="16"/>}
                      title="Apagar Usuário"
                      onClick={() => handleDelete(user.id)}
                    >
                      {isMdVerison && <Text>delete</Text>}
                    </Button>
                  </Td>
                </Tr>
              )
              })}
            </Tbody>
            { data && data.data.totalResult > 2 && (
              <Tfoot>
                <Tr>
                  <Td colSpan={5}>
                    <Pagination
                      totalCountOfRegisters={data.data.totalResult}
                      currentPage={page}
                      onPageChange={setPage}
                    />
                  </Td>
                </Tr>
              </Tfoot>
            )}
          </Table>
        </Box>
      </Box>
    </Flex>
  )
}