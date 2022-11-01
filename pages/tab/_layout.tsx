import { useRouter } from "next/router";
import React,{ ReactElement, ReactNode} from "react";
import RoutingTabController from "../../component/RoutingTabController";
export default function RoutingTabLayout ({children}:{children:ReactElement|ReactNode}) {  
  const router = useRouter();

  return (
    <>
      <RoutingTabController tabInfo={[
        {label:"Apple",path:"apple"},
        {label:"google",path:"google"}
      ]} orientation={"horizontal"} selected={0}></RoutingTabController>
      <div role={'tabpanel'}>
        {children}
      </div>
    </>
  )
}