import '../styles/globals.css'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import MainLayout from '../component/common.layout'
import Head from 'next/head'
import Script from 'next/script'
import { ReactElement, ReactNode } from 'react'
export type NextPageWithLayout <P = {}, IP=P> = NextPage<P,IP> & {
  getLayout?:(page:ReactElement) => ReactNode
}
type AppPropWithLayout = AppProps & {
  Component: NextPageWithLayout
}
export default function App({ Component, pageProps }:AppPropWithLayout ) {
  const getLayout = Component.getLayout ?? ((page)=>page)
  return (
    <>
      <Script src="https://kit.fontawesome.com/739edf4b29.js" crossOrigin="anonymous"></Script>
      <Head>
      </Head>
      <MainLayout>
        {getLayout(<Component {...pageProps} />)}
      </MainLayout>
    </>
  )
}