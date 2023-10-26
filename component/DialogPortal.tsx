import { ReactElement, useEffect, useState,FC} from "react";
import { createPortal } from "react-dom";

export interface PortalInit {
  children: ReactElement,
}



const DialogLayer = ({ children }:PortalInit) => { 
  const [container,setContainer] = useState<Element | null>(null);
  useEffect(()=>{
      if(document){
        setContainer(document.getElementById('dialogs'));
      }
  },[])

  if( !container ) return <></>;
  
  return createPortal(<>{children}</>,container);
}

export default DialogLayer;