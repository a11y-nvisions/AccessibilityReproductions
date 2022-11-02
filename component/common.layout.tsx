import {Browser, BrowserInfo, detect, DetectedInfoType} from "detect-browser";
import Head from "next/head";
import Link from "next/link";
import React, { FC, useEffect, useRef, useState } from "react"
import RegisteredPages from "../data/pageInfos";
import NoticeBar from "./noticeBar";
export default function MainLayout ({children}:{children:React.ReactElement|React.ReactNode}) {
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
    if (info) {
      currentBrowser(info.name)
    }
  },[browserCheck,currentBrowser,detect])
  return (
    <>
      <div id="root">
        <header><button id="btn_hamburger" aria-label="Index Menu" onClick={showMenu}><i className="fa-solid fa-bars"></i></button><h1>Accessibility Issue Reproductions</h1></header>
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
          <dialog ref={(el)=>{
            menuRef.current=el!;
            el?.setAttribute('inert','');
          }} id="navigation">
            <form method="dialog">
              <div id="navigation_title"><strong>Page Index</strong></div>
              <nav>
                  <ul className="no-bullet">
                    {
                      RegisteredPages.map((info,idx) => {
                        if(info.label){
                          return <li key={`main-nav_${idx+1}`}><Link onClick={hideMenu} href={info.path}>{info.label}</Link></li>
                        }
                      })
                    }
                  </ul>
              </nav>
              <button id="nav_close" type="button" aria-label={'Close Page Index Menu'} onClick={hideMenu}>X</button>
            </form>
          </dialog>
          <footer>&copy; NVISIONS</footer>
      </div>
    </>
  )
}
