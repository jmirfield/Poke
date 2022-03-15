import React, { useState } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import Header from '../components/Header'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(new QueryClient)
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Head>
          <title>PokeSearch</title>
          <link rel='icon' href='/images/favicon.ico' />
        </Head>
        <Header />
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp
