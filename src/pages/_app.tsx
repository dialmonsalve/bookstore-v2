import type { AppProps } from 'next/app'
import { SessionAuthProvider } from '@/components/ui/services/SessionAuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import '../styles/main.scss';

export default function App({ Component, pageProps }: AppProps) {

  const queryClient = new QueryClient()

  return (
    <SessionAuthProvider>
      <QueryClientProvider client={queryClient} >
        <ReactQueryDevtools initialIsOpen={false} />
          <Component {...pageProps} />   
      </QueryClientProvider>
    </SessionAuthProvider>
  )
}
