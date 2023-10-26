import Head from "next/head";
import { useEffect, useState } from "react";
import Axios from 'axios';
import { Trans, useTranslation } from "next-i18next";
import setStaticProps from "../util/setStaticProps";

export default function LiveTimer(){
  const [[getH,setH],[getM,setM],[getS,setS]] = [useState(""),useState(""),useState("")];
  useEffect(()=>{
    const inaccessibleClock = document.querySelector('.inaccessible');
    setInterval(()=>{
      Axios.get("/api/timer").then(body=>{
        setH(body.data.h)
        setM(body.data.m)
        setS(body.data.s)
        if(inaccessibleClock){
          inaccessibleClock.innerHTML = `
            <span class="hour">${body.data.h}</span>:<span class="min">${body.data.m}</span>:<span class="sec">${body.data.s}</span>
          `
        }
      })
    },100)
  },[setH,setM,setS])
  
  const {t} = useTranslation("live");

  return (
    <>
      <Head>
      <title>{`${t("title")} - ${t("common:title")}`}</title>
      </Head>
      
      <h2>{t("main_title")}</h2>
      <p>{t("introduce")}</p>
      <h3>{t("h3_try_experience")}</h3>
      <p>{t("try_experience_paragraph1")}</p>
      <span className="inaccessible"></span>
      <p>{t("try_experience_paragraph2")}</p>
      <span>
        <span className="accessible"><span className="hours">{getH}</span>:<span className="minutes">{getM}</span>:<span className="seconds">{getS}</span></span>
      </span>
      <h3>{t("h3_conclusion")}</h3>
      <p>{t("conclusion_paragraph1")}</p>
      <p>{t("conclusion_paragraph2")}</p>
      <p>{t("conclusion_paragraph3")}</p>
    </>
  );
}

export const getStaticProps = setStaticProps(["common","live"]);