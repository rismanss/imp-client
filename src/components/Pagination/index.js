import { Stack, Text, Flex } from "@chakra-ui/react";

import { PaginationItem } from "./pagination";

const siblingsCount = 1;

function generatePagesArray(from, to) {
  return [...new Array(siblingsCount)].map((_, index) => {
    return from + index + 1;
  }).filter(page => page > 0)
}

export function Pagination({
  totalCountOfRegisters,
  registersPerPages = 2,
  currentPage = 1,
  onPageChange,
}) {
  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPages);

  const previousPages = currentPage > 1
    ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
    : []

  const nextPages = currentPage < lastPage
    ?  generatePagesArray(currentPage, Math.min(currentPage + siblingsCount + lastPage))
    : []

  return (
    <Stack
      direction={["column", "row"]}
      justify="space-between"
      align="center"
      spacing="6"
    >
      <Flex direction="row" spacing="2" ml="auto">
        {currentPage > (1 + siblingsCount) && (
          <>
            <PaginationItem onPageChange={onPageChange} number={1}/>

            { currentPage > (2 + siblingsCount) && (
              <Text
              mr="4"
                color="gray.300"
                width="8"
                textAlign="center"
              >
                ...
              </Text>
            )}
          </>
        )}

        {previousPages.length > 0 && previousPages.map(page => {
          return (
              <PaginationItem
                onPageChange={onPageChange}
                key={page}
                number={page}
              />
          )
        })}

        <PaginationItem
          onPageChange={onPageChange}
          number={currentPage}
          isCurrent
        />

        {nextPages.length > 0 && nextPages.map(page => {
          return (
            <PaginationItem
              onPageChange={onPageChange}
              key={page}
              number={page}
            />
          )
        })}

        {(currentPage + siblingsCount) < lastPage && (
          <>
            { (currentPage + 1 + siblingsCount) < lastPage && (
              <Text
                mr="4"
                color="gray.300"
                width="8"
                textAlign="center"
              >
                ...
              </Text>
            )}
            <PaginationItem onPageChange={onPageChange}  number={lastPage}/>
          </>
        )}
      </Flex>
    </Stack>
  )
}