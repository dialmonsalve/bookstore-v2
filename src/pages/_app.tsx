import { UIProvider } from '@/context/ui';
import '../styles/main.scss';
import type { AppProps } from 'next/app'
import { Providers } from '@/components/ui/Providers';


export default function App({ Component, pageProps }: AppProps) {

  return (
    <Providers>
      <UIProvider>
        <Component {...pageProps} />
      </UIProvider>
    </Providers>
  )
}
