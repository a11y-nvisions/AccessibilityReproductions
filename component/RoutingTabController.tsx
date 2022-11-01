import Router, { useRouter } from "next/router";
import React,{useState,useEffect,useRef, ReactElement, ReactNode} from "react";
export interface RoutingTabs {
  path : string;
  label : string;
}
export interface RoutingTabControllerInit {
  tabInfo: RoutingTabs[];
  orientation?:"vertical"|"horizontal";
  selected?:number;
}
export default function RoutingTabController ({tabInfo,orientation='horizontal',selected=0}:RoutingTabControllerInit) {  
  const tabNavigatedRef = useRef<HTMLDivElement>(null);
  const [getSelectedIndex,setSelectedIndex] = useState(selected);
  const [isTrusted,setTrusted] = useState(false);
  let [first,last] = [0,tabInfo.length-1];
  const tabRouter = useRouter();
  const cpath = tabRouter.pathname;
  const selectTab = (idx:number) => {
    setSelectedIndex(idx < first ? last : (idx > last ? first : idx));
  }
  const selectNext = ()=>{
    selectTab(getSelectedIndex+1);
  }
  const selectPrevious = ()=>{
    selectTab(getSelectedIndex-1);
  }
  const selectLast = ()=>{
    selectTab(last);
  }
  const selectFirst = ()=>{
    selectTab(first);
  }

  useEffect(()=>{
    if(isTrusted){
      tabNavigatedRef.current?.focus();
      tabNavigatedRef.current?.click();
      setTrusted(false);
    }
  },[tabNavigatedRef,isTrusted,setTrusted,getSelectedIndex,setSelectedIndex])
  return (<div role={'tablist'} aria-orientation={ orientation }>
        {tabInfo.map((info,idx)=>{
          return <div onKeyDown={e=>{
              const evt = e.nativeEvent as KeyboardEvent;
              switch(evt.code){
                case "ArrowLeft":
                case "ArrowUp":
                  selectPrevious();
                  setTrusted(evt.isTrusted)
                  break;
                case "ArrowRight":
                case "ArrowDown":
                  selectNext();
                  setTrusted(evt.isTrusted)
                  break;
                case "Home" :
                  selectFirst();
                  setTrusted(evt.isTrusted)
                  break;
                case "End" :
                  selectLast();
                  setTrusted(evt.isTrusted)
                  break;
              }
          }} onClick={()=>{
            setSelectedIndex(idx);
            tabRouter.push(info.path)
          }} className={"tab-item"} role={'tab'} ref={idx === getSelectedIndex ? tabNavigatedRef : null } aria-selected={ cpath.includes(info.path) } tabIndex={cpath.includes(info.path) ? 0 : -1} key={idx}>{info.label}</div>
      })} 
      </div>)
}