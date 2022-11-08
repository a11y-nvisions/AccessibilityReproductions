import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import {FC} from "react";
import TabLayout,{TabContentInfo} from "../component/TabLayout";
import setStaticProps from "../util/setStaticProps";
const Page_TabLayout:FC<{[key:string]:any}> = () =>{
  const {t} = useTranslation("tab");
  const info:TabContentInfo[] = [
    {label:t("tab_apple"), panel:<p>{t("paragraph_apple")}</p>},
    {label:t("tab_google"), panel:<p>{t("paragraph_google")}</p>}
  ];
  return (
    <>
    <Head>
      <title>{`${t("title")} - ${t("common:title")}`}</title>
    </Head>
    <h2>{t("main_title")}</h2>
    <p>{t("introduce")}</p>
    <TabLayout defaultSelected={0} tabControlInfo={info} />
    </>
  )
}
export const getStaticProps = setStaticProps(["common","tab"]);

export default Page_TabLayout;