import Head from "next/head";
import { ReactNode } from "react";
import RoutingTabLayout from "../../component/tabRouterLayout";
import  { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

function Content_google () {
  let {t} = useTranslation('tab');
  return (
    <>
    <Head>
    <title>{`${t("tab:tab_google")} ${t("common:word_tab")} : ${t("title")}${t("routing")} - ${t("common:title")}`}</title>
    </Head>
    <p>{t("tab:paragraph_google")}</p>
    </>
  )
}



export const getStaticProps:GetStaticProps = async ({locale} : any ) => ({
  props: {
    ...(await serverSideTranslations(locale, ["tab",'common']))
  },
});

Content_google.getLayout = (page:ReactNode) => <RoutingTabLayout>{page}</RoutingTabLayout>

export default Content_google;