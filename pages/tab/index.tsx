import { GetServerSideProps, GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useTransition } from "react";

import RoutingTabLayout from "../../component/tabRouterLayout";
import setStaticProps from "../../util/setStaticProps";

function Content_index () {
  const router = useRouter();
  const {t} = useTranslation('tab');
  useEffect(()=>{
    router.push('tab/apple')
  },[router])
  return (
    <>
      <Head>
      <title>{`${t("common:loading")} - ${t("common:title")}`}</title>
      </Head>
    </>
  )
}

export const getStaticProps = setStaticProps(["common","tab"]);

Content_index.getLayout = (page:ReactNode)=><RoutingTabLayout>{page}</RoutingTabLayout>

export default Content_index;