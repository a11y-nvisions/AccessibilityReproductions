import Head from "next/head";
import { ReactNode } from "react";
import RoutingTabLayout from "../../component/tabRouterLayout";
import  {useTranslation} from "next-i18next";
import { GetServerSideProps, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
function Content_Microsoft () {
  const {t} = useTranslation('tab');
  return (
    <>
    <Head>
    <title>{`${t("tab:tab_microsoft")} ${t("common:word_tab")} : ${t("title")}${t("routing")} - ${t("common:title")}`}</title>
    </Head>
    <p>{t("tab:paragraph_microsoft")}</p>
    </>
  )
}

Content_Microsoft.getLayout = (page:ReactNode) => <RoutingTabLayout>{page}</RoutingTabLayout>

export const getStaticProps:GetStaticProps = async ({locale} : any ) => ({
  props: {
    ...(await serverSideTranslations(locale, ["tab",'common']))
  },
});

export default Content_Microsoft;