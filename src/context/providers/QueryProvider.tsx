"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ReactNode } from "react"

interface Props {
  children: ReactNode
}


const queryOptions = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
}
export const QueryProvider = ({ children }: Props) => {

  const queryClient = new QueryClient(queryOptions)

  return (
    <QueryClientProvider client={queryClient} >
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  )
}
