import Head from 'next/head';
import React, { FC } from 'react';
import Summarizable from '../component/summarizable';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';

const Page_Accordion:FC<{[key:string]:any}> = ()=> {
  const {t} = useTranslation("accordion");
  return (
    <>
      <Head>
      <title>{`${t("title")} - ${t("common:title")}`}</title>
      </Head>
      <article>
        <h2>{t("main_title")}</h2>
        <p>{t("introduce")}</p>
        <section>
          <h3>{t("h3_background")}</h3>
          <p>
            {t('background_paragraph1')}
          </p>
          <p>
            {t('background_paragraph2')}
          </p>
          <p>
            {t('background_paragraph3')}
          </p>
        </section>
        <section id='core'>
          <div>
            <h5>{t("h4_example")}</h5>
            <p>
              {t('example_paragraph1')}
            </p>
            <Summarizable buttonLabel={t("example_label")} containerTag='section' headingLevel={2} useNativeHeading={false}>
              <p>{t('example_content')}</p>
            </Summarizable>
          </div>
        </section>
      </article>
    </>
  );
}

export const getStaticProps:GetStaticProps = async ({ locale }) =>{
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "", ['common', 'accordion'])),
    },
  };
}

export default Page_Accordion;