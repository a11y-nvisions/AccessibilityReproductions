import { GetStaticProps } from "next";
import  { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { ReactNode } from "react";
import RoutingTabLayout from "../../component/tabRouterLayout";
import setStaticProps from "../../util/setStaticProps";

function Content_apple () {
  const {t} = useTranslation("tab");
  return (
    <>
      <Head>
        <title>{`${t("tab:tab_apple")} ${t("common:word_tab")} : ${t("title")}${t("routing")} - ${t("common:title")}`}</title>
      </Head>
      <p>{t("tab:paragraph_apple")}</p>
    </>
  )
}

export const getStaticProps = setStaticProps(["common","tab"]);

Content_apple.getLayout = (page:ReactNode) => <RoutingTabLayout>{page}</RoutingTabLayout>

export default Content_apple;