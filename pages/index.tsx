import Head from "next/head";
import  {useTranslation} from "next-i18next";
import setStaticProps from "../util/setStaticProps";
function Home () {
  let {t} = useTranslation("home");
  return (
    <>
      <Head>
        <title>{`${t("title")} - ${t("common:title")}`}</title>
        <meta name="description" content="Accessibility Reproductions for reporting bugs and issues" />
      </Head>
      <h2>{t("main_title")}</h2>
      <p>{t("introduce1")}</p>
      <p>{t("introduce2")}</p>
    </>
  )
}

export const getStaticProps = setStaticProps(["common","home"]);

export default Home;