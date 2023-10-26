import { useTranslation } from "next-i18next";
import React, {FC,forwardRef, useEffect, ForwardedRef, useState, useRef } from "react"
import uuid from "react-uuid";


interface CustomDialogInit {
  id?:string,
  title:{
    show:boolean,
    name:string
  },
  action_close:()=>void
  isOpened : boolean,
  children : React.ReactNode | JSX.Element,
}

const CustomDialog = forwardRef((
  props:CustomDialogInit,
  ref:ForwardedRef<HTMLDivElement>
  ) => {
  const {id,title,children,isOpened,action_close} = props;
  const [getIdentifier,setIdentifier] = useState<string>(id ?? `id_${uuid()}`);
  const {t} = useTranslation();
  useEffect(()=>{
    if ( document.querySelectorAll(`#${getIdentifier}`).length > 1 ) {
      setIdentifier(`id_${uuid()}`)
    }
    
    
  }, [getIdentifier,setIdentifier])
  
  return (
    <div ref={(el)=>{
      if(el){
        el.inert = !isOpened
      }
    }} aria-modal={isOpened} role={"dialog"} className={ `modal-overlay${isOpened ? " show" : ""}` } id={getIdentifier} onKeyDown={(e)=>{
      const event = e.nativeEvent;
      switch(event.code) {
        case "Escape":
          action_close()
          break;
      }
    }}>
      <div className={"modal-doc"}>
        <div className="modal-head">
          <div className="modal-title">
            <h1 className={`${title.show ? "show-header" : ""}`}>{title.name}</h1>
          </div>
        </div>
        <div className="modal-content" ref={ref} tabIndex={-1}>
          {children}
        </div>
        <button className="btn_close" onClick={action_close} aria-label={t("btn_close")}>X</button>
      </div>
    </div>
  )
})

export default CustomDialog