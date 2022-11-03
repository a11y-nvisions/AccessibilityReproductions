import { GetServerSideProps, GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Link from "next/link";
import React,{FC} from "react" ;
const Page_ERROR404: FC<{[key:string]:any}> = ()=> {
  const {t} = useTranslation("error404");
  return (
    <>
    <Head>
    <title>{`${t("404")} - ${t("title")}`}</title>
    </Head>
    <h2 id="title404" aria-labelledby={"title404"}>{t("main_title_l1")}
    <br />{t("main_title_l2")}</h2>
    <p>{t("helper_paragraph")}</p>
    <Link href="/">{t("helper_link")}</Link>
    </>
  )
}

export const getStaticProps:GetStaticProps = async ({locale}:any)=>({props:{
  ...(await serverSideTranslations(locale,["common","error404"]))
}})

export default Page_ERROR404;