import type { AppProps } from 'next/app'
import { SessionAuthProvider } from '@/components/ui/SessionAuthProvider';
import { QueryClient,QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { UIProvider } from '@/context/ui';
import '../styles/main.scss';

export default function App({ Component, pageProps }: AppProps) {

  const queryClient = new QueryClient({
    defaultOptions:{
      queries:{
        staleTime: 1000 * 60 * 60, // 1 hora
      }
    }
  })

  return (
    <SessionAuthProvider>
      <QueryClientProvider client={queryClient} >
      <ReactQueryDevtools initialIsOpen={false} />
        <UIProvider>
          <Component {...pageProps} />
        </UIProvider>
      </QueryClientProvider>
    </SessionAuthProvider>
  )
}
