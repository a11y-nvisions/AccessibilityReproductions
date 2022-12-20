import { GetServerSideProps, GetStaticProps } from "next"
import { i18n, Trans, useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import { Quote } from "../component/punc"
import setStaticProps from "../util/setStaticProps"


export default function Conainter () {
    const {t} = useTranslation("talkback_tabIndexContainer")
    return (
        <>
            <Head>
                <title>{`${t("title")} - ${t("common:title")}`}</title>
            </Head>
            <h2>{t('main_title')}</h2>
            <p>{t("desc_p1")}</p>
            <p>{t("desc_p2",{joinArrays:("\n")})}</p>
            <div aria-label="test" tabIndex={-1} className={"ex-container blockquote"}>
                <div className="content">
                    <p>
                    <Trans t={t} i18nKey={"example1"} values={{tabindex:`tabindex="-1"`}} components={[
                        <strong key="example1"></strong>
                    ]} />
                    </p>
                    <p>
                    <Trans t={t} i18nKey={"example2"} values={{linkText:t("link")}} components={[<a key="example2" href="#">.</a>]} />
                    </p>
                </div>
            </div>
            <p>{t("desc_p3")}</p>
        </>
    )
}

export const getStaticProps = setStaticProps(["common","talkback_tabIndexContainer"])