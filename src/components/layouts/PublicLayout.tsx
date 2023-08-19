import React, { ReactNode } from 'react';
import Head from 'next/head';

import { Navbar, Header, Footer } from '../ui';

interface Props {
  title: string;
  children: ReactNode | ReactNode[];
  pageDescription: string;
  imageUrl?: string
}

export const PublicLayout = ({ title, children, pageDescription, imageUrl }: Props) => {
  return (
    <>
      <Head>
        <title>DIABOOKS | {title}</title>
        <meta name='description' content={pageDescription} />
        <meta name='og:title' content={title} />
        <meta name='og:description' content={pageDescription} />

        {
          imageUrl && <meta name='og:image' content={imageUrl} />
        }

      </Head>

      <Header />
      <Navbar />

      <main className='public-main' >
        {children}
      </main>

      <Footer />
    </>
  )
}
