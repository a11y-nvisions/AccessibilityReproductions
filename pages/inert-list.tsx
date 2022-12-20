import { Trans, useTranslation,WithTranslation} from "next-i18next";
import Head from "next/head";
import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import setStaticProps from "../util/setStaticProps";
type CarouselProps = {
  data:CarouselItem[]
  listLabel?:string
}

type CarouselItem = {
  label: string,
  imageSrc: string,
  href: null|string
  isDummy?:boolean
}

function WidgetCarousel ( {data,listLabel} : CarouselProps ) {
  let temp = data.concat(Array<CarouselItem>(4-data.length%4).fill({href:"",imageSrc:"/img/nvlogo.png",label:"빈 이미지",isDummy:true}))
  const pages = new Array<CarouselItem[]>(Math.round(temp.length/4)).fill(new Array<CarouselItem>(4)).map((el,idx)=>{
    const start = idx == 0 ? idx : idx+3
    const end = start+4;
    return temp.slice(start,end);
  });
  const [[prevBlocked,setPrevBlocked],[nextBlocked,setNextBlocked]] = new Array<[boolean,Dispatch<SetStateAction<boolean>>]>(2).fill(useState(false));
  const [currentPage,setPage] = useState(0);
  const [isTrusted,setTrusted] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const {t} =  useTranslation("common");
  
  useEffect(()=>{
    setPrevBlocked(currentPage == 0);
    setNextBlocked(currentPage == pages.length-1)
  },[setNextBlocked,setPrevBlocked,currentPage])

  function nextPage(){
    const lst = [...scroller.current!.querySelectorAll(".carousel-list-page")]
    if (lst[currentPage+1]){
      setPage(currentPage+1);
      setTrusted(true)
      let timer = setTimeout(()=>{clearTimeout(timer);setTrusted(false);},100)
    }
  }
  function prevPage(){
    const lst = [...scroller.current!.querySelectorAll(".carousel-list-page")];
    if (lst[currentPage-1]){
      setPage(currentPage-1);
      setTrusted(true)
      let timer = setTimeout(()=>{clearTimeout(timer);setTrusted(false);},100)
    }
  }

  return (
    <div className="carousel-wrapper" role="region" aria-label={`${listLabel ? listLabel+" - " : ""} ${t("horizontal-gallery-list")}`}>
      <div className="carousel-inner-wrapper">
        <button ref={(r)=>{
          if(nextBlocked) {
            r?.focus();
          }
        }} disabled={currentPage==0} onClick={()=>{prevPage()}} className="list-previous" aria-label="이전">
          <i className="fa-solid fa-arrow-left" aria-hidden={true}></i>
        </button>
        <button ref={(r)=>{
          if(prevBlocked) {
            r?.focus();
          }
        }} disabled={currentPage == pages.length-1} onClick={()=>{nextPage()}} className="list-next" aria-label="다음">
          <i className="fa-solid fa-arrow-right" aria-hidden={true}></i>
        </button>
        <div ref={scroller} className="carousel-list">
          {pages.map((page,idx)=>{
            return (
              <div key={idx} className="carousel-list-page" ref={(p)=>{
                p?.toggleAttribute('inert',idx != currentPage)
                if (idx === currentPage && isTrusted) {
                  p?.scrollIntoView({behavior:"smooth",block:"nearest",inline:"nearest"})
                }
              }}>
                {page.map((item,idx)=>{
                    return (
                      <div style={{ backgroundImage:`url(${item.imageSrc})`, backgroundPosition:"center"}} key={idx} className={`picture-link${item.isDummy ? " dummy" : ""} item-no_${(idx+1)}`}>
                        <a href={item.href ? item.href : undefined} style={{color:"transparent",height:"100%",width:"100%"}}>{item.label}</a>
                      </div>
                    )
                })}
              </div>
            );
          })}
        </div>
      </div>
      <div className="list-indicator">
        <div aria-label={t('page-indicator')} tabIndex={0} role={"separator"} aria-valuemin={0} aria-valuemax={pages.length} aria-valuenow={currentPage+1} aria-valuetext={t("listInfo",{curr:currentPage+1,total:pages.length,unit:t('page')})} className="pagination">{currentPage+1}/{pages.length}</div>
        <div aria-live="polite" className="announcer">
          <span style={{display:!isTrusted  ? "none" : ""}}>
            <Trans i18nKey={"listInfo"} values={{curr:currentPage+1,total:pages.length,unit:t("page")}} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Carousel() {
  const {t} = useTranslation("inert_list");
  return (
    <>
      <Head>
      <title>{`${t("title")} - ${t("common:title")}`}</title>
      </Head>
      <h2>{t("main_title")}</h2>
      <p>{t("paragraph1")}</p>
      <p>{t("paragraph2")}</p>
      <p>{t("paragraph3")}</p>
      <p>{<Trans t={t} i18nKey={"paragraph4"} values={{userA:t("userA"),userB:t("userB")}} components={[<strong></strong>]} />}</p>
      <p>{<Trans t={t} i18nKey={"paragraph5"} values={{userA:t("userA"),userB:t("userB")}} components={[<strong></strong>]} />}</p>
      <p>{<Trans t={t} i18nKey={"paragraph6"} values={{userA:t("userA"),userB:t("userB")}} components={[<strong></strong>]} />}</p>
      <p>{
        <>
          <Trans t={t} i18nKey={"paragraph7"} values={{userA:t("userA"),userB:t("userB")}} components={[<strong></strong>]} />&nbsp;
          <Trans t={t} i18nKey={"paragraph8"} values={{userA:t("userA"),userB:t("userB")}} components={[<strong></strong>]} />
        </>
      }</p>
      <p>{t("paragraph9")}</p>
      <WidgetCarousel listLabel={t("scary-beasts")} data={[
        {imageSrc:"/img/lion.jpg",label:t("Lion"),href:"#"},
        {imageSrc:"/img/tiger.jpg",label:t("Tiger"),href:"#"},
        {imageSrc:"/img/leopard.jpg",label:t("Leopard"),href:"#"},
        {imageSrc:"/img/panther.jpg",label:t("Black_Panther"),href:"#"},
        {imageSrc:"/img/snow-leopard.jpg",label:t("Snow_Leopard"),href:"#"},
        {imageSrc:"/img/cheetah.jpg",label:t("Cheetah"),href:"#"},
        {imageSrc:"/img/puma.jpg",label:t("Puma"),href: "#"},
      ]}></WidgetCarousel>
    </>
  );
}

export const getStaticProps = setStaticProps(["common","inert_list"]);