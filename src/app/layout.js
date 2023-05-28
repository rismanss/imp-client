'use client'
import {QueryClient,QueryClientProvider,} from '@tanstack/react-query'
import { useState } from 'react';

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from "../styles/theme"

export default function RootLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <html lang="en">
      <head>
        <title>imp test</title>
      </head>
      <body>
      <QueryClientProvider client={queryClient}>
        <CacheProvider>
          <ChakraProvider theme={theme}>
            {children}
          </ChakraProvider>
        </CacheProvider>
      </QueryClientProvider>
      </body>
    </html>
  )
}
