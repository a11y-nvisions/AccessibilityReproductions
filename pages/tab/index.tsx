import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import RoutingTabLayout from "./_layout";

function Content_index () {
  const router = useRouter();
  useEffect(()=>{
    router.push('tab/apple')
  },[router])
  return (
    <>
    </>
  )
}

Content_index.getLayout = (page:ReactNode)=> <RoutingTabLayout>{page}</RoutingTabLayout>

export default Content_index;