import { useTranslation } from "next-i18next";
import React,{ ReactNode} from "react";
import RoutingTabController from "./RoutingTabController";
export default function RoutingTabLayout ({children}:{children:ReactNode}) {
  const {t} = useTranslation("tab");;
  return (
    <>
      <RoutingTabController tabInfo={[
        {label:t("tab_apple"),path:"apple"},
        {label:t("tab_google"),path:"google"},
        {label:t("tab_microsoft"),path:"microsoft"}
      ]} orientation={"horizontal"} selected={0} />
      <div role={'tabpanel'}>
        {children}
      </div>
    </>
  )
}