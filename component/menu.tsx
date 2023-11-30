import { CSSProperties, Dispatch, KeyboardEventHandler, MouseEventHandler, MutableRefObject, PointerEventHandler, ReactComponentElement, ReactElement, RefObject, SetStateAction, cloneElement, forwardRef, useEffect, useRef, useState } from "react";
import IdentifierSerialGenerater from "../util/Identifier";
import { UseTranslation, i18n} from "next-i18next";

type DefaultMenuProps<T extends HTMLElement = HTMLDivElement> = {
    menuitem:MenuitemProps[]
    opened:boolean,
    label?:string,
    focused:number,
    setOpened:Dispatch<SetStateAction<boolean>>
    setFocused:Dispatch<SetStateAction<number>>
    exit?:RefObject<T>
}

type MenuitemProps = {
    label:string
    onClick?:MouseEventHandler
    submenu?: ReactElement<DefaultMenuProps>
}
type ReceivedMenuitemProps = {
    siblingLength:number,
    index:number,
    focused:number,
    setOpened:Dispatch<SetStateAction<boolean>>
    setFocused:Dispatch<SetStateAction<number>>,
}

export default function Menu<T extends HTMLElement = HTMLDivElement>( { 
        menuitem, 
        label,
        opened=false,
        setOpened,
        focused,
        setFocused,
        exit
    }:DefaultMenuProps<T>){
    const [didMount,doMount] = useState<boolean>(false);
    const menuContainerRef = useRef<HTMLDivElement>(null);
    const [id,setId] = useState("");
    let timeoutId:NodeJS.Timeout|string|number|undefined;

    useEffect(()=>{
        if(!didMount) {
            doMount(true);
            setId(`menu_${IdentifierSerialGenerater()}`);
        }
        if(didMount) {
            if(!opened) {
                setFocused(0);
                timeoutId = setTimeout(()=>{
                    clearTimeout(timeoutId);
                    exit?.current?.focus();
                },100)
            } 
            
            if(opened){
                const items = ([...menuContainerRef.current?.querySelectorAll(":scope>[role=menuitem]")!] as HTMLDivElement[]);
                items[focused].focus();
            }
        }
        [focused]
    },[focused,opened])

    return (
        <div ref={menuContainerRef} role="menu" aria-label={label}
        onKeyDown={(evt)=>{
            let a:string | number | NodeJS.Timeout | undefined;
            if(evt.code == "Escape"){
                setOpened(false)
            }
        }}
        className={`${opened ? " opened" : ""}`} id={id}>
            {menuitem?.map((item,index)=>{
                return <Menuitem 
                {...item}
                key={index} 
                index={index}
                focused={focused}
                setFocused={setFocused}
                setOpened={setOpened}
                siblingLength={menuitem.length}
                ></Menuitem>
            })}
        </div>
    )
}


function Menuitem( { label, submenu, focused, setFocused, index, siblingLength, onClick, setOpened} : 
    MenuitemProps&ReceivedMenuitemProps ){
    const [didMount,doMount] = useState<boolean>(false);
    const selfRef = useRef<HTMLDivElement>(null);
    useEffect(()=>{
        if(!didMount) {
            doMount(true);
        }

    });

    const next=()=>{
        setFocused(focused+1 < siblingLength-1 ? focused+1 : siblingLength-1);
    }
    const previous = ()=>{
        setFocused(focused-1 > 0 ? focused-1 : 0)
    }

    return (
        <div ref={selfRef} role="menuitem" tabIndex={ focused === index ? 0 : -1} 
            onClick={(evt)=>{
                evt.preventDefault();
                
                if( onClick ){
                    onClick(evt);
                }
                setOpened(false);
            }}
            onKeyDown={(event)=>{
                if(event.code == "ArrowDown") {
                    event.preventDefault();
                    next();
                }
                else if(event.code == "ArrowUp") {
                    event.preventDefault();
                    previous();
                } else if (event.code == "Enter") {
                    event.preventDefault();
                    event.currentTarget.click();
                } else if (event.code == "Tab"){
                    event.preventDefault();
                    setOpened(false);
                } else if (event.code == "Space") {
                    event.preventDefault();
                }
            }}>
            <span className="label">{label}</span>
            {submenu}
        </div>
    )
}

type MoreButtonProps = {
    label?:string,
    menu:DefaultMenuProps<HTMLButtonElement>,
}
export function MoreButton({menu,label}:MoreButtonProps) {
    
    const buttonRef = useRef<HTMLButtonElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const {opened,setOpened} = menu;
    return (
    <div className="more-button-wrapper" ref={wrapperRef}
        style={{
        "--width":`${buttonRef.current?.clientWidth}px`,
        "--height":`${buttonRef.current?.clientHeight}px`
    } as CSSProperties}>
        <button ref={buttonRef} onClick={()=>{
            setOpened(!opened);
        }} aria-label={i18n?.t("button_view-more",{name:label}).toString()}>
            <i className="fa-solid fa-ellipsis-vertical"></i>
            </button>
        <Menu label={i18n?.t("menu_more-option",{name:label}).toString()} {...menu} opened={opened} setOpened={setOpened} exit={buttonRef}></Menu>
    </div>
    )
}