import {  useEffect, useRef, useState } from "react";
import CustomDialog from "../component/CustomDialog";
import DialogLayer from "../component/DialogPortal";
import setStaticProps from "../util/setStaticProps";

export default function CustomARIADialog(){
  const [isOpened,open] = useState<boolean|null>(null)
  const btnDialogOpen = useRef<HTMLButtonElement>(null)
  const focusEntrance = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const nextAppContainer = (document.querySelector('#__next')! as HTMLElement)
    let timer:any = null;
    new Promise((resolve:(v:boolean|null)=>void)=>{
      timer = setInterval(()=>{
        resolve(isOpened)
      },100)
    })
    .then((result:boolean|null)=>{
      clearInterval(timer);
      const focus = result ? focusEntrance : btnDialogOpen;
      nextAppContainer.inert = result ? true : false;
      
      setTimeout(()=>{
        if( typeof isOpened === "boolean" ) {
          focus.current?.focus();
        }
      },100)

    })
  },[isOpened])
  return (
    <>
      <h2>Custom Dialog</h2>
      <button ref={btnDialogOpen} onClick={()=>{
          open(true);
      }}>Open Dialog</button>
      <DialogLayer>
        <CustomDialog ref={focusEntrance} isOpened={typeof isOpened === "boolean" ? isOpened : false} action_close={()=>{ open(false); btnDialogOpen.current?.focus()}} title={{name:"Hello Dialog!",show:true}}><p>It's a Test!</p></CustomDialog>
      </DialogLayer>
    </>
  )
}

export const getStaticProps = setStaticProps(['common']);