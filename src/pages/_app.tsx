import { UIProvider } from '@/context/ui';
import '../styles/main.scss';
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {

  return (
    <UIProvider>
      <Component {...pageProps} />
    </UIProvider>)
}
