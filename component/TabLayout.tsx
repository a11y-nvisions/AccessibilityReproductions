import React, { FC, ReactEventHandler, forwardRef, useRef, useState, ForwardedRef, Ref, ForwardRefExoticComponent, LegacyRef, useEffect } from "react";
interface TabListProps {
  orientation?:"vertical"|"horizontal";
  children:React.ReactElement<TabItemProps> | React.ReactElement<TabItemProps>[],
}
interface TabItemProps {
  label:String,
  isSelected:boolean,
  onClick:ReactEventHandler,
  onKeyDown:ReactEventHandler,
  ref:Ref<HTMLElement>
}
export interface TabContentInfo {
  panel:React.ReactElement|null,
  label:string,
}
interface TabLayoutProps {
  defaultSelected:number,
  tabControlInfo:TabContentInfo[]
}
const TabLayout:FC<TabLayoutProps> = ({defaultSelected,tabControlInfo})=> {
  const [getSelectedIndex,setIndexToSelected] = useState(defaultSelected);
  const selectedRef = useRef<HTMLDivElement>(null);
  const [isTrusted,setTrusteed] = useState(false);
  useEffect(()=>{
    if(isTrusted) {
      selectedRef.current?.focus();
      setTrusteed(false);
    }
  },[getSelectedIndex,isTrusted,setTrusteed])
  const navigate = (idx:number)=>{
    setIndexToSelected(idx);
  }

  const nextTab = () => {
    if (getSelectedIndex < tabControlInfo.length-1) {
      navigate(getSelectedIndex+1);
    } else {
      firstTab();
    }
  }
  const previousTab = () => {
    if (getSelectedIndex > 0) {
      navigate(getSelectedIndex-1);
    } else {
      lastTab();
    }
  }

  const lastTab = () => {
    navigate(tabControlInfo.length-1);
  }
  const firstTab = () => {
    navigate(0);
  }

  return (
    <>
      <TabList>
        {tabControlInfo.map((el,idx)=>{
          return <TabItem key={idx} ref={ selectedRef } onKeyDown={(evt)=>{
            const nEvent:KeyboardEvent = evt.nativeEvent as KeyboardEvent;
            switch(nEvent.code) {
              case "ArrowUp":
              case "ArrowLeft":
                previousTab();
                setTrusteed(evt.isTrusted);
                break;
              case "ArrowDown":
              case "ArrowRight":
                nextTab();
                setTrusteed(evt.isTrusted);
                break;
              case "Home":
                firstTab();
                setTrusteed(evt.isTrusted);
                break;
              case "End":
                lastTab();
                setTrusteed(evt.isTrusted);
                break;
            }
          }} onClick={()=>{setIndexToSelected(idx);}} isSelected= { idx === getSelectedIndex } 
          label={el.label} />;
        })}
      </TabList>
      <div className="panel">
        {tabControlInfo.map((el,idx)=>{
          if (getSelectedIndex === idx) {
            el.panel ??= <p>Sample Content. You don't want to show this, Please insert your panel content</p>
            return <div key={idx} id="tabPanel">{el.panel}</div>
          }
        })}
      </div>
    </>
  )
}

const TabItem = forwardRef<HTMLDivElement|null,TabItemProps>(({label,isSelected,onClick,onKeyDown},ref)=>{
  return (
    <div ref={isSelected ? ref : null} aria-selected={isSelected} role={'tab'} onClick={onClick} onKeyDown={(evt)=>{onKeyDown(evt)}} className={"tab-item"} tabIndex={isSelected ? 0 : -1}>{label}</div>
  )
})
const TabList:FC<TabListProps> = ({children,orientation})=> {
  return (
    <div role={"tablist"} aria-orientation={orientation}>
      {children}
    </div>
  );
}
TabList
export default TabLayout;