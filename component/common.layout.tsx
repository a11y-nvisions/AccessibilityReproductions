import {detect} from "detect-browser";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import Script from "next/script";
import React, { FC, useEffect, useRef, useState } from "react"
import RegisteredPages from "../data/pageInfos";
import NoticeBar from "./noticeBar";
export default function MainLayout ({children}:{children:React.ReactElement|React.ReactNode}) {
  const [custom_isOpened,custom_setOpen] = useState<boolean>(false);
  let menuRef = useRef<HTMLDialogElement|null>(null);
  const [browserCheck,currentBrowser] = useState<string>("");
  const hideMenu = ()=> {
    if(menuRef.current) {
      menuRef.current.inert = true;
      menuRef.current.close();
    }
  };
  const showMenu = ()=> {
    if (menuRef.current) {
      menuRef.current.inert = false;
      menuRef.current.showModal();
    }
  }
  useEffect(()=>{
    const info = detect()
  },[browserCheck,currentBrowser,detect])
  let {t} = useTranslation("common");
  const [isCustomDialogOpened,openCustomDialog] = useState<boolean>(false)
  return (
    <>
      <Script src="https://kit.fontawesome.com/739edf4b29.js" crossOrigin="anonymous"></Script>
      <div id="root">
        <header><button id="btn_hamburger" aria-label={t("btn_menu_open")} onClick={showMenu}><i className="fa-solid fa-bars"></i></button><h1>Accessibility Issue Reproductions</h1></header>
        <div className='notice-wrapper'>
            {(()=>{
              if ( browserCheck === "firefox" ) {
                return <NoticeBar noticeType={"critical-warning"} title={`Firefox isn't recommended to use!`}>
                  <h3>WARNING!</h3>
                  <p>
                    We're sorry! this page has a behavior bug with Firefox. Our page index menu was customized for implement visible animation by using new technology.
                  </p>
                  <p>We're also hoping this bug will be fixed quickly as soon as possible like you. Please wait for this a few months. Thank you.</p>
                  <p>P.S. Nevertheless, if you have to use Firefox, Use the Firefox Nightly(beta channel). 'inert' technology has been applied to Nightly version.</p>
                </NoticeBar>
              }
            })()}
          </div>
          <main>
              {children}
          </main>
          <footer>&copy; {t("copyright")}</footer>
          <dialog aria-labelledby="navigation_title" ref={(el)=>{
            menuRef.current=el!;
            el?.setAttribute('inert','');
          }} id="navigation">
            <form method="dialog">
              <div id="navigation_title" aria-hidden={true}><strong>{t("nav_title")}</strong></div>
              <nav>
                  <ul className="no-bullet">
                    {
                      RegisteredPages.map((info,idx) => {
                        if(info.label){
                          return <li key={`main-nav_${idx+1}`}><Link onClick={hideMenu} href={info.path}>{t(info.label)}</Link></li>
                        }
                      })
                    }
                  </ul>
              </nav>
              <button id="nav_close" type="button" aria-label={t("btn_close")} onClick={hideMenu}>X</button>
            </form>
          </dialog>
      </div>
    </>
  )
}


