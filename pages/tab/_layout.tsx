import { useRouter } from "next/router";
import React,{ ReactElement, ReactNode} from "react";
import RoutingTabController from "../../component/RoutingTabController";
export default function RoutingTabLayout ({children}:{children:ReactElement|ReactNode}) {  
  return (
    <>
      <RoutingTabController tabInfo={[
        {label:"Apple",path:"apple"},
        {label:"Google",path:"google"},
        {label:"Microsoft",path:"microsoft"}
      ]} orientation={"horizontal"} selected={0}></RoutingTabController>
      <div role={'tabpanel'}>
        {children}
      </div>
    </>
  )
}