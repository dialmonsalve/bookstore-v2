import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

export interface Props {
  children: ReactNode;
}

export const SessionAuthProvider = ({ children }: Props) => {

  return (
    <SessionProvider >
      {children}
    </SessionProvider>
  )
}

