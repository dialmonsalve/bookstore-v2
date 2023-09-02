import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';


export interface Props {
  children: ReactNode;
}



export const Providers = ({ children }: Props) => {


  return (
    <SessionProvider >
      {children}
    </SessionProvider>
  )
}