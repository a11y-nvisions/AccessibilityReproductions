import { GetStaticProps } from "next";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const setStaticProps = (jsonFileNames:string[])=>async function ({locale}:{locale:any}) {
  if (process.env.NODE_ENV === "development") {
      await i18n?.reloadResources();
  }    
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "", jsonFileNames)),
    },
  };
}
export default setStaticProps;