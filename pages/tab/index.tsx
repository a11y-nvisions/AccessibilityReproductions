import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import RoutingTabLayout from "./_layout";

function content_index () {
  const router = useRouter();
  useEffect(()=>{
    router.push('tab/apple')
  },[router])
  return (
    <>
    </>
  )
}

content_index.getLayout = (page:ReactNode)=> <RoutingTabLayout>{page}</RoutingTabLayout>

export default content_index;