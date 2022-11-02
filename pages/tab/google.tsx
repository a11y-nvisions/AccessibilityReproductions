import Head from "next/head";
import { ReactNode } from "react";
import RoutingTabLayout from "./_layout";

function Content_google () {
  return (
    <>
    <Head>
      <title>Google Tab - Accessibility Reproductions</title>
    </Head>
    <p>Google is a name of search engine, service, and company. Google is my favorite search engine!</p>
    </>
  )
}

Content_google.getLayout = (page:ReactNode)=> <RoutingTabLayout>{page}</RoutingTabLayout>

export default Content_google;