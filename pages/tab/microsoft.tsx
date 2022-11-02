import Head from "next/head";
import { ReactNode } from "react";
import RoutingTabLayout from "./_layout";

function Content_Microsoft () {
  return (
    <>
    <Head>
      <title>Microsoft Tab - Accessibility Reproductions</title>
    </Head>
    <p>Microsoft! I think cool company that make a stable operating system! I was liked innovational things. So, I've been crazy them, and I still like them. But, I think compnay that make the most-stable OS is a Microsoft</p>
    </>
  )
}

Content_Microsoft.getLayout = (page:ReactNode)=> <RoutingTabLayout>{page}</RoutingTabLayout>

export default Content_Microsoft;