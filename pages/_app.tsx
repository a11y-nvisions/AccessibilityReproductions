import '../styles/globals.css'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import {appWithTranslation} from "next-i18next"
import MainLayout from '../component/common.layout'
import { ReactElement, ReactNode } from 'react'
import Script from 'next/script'
import Head from 'next/head'
export type NextPageWithLayout <P = {}, IP=P> = NextPage<P,IP> & {
  getLayout?:(page:ReactElement) => ReactNode
}

type AppPropWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function App({ Component, pageProps }:AppPropWithLayout ) {
  const getLayout = Component.getLayout || ((page)=>page)
  return (
    <> 
      <MainLayout>
        {getLayout(<Component {...pageProps} />)}
      </MainLayout>
    </>
  )
}

export default appWithTranslation(App);