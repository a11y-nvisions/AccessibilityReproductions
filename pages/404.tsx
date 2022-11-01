import Head from "next/head";
import Link from "next/link";
import React,{FC} from "react" ;

const Page_ERROR404: FC<{[key:string]:any}> = ()=> {
  return (
    <>
    <Head>
      <title>404 Not Found - Accessibility Issue Reproductions</title>
    </Head>
    <h2 id="title404" aria-labelledby={"title404"}>404 : Sorry :(
    <br />Couldn&apos;t find your requested page.</h2>
    <p>Do you want to go to available content? Please click the below &quot;Go to Home&quot; link to go!</p>
    <Link href="/">Go to Home</Link>
    </>
  )
}
export default Page_ERROR404;